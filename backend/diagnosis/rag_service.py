import os
import google.generativeai as genai
import numpy as np
from django.conf import settings
from .models import MedicalArticle
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
GENAI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GENAI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GENAI_API_KEY)

class RAGService:
    def get_embedding(self, text):
        """Generates embedding for the given text using Gemini."""
        try:
            result = genai.embed_content(
                model="models/gemini-embedding-001",
                content=text,
                task_type="retrieval_document",
                title="Embedding of medical text"
            )
            return result['embedding']
        except Exception as e:
            print(f"Error generating embedding: {e}")
            return []

    def find_relevant_articles(self, query_text, top_k=3):
        """Finds the most relevant articles for a user query."""
        try:
            # 1. Generate embedding for the query
            query_embedding = genai.embed_content(
                model="models/gemini-embedding-001",
                content=query_text,
                task_type="retrieval_query"
            )['embedding']
            
            # 2. Fetch all articles (for small scale this is fine)
            articles = MedicalArticle.objects.all()
            if not articles:
                return []

            # 3. Calculate Cosine Similarity
            scores = []
            
            # Manual cosine similarity implementation for portability
            def cosine_similarity(v1, v2):
                dot_product = np.dot(v1, v2)
                norm_v1 = np.linalg.norm(v1)
                norm_v2 = np.linalg.norm(v2)
                return dot_product / (norm_v1 * norm_v2)

            for article in articles:
                if not article.embedding:
                    continue
                score = cosine_similarity(query_embedding, article.embedding)
                scores.append((score, article))

            # 4. Sort and return top K
            scores.sort(key=lambda x: x[0], reverse=True)
            return [article for score, article in scores[:top_k]]
            
        except Exception as e:
            print(f"Error in RAG retrieval: {e}")
            return []

    def diagnose(self, symptom_text):
        """Orchestrates the RAG flow: Retrieve -> Generate Advice."""
        relevant_articles = self.find_relevant_articles(symptom_text)
        
        context_text = "\n\n".join([f"Article: {a.title}\n{a.content}" for a in relevant_articles])
        
        prompt = f"""
        Sen uzman bir gastroenterolog asistanısın. Kullanıcı şu semptomları tarif etti:
        "{symptom_text}"

        Aşağıdaki tıbbi makaleleri bağlam olarak kullanarak tavsiye ver.
        Bağlam İngilizce olsa bile, cevabı tamamen Türkçe olarak ver.
        Eğer bağlam konuyla ilgiliyse, bilgiyi sentezleyerek kullan.
        Eğer bağlam konuyla ilgisizse, genel tıbbi bilgilerini kullan ancak güvenli ve temkinli tavsiyeler ver.
        
        Bağlam:
        {context_text}

        Lütfen şu formatta yapılandırılmış bir Türkçe cevap ver:
        1. **Olası Sebepler:** (Semptomlara ve bağlama dayanarak)
        2. **Anlık Rahatlama:** (Uygulanabilir adımlar)
        3. **Beslenme Önerileri:** (Ne yenmeli/yenmemeli)
        4. **Ne Zaman Doktora Gidilmeli:** (Kırmızı bayraklar)
        
        Tonun profesyonel ama empatik olsun.
        """

        try:
            model = genai.GenerativeModel('models/gemini-2.0-flash')
            response = model.generate_content(prompt)
            
            return {
                "advice": response.text,
                "sources": [{"title": a.title, "id": a.id} for a in relevant_articles]
            }
        except Exception as e:
            print(f"Error in generation: {e}")
            return {
                "advice": "Üzgünüm, şu anda semptomlarınızı analiz edemiyorum. Lütfen daha sonra tekrar deneyin veya bir sağlık kuruluşuna başvurun.",
                "sources": []
            }
