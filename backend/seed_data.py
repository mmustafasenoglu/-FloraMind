import os
import django

# Setup django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from diagnosis.models import Condition

def seed():
    conditions = [
        {
            "name": "Aşırı Gaz Sıkışması",
            "slug": "asiri-gaz-sikismasi",
            "emergency_action_title": "Yel Çıkaran Poz (Pawanmuktasana)",
            "emergency_action_steps": [
                "Sırt üstü düz bir zemine uzanın.",
                "İki dizinizi göğsünüze doğru çekin ve kollarınızla dizlerinize sarılın.",
                "Derin nefes alarak dizlerinizi göğsünüze bastırın. Mümkünse alnınızı dizlerinize değdirin.",
                "30-60 saniye bu pozisyonda kalın ve derin diyafram nefesi alın.",
                "Hafifçe sağa ve sola sallanarak bağırsak masajı yapın."
            ],
            "kitchen_pharmacy": [
                {
                    "food": "Rezene Çayı (Veya Tohumu)",
                    "mechanism": "Anethole bileşiği sayesinde düz kasları gevşetir ve gazın atılımını kolaylaştırır. En güçlü doğal karminatiflerden biridir."
                },
                {
                    "food": "Kimyon",
                    "mechanism": "Pankreas enzimlerini stimüle ederek sindirimi hızlandırır ve gaz oluşumunu engeller."
                },
                {
                    "food": "Nane Çayı",
                    "mechanism": "Mentol içeriği ile bağırsak spazmlarını çözer. (Dikkat: Reflünüz varsa nane tercih etmeyin)."
                },
                {
                    "food": "Taze Zencefil",
                    "mechanism": "Prokinetik etkisiyle mide boşalmasını hızlandırır, bağırsak hareketlerini düzenler."
                }
            ],
            "forbidden_zone": [
                "Hızlı Yemek Yemek: Hava yutmaya (aerophagia) neden olur.",
                "Sakız Çiğnemek: Sürekli hava yutulmasına sebep olur.",
                "Gazlı İçecekler: Mideye doğrudan karbondioksit doldurur.",
                "Çiğ Baklagiller ve Lahanagiller: Rafinoz içeriği nedeniyle yüksek gaz yapar."
            ],
            "scientific_corner_text": "Gaz sıkışması, genellikle yutulan hava veya kolondaki bakterilerin fermente edilemeyen karbonhidratları parçalaması sonucu oluşur. Bağırsak motilitesi (hareketliliği) yavaşladığında, gaz cepleri oluşur ve viseral (iç organ) ağrı reseptörlerini gererek keskin ağrılar yaratır. Dijital sağlıkta amaç, motiliteyi artırmak ve gazın reabsorbsiyonunu veya atılımını sağlamaktır."
        },
        {
            "name": "İshal (Diyare)",
            "slug": "ishal",
            "emergency_action_title": "Sıvı-Elektrolit Protokolü",
            "emergency_action_steps": [
                "Her dışkılamadan sonra en az 1 bardak su için.",
                "Ev Yapımı ORS Hazırlayın: 1 litre su + 6 çay kaşığı şeker + yarım çay kaşığı tuz.",
                "Katı gıdayı geçici olarak kesin, bağırsakları dinlendirin.",
                "BRAT diyetine kademeli geçin: Muz, Pirinç, Elma püresi, Kızarmış ekmek."
            ],
            "kitchen_pharmacy": [
                {
                    "food": "Muz",
                    "mechanism": "Potasyum kaybını yerine koyar. Pektin lifi bağırsağın su tutma kapasitesini artırarak dışkıyı katılaştırır."
                },
                {
                    "food": "Pirinç Lapası / Suyu",
                    "mechanism": "Düşük lifli ve nişastalı yapısıyla bağırsak hareketlerini yavaşlatır, dışkı hacmini toparlar."
                },
                {
                    "food": "Yoğurt (Probiyotikli)",
                    "mechanism": "Canlı bakteriler (Lactobacillus), bozulmuş bağırsak florasını restore etmeye yardımcı olur."
                }
            ],
            "forbidden_zone": [
                "Kafein: Bağırsak hareketlerini hızlandırır ve su kaybını artırır.",
                "Süt (Laktoz): İshal sırasında bağırsak laktaz enzimi azalır, süt içmek durumu kötüleştirir.",
                "Yağlı/Kızartılmış Gıdalar: Sindirimi zordur, ishali şiddetlendirir.",
                "Şekerli Meyve Suları: Ozmotik etkiyle bağırsağa su çekerek ishali artırır."
            ],
            "scientific_corner_text": "İshal, bağırsakların su ve elektrolitleri geri emme kapasitesinin azalması veya mukozal sekresyonun artmasıdır. Enfeksiyonlar, toksinler veya ozmotik yükler (sindirilmeyen şekerler) enterositlere zarar vererek sıvı kaybına yol açar. Tedavide öncelik enfeksiyonu durdurmak değil, dehidratasyonu (sıvı kaybını) önlemektir."
        },
        {
            "name": "Kabızlık",
            "slug": "kabizlik",
            "emergency_action_title": "Derin Squat Pozisyonu ve Masaj",
            "emergency_action_steps": [
                "Tuvalette ayaklarınızın altına bir tabure koyarak dizlerinizi kalça seviyenizden yukarı çekin (Squat pozisyonu).",
                "Bu pozisyon puborektalis kasını tam gevşeterek rektal açıyı düzleştirir.",
                "Karnınıza saat yönünde dairesel hareketlerle 5 dakika masaj yapın.",
                "Sabah aç karnına büyük bir bardak ılık su içip 5 dakika yürüyün."
            ],
            "kitchen_pharmacy": [
                {
                    "food": "Kuru Erik & İncir",
                    "mechanism": "Sorbitol ve yüksek lif içeriği ile bağırsak içine su çeker, dışkıyı yumuşatır ve motiliteyi artırır."
                },
                {
                    "food": "Zeytinyağı",
                    "mechanism": "Safra salgısını uyarır ve bağırsak mukozasını kayganlaştırarak dışkı geçişini kolaylaştırır."
                },
                {
                    "food": "Keten Tohumu (Öğütülmüş)",
                    "mechanism": "Suda çözünen lifleri ile müsilaj oluşturur, bağırsak içeriğinin hacmini artırır."
                },
                {
                    "food": "Probiyotik Turşu/Kefir",
                    "mechanism": "Bağırsak mikrobiyotasını düzenleyerek düzenli dışkılamayı destekler."
                }
            ],
            "forbidden_zone": [
                "Beyaz Ekmek / Hamur İşleri: Lif içeriği sıfıra yakındır, bağırsak hareketlerini yavaşlatır.",
                "Yetersiz Su Tüketimi: Liflerin şişmesi için su şarttır, susuz lif tıkacı artırabilir.",
                "Hareketsizlik: Bağırsak hareketleri (peristaltizm) fiziksel aktivite ile tetiklenir.",
                "Dışkılamayı Ertelemek: Rektal duyarlılığı azaltır ve kronik kabızlığa yol açar."
            ],
            "scientific_corner_text": "Kabızlıkta kolon transit süresi uzamıştır. Dışkı kolonda ne kadar uzun kalırsa, o kadar çok suyu geri emilir ve sertleşir. Puborektalis kasının paradoksal kasılması (Anismus) veya bağırsak pacemaker hücrelerinin (Cajal hücreleri) aktivite azalması buna neden olabilir. Hedef, ozmotik yükü artırmak ve peristaltik dalgaları tetiklemektir."
        },
        {
            "name": "Mide Yanması (Reflü)",
            "slug": "mide-yanmasi",
            "emergency_action_title": "Sol Yan Yatış Pozisyonu",
            "emergency_action_steps": [
                "Hemen sol yanınıza yatın. Bu pozisyon, mide girişini (kardia) mide asidi seviyesinden yukarıda tutar.",
                "Başınızı ve göğsünüzü yastıklarla yükseltin.",
                "Kemerinizi veya sıkan kıyafetlerinizi gevşetin.",
                "Bir yudum su ile boğazınızdaki asidi temizleyin, ama mideyi şişirmeyin."
            ],
            "kitchen_pharmacy": [
                {
                    "food": "Patates Suyu (Çiğ)",
                    "mechanism": "Yüksek alkali içeriği ile mide asidini nötralize eder. Mukoza üzerinde koruyucu bir tabaka oluşturur."
                },
                {
                    "food": "Yulaf Ezmesi",
                    "mechanism": "Mide asidini sünger gibi emer. Selenyum içeriği ile özofagus dokusunu korur."
                },
                {
                    "food": "Muz (Olgun)",
                    "mechanism": "Doğal antasittir. Mide pH dengesini sağlar ve mukus üretimini artırır."
                },
                {
                    "food": "Badem (Çiğ)",
                    "mechanism": "Kalsiyum içeriği ve alkali yapısı ile asit dengesini sağlamaya yardımcı olur."
                }
            ],
            "forbidden_zone": [
                "Yatmadan Hemen Önce Yemek: Mide boşalmadan yatmak reflünün 1 numaralı nedenidir.",
                "Domates / Narenciye: Yüksek asit içerikleriyle yanmayı alevlendirir.",
                "Çikolata / Nane / Kahve: Alt Özofagus Sfinkter (LES) basıncını düşürerek kapağın açılmasına neden olur.",
                "Sigara: Mide asit salgısını artırırken, koruyucu bikarbonat salgısını azaltır."
            ],
            "scientific_corner_text": "Gastroözofageal Reflü, mide asidinin yemek borusuna kaçmasıdır. Bunun temel nedeni, mide ile yemek borusu arasındaki kapakçığın (Alt Özofagus Sfinkteri - LES) gevşemesi veya karın içi basıncın artmasıdır. Mide asidi (HCl) yemek borusu mukozasını yakar. Kronikleşirse Barrett özofagusuna yol açabilir. Tedavi, asidi nötralize etmekten çok, mekanik bariyeri güçlendirmeye odaklanmalıdır."
        },
        {
            "name": "Mide Bulantısı",
            "slug": "mide-bulantisi",
            "emergency_action_title": "P6 Akupresür ve Kontrollü Nefes",
            "emergency_action_steps": [
                "P6 Noktasını Bulun: Bilek iç kısmında, el ayasından 3 parmak aşağısı.",
                "Bu noktaya baş parmağınızla ritmik ve güçlü bir baskı uygulayın.",
                "Temiz hava alın, derin ve yavaş nefesler (4 saniye al, 4 saniye tut, 4 saniye ver) uygulayın.",
                "Limon veya alkol mendili koklamak bulantı hissini anında baskılayabilir."
            ],
            "kitchen_pharmacy": [
                {
                    "food": "Taze Zencefil",
                    "mechanism": "Mide reseptörlerini bloke ederek bulantı sinyallerini durdurur. Bilimsel olarak anti-emetik etkisi kanıtlanmıştır."
                },
                {
                    "food": "Nane (Kokusu veya Çayı)",
                    "mechanism": "Mide kaslarını gevşetir ve safra akışını düzenler. Kokusu limbik sistem üzerinden bulantıyı bastırır."
                },
                {
                    "food": "Tuzlu Kraker",
                    "mechanism": "Mçide asidini emer ve açlık kaynaklı bulantıyı yatıştırır."
                },
                {
                    "food": "Limon",
                    "mechanism": "Ağızdaki tükürük salgısını nötralize eder ve ferahlatıcı etkisiyle vagus sinirini uyarır."
                }
            ],
            "forbidden_zone": [
                "Ağır / Yağlı Yemekler: Mide boşalmasını geciktirir.",
                "Güçlü Kokular: Bulantı tetikleyicisi olarak beyne sinyal gönderir.",
                "Aşırı Sıvı Alımı (Anda): Mideyi gererek kusma refleksini tetikleyebilir. Yudum yudum içilmelidir.",
                "Sıcak ve Havasız Ortamlar: Tansiyon düşüklüğü yaratarak bulantıyı artırır."
            ],
            "scientific_corner_text": "Bulantı, beynin 'Kusma Merkezi' veya 'Kemoreseptör Tetikleme Bölgesi'nin (CTZ) uyarılmasıyla oluşur. Vagus siniri mideden beyne sürekli sinyal taşır. Serotonin ve dopamin gibi nörotransmitterler bu süreçte rol oynar. Zencefil gibi gıdalar, serotonin reseptörlerini (5-HT3) bloke ederek bulantıyı kaynağında durdurabilir."
        },
        {
            "name": "Gastrit Alevlenmesi",
            "slug": "gastrit",
            "emergency_action_title": "Mideyi Yükten Kurtarma",
            "emergency_action_steps": [
                "Yemeği derhal kesin. Mideye dinlenme zamanı verin.",
                "Ilık su için, asla çok sıcak veya çok soğuk tüketmeyin.",
                "Stresten uzaklaşın; stres mide asit salgısını direkt artırır.",
                "Dik oturun, mideye mekanik baskı yapmayın."
            ],
            "kitchen_pharmacy": [
                {
                    "food": "Patates Suyu",
                    "mechanism": "Güçlü bir alkali ajandır. Mide asidini nötralize eder ve inflamasyonu azaltır."
                },
                {
                    "food": "Meyan Kökü (DGL)",
                    "mechanism": "Mide mukozasının (sümüksü koruyucu tabaka) üretimini artırarak mide duvarını aside karşı korur."
                },
                {
                    "food": "Lahana Suyu",
                    "mechanism": "İçerdiği Glutamin amino asidi, mide epitel hücrelerinin kendini onarmasını ve iyileşmesini hızlandırır (Ülser tedavisinde de kullanılır)."
                },
                {
                    "food": "Zeytinyağı (1 tatlı kaşığı)",
                    "mechanism": "Mide duvarını ince bir tabaka halinde kaplayarak koruma sağlar."
                }
            ],
            "forbidden_zone": [
                "NSAID Ağrı Kesiciler (Aspirin, İbuprofen): Mide koruyucu tabakasını (prostaglandinleri) inceltir.",
                "Alkol ve Sigara: Mide mukozasını doğrudan tahriş eder.",
                "Kahve (Kafeinsiz Bile): Mide asit sekresyonunu artırır.",
                "Baharatlı ve Acı Gıdalar: Enflamasyonlu dokuyu yakar (kapsaisin)."
            ],
            "scientific_corner_text": "Gastrit, mide iç yüzeyini döşeyen mukoza tabakasının iltihaplanmasıdır. Normalde bu tabaka mideyi kendi ürettiği güçlü asitten korur. Helicobacter pylori enfeksiyonu, stres, alkol veya ilaçlar bu bariyeri bozduğunda, asit mide duvarına zarar verir ve ağrı/yanma oluşur. Tedavi bariyeri onarmak ve asidi baskılamaktır."
        }
    ]

    for data in conditions:
        condition, created = Condition.objects.update_or_create(
            slug=data["slug"],
            defaults={
                "name": data["name"],
                "emergency_action_title": data["emergency_action_title"],
                "emergency_action_steps": data["emergency_action_steps"],
                "kitchen_pharmacy": data["kitchen_pharmacy"],
                "forbidden_zone": data["forbidden_zone"],
                "scientific_corner_text": data["scientific_corner_text"],
            }
        )
        if created:
            print(f"✅ '{condition.name}' oluşturuldu.")
        else:
            print(f"🔄 '{condition.name}' güncellendi.")

    
    # --- Medical Articles Seeding ---
    from diagnosis.models import MedicalArticle
    from diagnosis.rag_service import RAGService
    import time
    
    rag_service = RAGService()
    
    articles = [
        {
            "title": "Irritable Bowel Syndrome (IBS) Overview",
            "content": "IBS is a common functional disorder of the gut. Symptoms include abdominal pain, bloating, and altered bowel habits (diarrhea, constipation, or both). Triggers often include stress, certain foods (FODMAPs), and hormonal changes. Management includes dietary changes like the Low-FODMAP diet, stress reduction, and probiotics."
        },
        {
            "title": "Understanding GERD (Acid Reflux)",
            "content": "Gastroesophageal Reflux Disease (GERD) occurs when stomach acid frequently flows back into the tube connecting your mouth and stomach (esophagus). This backwash (acid reflux) can irritate the lining of your esophagus. Symptoms include burning sensation in the chest (heartburn), chest pain, difficulty swallowing, and regurgitation of food or sour liquid."
        },
        {
            "title": "Lactose Intolerance Mechanisms",
            "content": "Lactose intolerance is a digestive disorder caused by the inability to digest lactose, the main carbohydrate in dairy products. It causes various symptoms, including bloating, diarrhea, and abdominal cramps. People with lactose intolerance don't make enough of the enzyme lactase, which is needed to digest lactose."
        },
        {
            "title": "The Gut-Brain Axis",
            "content": "The gut-brain axis consists of bidirectional communication between the central and the enteric nervous system, linking emotional and cognitive centers of the brain with peripheral intestinal functions. Stress and emotions can affect the gut, causing pain and symptoms like diarrhea. Conversely, gut health can impact mood and mental health."
        },
        {
            "title": "Probiotics and Prebiotics",
            "content": "Probiotics are live beneficial bacteria that support gut health. Prebiotics are non-digestible fibers that feed these good bacteria. Together they maintain a healthy microbiome. Common sources of probiotics include yogurt, kefir, and sauerkraut. Prebiotics are found in garlic, onions, and bananas."
        },
        {
            "title": "Bloating and Gas: Causes and Relief",
            "content": "Bloating is often caused by excess gas production or disturbances in the movement of the muscles of the digestive system. Common causes include swallowing air, eating too fast, carbonated drinks, and fermentable foods (beans, lentils). Relief can be found in walking, peppermint tea, simethicone, and abdominal massage."
        },
        {
            "title": "Gastritis: Inflammation of the Stomach Lining",
            "content": "Gastritis is the inflammation of the stomach lining. It can be acute or chronic. Causes include infection with H. pylori, regular use of pain relievers (NSAIDs), excessive alcohol, and stress. Symptoms involve gnawing or burning ache in the upper abdomen, nausea, and vomiting. Treatment involves antacids and avoiding irritants."
        },
        {
            "title": "Gluten Sensitivity vs Celiac Disease",
            "content": "Celiac disease is an autoimmune disorder where gluten ingestion damages the small intestine. Non-celiac gluten sensitivity causes similar symptoms (bloating, pain, fatigue) without the intestinal damage or antibodies seen in Celiac disease. A gluten-free diet is the detailed treatment for both."
        },
        {
            "title": "Importance of Hydration for Digestion",
            "content": "Water is essential for good digestion. It helps break down food so that your body can absorb the nutrients. It also softens stool, which helps prevent constipation. Drinking water during or after a meal aids digestion. Dehydration can lead to harder stools and slower transit time."
        },
        {
            "title": "FODMAP Diet Explained",
            "content": "FODMAP stands for Fermentable Oligosaccharides, Disaccharides, Monosaccharides, and Polyols. These are short-chain carbohydrates causing gas and bloating in sensitive individuals. A low-FODMAP diet involves restricting these foods (like wheat, dairy, beans, stone fruits) appropriately to identify triggers."
        }
    ]

    print("🧠 Generating embeddings and seeding medical articles...")
    for article_data in articles:
        # Check if exists to avoid re-embedding (saves API quota)
        if MedicalArticle.objects.filter(title=article_data["title"]).exists():
             print(f"ℹ️  Article '{article_data['title']}' already exists. Skipping.")
             continue

        print(f"   Embedding '{article_data['title']}'...")
        embedding = rag_service.get_embedding(article_data["content"])
        
        if embedding:
            MedicalArticle.objects.create(
                title=article_data["title"],
                content=article_data["content"],
                embedding=embedding
            )
            print(f"✅ Created article: {article_data['title']}")
            # Sleep to avoid hitting rate limits
            time.sleep(1) 
        else:
            print(f"❌ Failed to embed: {article_data['title']}")

if __name__ == "__main__":
    seed()
