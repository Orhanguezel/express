### **Express.js Nedir?**

Express.js, **Node.js** üzerinde çalışan minimal ve esnek bir web uygulama çatısıdır (framework). Web uygulamaları ve API'ler geliştirmek için kullanılır. Express.js, HTTP isteklerini ve middleware'leri yönetmek için kolay bir yol sağlar. Bu da, geliştiricilerin hızlı ve verimli bir şekilde uygulamalar oluşturmasını mümkün kılar.

#### **Express.js Özellikleri:**

1. **Minimal:** Basit bir yapı sunar ve yalnızca ihtiyacınız olan araçları sağlar.
2. **Middleware:** Veriyi işlemden geçiren ve isteklere yanıt dönen özel işlemler yazabilirsiniz.
3. **Routing:** URL yollarını yönetmek için güçlü bir yönlendirme mekanizması sunar.
4. **Hızlı:** Performansı yüksektir ve Node.js'nin hızını korur.
5. **Esnek:** İhtiyacınıza göre genişletilebilir.

---

### **Express.js ile Uygulama Oluşturma**

Express.js kullanarak basit bir uygulama oluşturmak için aşağıdaki adımları izleyebilirsiniz:

---

#### **1. Proje Başlatma**

Öncelikle bir Node.js projesi başlatmamız gerekiyor:

```bash
mkdir express-app
cd express-app
npm init -y
```

Bu komutlar bir `package.json` dosyası oluşturacaktır.

---

#### **2. Express.js Kurulumu**

Express.js'i yükleyin:

```bash
npm install express
```

---

#### **3. Temel Bir Express.js Uygulaması**

Bir `app.js` dosyası oluşturup aşağıdaki kodları ekleyin:

```javascript
// app.js
const express = require('express');
const app = express();

// Ana rota
app.get('/', (req, res) => {
    res.send('Merhaba Dünya! Express.js ile hoş geldiniz!');
});

// Sunucuyu başlat
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
```

---

#### **4. Uygulamayı Çalıştırma**

Sunucuyu başlatmak için şu komutu çalıştırın:

```bash
node app.js
```

Tarayıcınızda `http://localhost:3000` adresine gidin. "Merhaba Dünya! Express.js ile hoş geldiniz!" mesajını görmelisiniz.

---

### **Middleware Kullanımı**

Middleware, gelen istekleri (request) ve giden yanıtları (response) işlemek için kullanılan işlevlerdir.

**Örnek Middleware:**

```javascript
app.use((req, res, next) => {
    console.log(`${req.method} isteği yapıldı: ${req.url}`);
    next(); // Sonraki middleware'e geç
});
```

Bu middleware her isteği konsola loglayacaktır.

---

### **Routing (Yönlendirme)**

Express.js ile farklı yollar ve HTTP metotlarını tanımlayabilirsiniz.

**Örnek Routing:**

```javascript
app.get('/hello', (req, res) => {
    res.send('Merhaba! Bu bir GET isteği.');
});

app.post('/data', (req, res) => {
    res.send('POST isteği aldık!');
});
```

---

### **JSON Verisi Gönderme**

Express.js genellikle API geliştirmede kullanılır ve JSON formatında veri göndermek yaygındır.

**Örnek API Endpoint:**

```javascript
app.get('/api/user', (req, res) => {
    const user = {
        id: 1,
        name: 'Orhan Güzel',
        email: 'orhan@example.com',
    };
    res.json(user);
});
```

---

### **Dinamik Parametreler ve Query String**

**Dinamik Parametreler:**

```javascript
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Kullanıcı ID: ${userId}`);
});
```

**Query String:**

```javascript
app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`Arama terimi: ${query}`);
});
```

---

### **Static Dosyaları Sunma**

Web sitelerinde CSS, JavaScript ve resim dosyalarını sunmak için statik dosyalar kullanılabilir.

**Statik Dosya Kullanımı:**

```javascript
app.use(express.static('public'));
```

`public` klasörüne koyduğunuz dosyalar `http://localhost:3000/` adresinden erişilebilir olacaktır.

---

### **Projeyi Geliştirmek**

1. **Middleware Yapılandırma:** Kullanıcı doğrulama, hata yakalama gibi işlemler için özel middleware'ler yazabilirsiniz.
2. **Router Modülü:** Büyük projelerde yönlendirmeyi organize etmek için router modülleri kullanın.
3. **Veritabanı Entegrasyonu:** MongoDB veya MySQL gibi veritabanlarını kullanarak dinamik uygulamalar geliştirin.

---

### **Özetle**

Express.js, Node.js üzerine inşa edilmiş basit ve güçlü bir framework'tür. Temel özellikleri ve esnek yapısıyla hem küçük ölçekli uygulamalar hem de büyük ölçekli projeler için uygundur. Yukarıdaki örnekler, basit bir Express.js uygulamasını nasıl oluşturacağınızı ve genişleteceğinizi göstermektedir.