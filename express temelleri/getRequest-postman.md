### **GET Request Nedir?**

**GET** isteği, bir web sunucusundan veri talep etmek için kullanılan bir HTTP metodudur. Genellikle bir kaynağı (örneğin bir web sayfası, JSON verisi veya dosya) istemek için kullanılır.

#### **GET İsteğinin Özellikleri:**
1. **Veri Gönderimi URL Üzerindendir:** Parametreler, URL'nin query string kısmında (`?param1=value1&param2=value2`) gönderilir.
2. **Veri Gönderme Sınırı:** URL uzunluk sınırı nedeniyle büyük miktarda veri gönderilemez.
3. **Güvenli (Safe):** Sunucuda veri değişikliğine neden olmaz. (Sadece okuma işlemi yapılır.)
4. **Cache (Önbellekleme):** Tarayıcı, GET isteklerini cache'leyebilir.

---

### **GET Request ile Örnek Express.js Kod**

Bir API oluşturup GET isteği almayı örnekle açıklayalım:

```javascript
const express = require('express');
const app = express();

// Basit bir GET isteği
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'Ürün A', price: 100 },
        { id: 2, name: 'Ürün B', price: 150 },
        { id: 3, name: 'Ürün C', price: 200 },
    ];
    res.json(products);
});

// Sunucuyu başlat
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
```

Bu kod, `http://localhost:3000/api/products` adresine yapılan GET isteğine JSON formatında ürün listesi döner.

---

### **Postman Nedir ve Nasıl Kullanılır?**

**Postman**, API geliştirme ve test etmek için kullanılan popüler bir araçtır. GET, POST, PUT, DELETE gibi tüm HTTP metotlarını kolayca kullanmanızı sağlar.

#### **Postman ile GET İsteği Yapma:**

1. **Postman'i İndir ve Kur:**
   - [Postman Resmi Sitesi](https://www.postman.com/) üzerinden indirip kurabilirsiniz.

2. **Yeni Bir İstek Oluştur:**
   - Postman'i açın ve `New Request` seçeneğini seçin.

3. **URL Girişi:**
   - URL alanına API'nizin adresini girin (örneğin, `http://localhost:3000/api/products`).

4. **Metod Seçimi:**
   - Sol taraftan `GET` metodunu seçin.

5. **Gönder Butonu:**
   - `Send` butonuna tıklayın. Yanıt penceresinde API'den gelen veriyi göreceksiniz.

---

### **Query Parametrelerini Kullanma**

Query string parametreleri ile özelleştirilmiş istekler yapabilirsiniz.

#### **Express.js Örneği:**

```javascript
app.get('/api/products', (req, res) => {
    const category = req.query.category; // Örneğin: ?category=electronics
    res.send(`Kategori: ${category}`);
});
```

#### **Postman ile Kullanımı:**

1. URL'yi şu şekilde düzenleyin:
   ```
   http://localhost:3000/api/products?category=electronics
   ```

2. `Send` butonuna tıklayın. API'nin döndüğü yanıt `Kategori: electronics` olacaktır.

---

### **Başlık (Header) Kullanımı**

Bazı GET isteklerinde, ek bilgiler göndermek için **Header** kullanabilirsiniz (örneğin, API anahtarları).

#### **Express.js Örneği:**

```javascript
app.get('/api/auth', (req, res) => {
    const apiKey = req.headers['api-key']; // Header'dan al
    if (apiKey === '123456') {
        res.send('Erişim Başarılı!');
    } else {
        res.status(401).send('Erişim Reddedildi!');
    }
});
```

#### **Postman ile Header Gönderimi:**

1. **Headers Sekmesine Git:**
   - URL'nin altındaki sekmelerden `Headers` seçeneğine tıklayın.

2. **Anahtar ve Değer Girin:**
   - Key kısmına `api-key`, Value kısmına `123456` yazın.

3. **Gönder:**
   - Eğer doğru anahtar gönderildiyse "Erişim Başarılı!" yanıtını alırsınız.

---

### **Postman İle Test Avantajları**

1. **Parametre Gönderimi:** Query string veya body parametrelerini kolayca gönderebilirsiniz.
2. **Header Yönetimi:** API anahtarları ve özel başlıklar eklemek için kullanabilirsiniz.
3. **Yanıt Doğrulama:** API'den dönen yanıtı JSON veya başka formatlarda kolayca görüntüleyebilirsiniz.
4. **Test Senaryoları:** Otomasyon için test senaryoları oluşturabilirsiniz.

---

### **Sonuç**

GET istekleri, veri talep etmek için kullanılan temel bir HTTP metodudur. Express.js ile GET isteği işlemek oldukça basittir ve Postman, API testlerini kolaylaştırır. Postman, hem başlangıç seviyesindeki geliştiriciler hem de ileri düzey projeler için güçlü bir araçtır. Bu adımları izleyerek API'lerinizi kolayca geliştirebilir ve test edebilirsiniz.