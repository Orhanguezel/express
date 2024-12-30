### **Middleware Nedir?**

Middleware, **Express.js** gibi çerçevelerde kullanılan, HTTP isteği ile sunucu arasındaki süreçte devreye giren işlevlerdir. Middleware işlevleri, gelen istekleri (request) işleyebilir, yanıtları (response) şekillendirebilir veya başka bir middleware'e geçişi sağlayabilir.

Middleware, bir Express.js uygulamasında aşağıdaki gibi işlemler için kullanılır:

1. **Gelen isteği işleme** (örn. kullanıcı doğrulama, loglama).
2. **Yanıtları düzenleme** (örn. içerik tipi değiştirme, önbellek ekleme).
3. **Hata yönetimi**.
4. **Yönlendirme** (bir isteği başka bir middleware'e veya route'a yönlendirme).

---

### **Middleware İşleyişi**

Middleware işlevi şu üç parametreyi alır:
- `req` (Request): İstek nesnesi.
- `res` (Response): Yanıt nesnesi.
- `next`: Sonraki middleware veya route'a geçişi sağlayan bir işlevdir.

**Temel Middleware Şablonu:**

```javascript
app.use((req, res, next) => {
    console.log('Bu bir middleware işlevi');
    next(); // Sonraki middleware veya route'a geçiş
});
```

---

### **Middleware Türleri**

1. **Uygulama Seviyesi Middleware:**
   - Tüm uygulamada veya belirli rotalarda kullanılır.

2. **Yönlendirme (Route) Seviyesi Middleware:**
   - Sadece belirli bir route için çalışır.

3. **Hata Yönetim Middleware'i:**
   - Hataları yakalayıp işlem yapmak için kullanılır.

4. **Yerleşik (Built-in) Middleware:**
   - Express.js ile birlikte gelir (örn. `express.json`).

5. **Üçüncü Taraf Middleware:**
   - Dış kütüphanelerden gelir (örn. `morgan`, `cors`).

---

### **Örnekler ile Middleware Kullanımı**

#### **1. Basit Middleware**

Bu middleware gelen isteğin metot türünü ve URL'sini loglar:

```javascript
app.use((req, res, next) => {
    console.log(`İstek yapıldı: ${req.method} ${req.url}`);
    next(); // İşlemi bir sonraki middleware'e aktar
});
```

#### **2. Uygulama Seviyesi Middleware**

Bir uygulama seviyesinde, tüm rotalara uygulanacak bir middleware yazalım:

```javascript
app.use((req, res, next) => {
    console.log('Bu middleware her istek için çalışır.');
    next();
});

// Örnek rota
app.get('/', (req, res) => {
    res.send('Merhaba Dünya!');
});
```

---

#### **3. Route Seviyesi Middleware**

Sadece belirli bir rota için middleware tanımlayabilirsiniz:

```javascript
const kontrolMiddleware = (req, res, next) => {
    console.log('Bu sadece belirli bir rota için çalışır.');
    next();
};

app.get('/route', kontrolMiddleware, (req, res) => {
    res.send('Bu route middleware ile korundu.');
});
```

---

#### **4. Yerleşik Middleware**

Express.js yerleşik middleware'lerini kullanabilirsiniz.

- **express.json**: Gelen JSON verisini otomatik olarak parse eder.

```javascript
app.use(express.json());

app.post('/data', (req, res) => {
    console.log(req.body); // Gelen JSON verisi
    res.send('Veri alındı.');
});
```

- **express.static**: Statik dosyaları sunmak için kullanılır.

```javascript
app.use(express.static('public'));
```

---

#### **5. Üçüncü Taraf Middleware**

- **morgan**: HTTP logları için kullanılır.

```javascript
const morgan = require('morgan');
app.use(morgan('tiny')); // Log formatı 'tiny'
```

- **cors**: CORS (Cross-Origin Resource Sharing) sorunlarını çözmek için kullanılır.

```javascript
const cors = require('cors');
app.use(cors());
```

---

#### **6. Hata Yönetimi Middleware'i**

Express.js'de hata yönetimi için özel bir middleware yazabilirsiniz.

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Bir hata oluştu!');
});
```

Bir rota içinde hata oluşturup bu middleware'i tetikleyelim:

```javascript
app.get('/error', (req, res) => {
    throw new Error('Bu bir hata!');
});
```

---

#### **7. Yetkilendirme Middleware'i**

Gelen isteklerde kullanıcı doğrulaması yapmak için kullanılır:

```javascript
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === '12345') {
        next(); // Doğrulama başarılı, devam et
    } else {
        res.status(401).send('Yetkilendirme başarısız!');
    }
};

app.get('/secure', authMiddleware, (req, res) => {
    res.send('Güvenli veriye erişim sağlandı.');
});
```

---

### **Middleware Zinciri**

Birden fazla middleware işlevini zincir halinde kullanabilirsiniz:

```javascript
const logRequest = (req, res, next) => {
    console.log('İstek loglandı.');
    next();
};

const checkHeader = (req, res, next) => {
    if (req.headers['x-custom-header'] === 'valid') {
        next();
    } else {
        res.status(400).send('Geçersiz başlık!');
    }
};

app.get('/chain', logRequest, checkHeader, (req, res) => {
    res.send('Middleware zinciri tamamlandı.');
});
```

---

### **Sonuç**

Middleware, Express.js uygulamalarının çekirdeğini oluşturur. Veri doğrulama, hata yönetimi, loglama ve yönlendirme gibi birçok işlem için kullanılabilir. Yukarıdaki örneklerle middleware'lerin nasıl çalıştığını öğrenerek kendi projelerinizde kullanabilirsiniz.