# 🦋 FloraMind - Vintage Botanical AI Gut Health App

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://flora.algoforge.com.tr)

Bu proje, modern web geliştirme standartlarına uygun olarak **Django (Backend)** ve **React (Frontend)** kullanılarak geliştirilmiştir. Proje mimarisi, ölçeklenebilirlik ve performans için mikro servis mantığıyla ayrılmış ve Dockerize edilmiştir.

## 🏗️ Mimari Yapı

Proje iki ana parçadan oluşur ve modern bir mimariye sahiptir:

*   **Frontend:** React.js ile geliştirildi, Vite kullanılarak build alındı ve **Vercel**'de deploy edildi.
*   **Backend:** Django REST Framework ile geliştirildi, Dockerize edilerek **Render**'da deploy edildi.
*   **AI:** Google Gemini 2.0 Flash API (RAG Mimarisi ile).
*   **Veritabanı:** PostgreSQL / SQLite (Geliştirme ortamında).

### Akış Şeması
`Kullanıcı` -> `React (Frontend)` -> `API İstekleri` -> `Django (Docker Container)` -> `Gemini AI`

---

## 🛠️ Teknolojiler

### Backend
*   **Python & Django:** Ana framework.
*   **Django REST Framework:** API yönetimi.
*   **Google Gemini 2.0:** Semptom analizi ve teşhis için.
*   **Docker:** Uygulama izolasyonu ve deploy kolaylığı için.
*   **Gunicorn:** Production seviyesi WSGI sunucusu.
*   **WhiteNoise:** Statik dosyaların (CSS/JS) sunulması için.

### Frontend
*   **React.js:** Kullanıcı arayüzü.
*   **Vite:** Hızlı geliştirme ve build aracı.
*   **Material UI:** Bileşen kütüphanesi (Vintage tema özelleştirmeleriyle).
*   **Axios:** API istekleri için.

---

## ⚙️ Kurulum (Local Development)

Projeyi kendi bilgisayarınızda çalıştırmak için şu adımları izleyin:

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/mmustafasenoglu/-FloraMind.git
cd -FloraMind
```

### 2. Backend Kurulumu
```bash
cd backend

# Sanal ortam oluşturma
python -m venv venv

# Aktif etme (Mac/Linux)
source venv/bin/activate
# Aktif etme (Windows)
venv\Scripts\activate

# Gereksinimleri yükleme
pip install -r requirements.txt

# Çevre Değişkenleri (.env)
# .env dosyası oluşturun ve GEMINI_API_KEY ekleyin.

# Veritabanı ve Çalıştırma
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Kurulumu
```bash
cd frontend

# Paketleri yükleme
npm install

# Çalıştırma
npm run dev
```

### 4. Docker ile Çalıştırma (Opsiyonel)
```bash
# Backend image oluşturma
docker build -t floramind-backend ./backend

# Çalıştırma
docker run -d -p 8000:8000 --env-file backend/.env floramind-backend
```
