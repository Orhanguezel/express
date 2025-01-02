### **Express Cookie Nedir?**

**Cookie**, istemci (genellikle bir tarayıcı) ile sunucu arasında veri saklamak ve taşımak için kullanılan küçük bir veri parçasıdır. **Express.js**, bir Node.js web çerçevesidir ve cookie işlemleri için kolaylık sağlar. Cookie'ler, kullanıcı oturumlarını yönetmek, tercihlerini saklamak veya uygulamalar arasında veri taşımak için kullanılır.

---

### **Cookie'nin Temel Amaçları**

1. **Kullanıcı Kimlik Doğrulama:**
   - Oturum yönetimi ve kullanıcının kimliğini doğrulamak için kullanılır.
   - Örneğin: Bir kullanıcı giriş yaptığında, bir `sessionID` cookie'si oluşturulur ve kullanıcının kimliği doğrulanır.

2. **Kullanıcı Tercihlerini Saklama:**
   - Kullanıcıya özel ayarları veya tercihleri saklamak için kullanılır.
   - Örneğin: Dil tercihi (`lang=en`), tema seçimi (`darkMode=true`).

3. **Durumsuz Uygulamalarda Veri Taşımak:**
   - HTTP protokolü stateless (durumsuz) olduğu için, cookie'ler oturum bilgisini taşımaya yardımcı olur.

---

### **Express.js ile Cookie Kullanımı**

Express.js, cookie'ler ile çalışmayı kolaylaştıran **`cookie-parser`** gibi bir middleware sağlar. Aşağıda cookie'leri ayarlama, okuma ve silme işlemleri detaylıca açıklanmıştır.

---

### **Cookie Nasıl Kullanılır?**

#### **1. Cookie'leri Ayarlama (`res.cookie`)**
Sunucu, kullanıcıya cookie göndermek için `res.cookie()` yöntemini kullanır.

```javascript
const express = require('express');
const app = express();

// Cookie ayarlama
app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'Orhan', { httpOnly: true, maxAge: 1000 * 60 * 60 }); // 1 saat
    res.send('Cookie ayarlandı!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

- **`key` ve `value`:** Cookie adı ve değeri.
- **Seçenekler:**
  - `httpOnly`: Cookie'yi JavaScript tarafından okunamaz yapar (güvenlik için önerilir).
  - `maxAge`: Cookie'nin geçerlilik süresi (milisaniye cinsinden).
  - `secure`: Cookie'nin sadece HTTPS üzerinden gönderilmesini sağlar.
  - `sameSite`: Cookie'nin üçüncü taraf isteklere nasıl tepki vereceğini belirler (`Strict`, `Lax` veya `None`).

---

#### **2. Cookie'leri Okuma (`req.cookies`)**
`cookie-parser` middleware’i, Express.js'de cookie'leri kolayca okumak için kullanılır.

**Middleware Kurulumu:**

```bash
npm install cookie-parser
```

**Cookie Okuma:**

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/get-cookie', (req, res) => {
    const username = req.cookies.username;
    res.send(username ? `Hello, ${username}!` : 'Cookie bulunamadı!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

#### **3. Cookie'leri Silme (`res.clearCookie`)**
Sunucu, kullanıcıdaki bir cookie'yi kaldırmak için `res.clearCookie()` yöntemini kullanır.

```javascript
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('username'); // Cookie silinir
    res.send('Cookie silindi!');
});
```

---

### **Cookie'nin Avantajları**

1. **Oturum Yönetimi:**
   - Kullanıcı girişlerini ve oturum durumlarını yönetmek için idealdir.

2. **Durumsuz HTTP'yi Destekler:**
   - HTTP protokolü stateless olduğu için, cookie'ler kullanıcı oturum bilgilerini taşımaya yardımcı olur.

3. **Küçük Veri Parçalarını Saklama:**
   - Kullanıcı tarafında küçük miktarda bilgi saklamak için hızlı bir çözümdür.

4. **Tarayıcı Destekli:**
   - Modern tarayıcıların tümü cookie'leri destekler ve kolayca yönetir.

5. **HTTP Header’ları ile Gönderilir:**
   - Cookie'ler, her istekle otomatik olarak sunucuya gönderilir.

---

### **Cookie'nin Dezavantajları**

1. **Kısıtlı Depolama Alanı:**
   - Bir cookie'nin maksimum boyutu yaklaşık 4KB’dır.

2. **Güvenlik Riski:**
   - Cookie, istemci tarafında saklandığı için hassas veriler içermez. **`httpOnly`** ve **`secure`** gibi seçeneklerle güvenlik artırılabilir.

3. **Her İstekle Gönderilir:**
   - Cookie'ler her HTTP isteğiyle birlikte sunucuya gönderilir, bu da gereksiz ağ trafiği yaratabilir.

4. **XSS ve CSRF Saldırılarına Duyarlılık:**
   - Doğru güvenlik önlemleri alınmazsa, cookie'ler saldırılara karşı savunmasız olabilir.

---

### **Cookie ile JWT Kullanımı**
Cookie'ler, JWT (JSON Web Token) gibi teknolojilerle birlikte sıklıkla kullanılır. JWT, bir kullanıcı oturumu için token oluşturur ve bu token bir cookie içinde saklanabilir.

**Örnek:**

```javascript
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.get('/login', (req, res) => {
    const token = jwt.sign({ id: '123', role: 'admin' }, 'SECRET_KEY', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.send('JWT cookie olarak ayarlandı!');
});

app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Token bulunamadı!');

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        res.send(`Hoş geldiniz, rolünüz: ${decoded.role}`);
    } catch (err) {
        res.status(401).send('Geçersiz token!');
    }
});
```

---

### **Cookie'nin Alternatifleri**
1. **LocalStorage / SessionStorage:**
   - Tarayıcıda veri saklamak için modern alternatiflerdir, ancak bu depolama alanlarına JavaScript tarafından erişilebilir.

2. **HTTP Headers (Token Tabanlı Yaklaşım):**
   - Cookie yerine JWT gibi token'lar, HTTP header'larında saklanabilir ve kullanıcının kimliğini doğrulamak için kullanılabilir.

---

### **Sonuç**

- **Amacı:** Cookie'ler, kullanıcı bilgilerini istemci tarafında güvenli bir şekilde saklamak ve oturumları yönetmek için kullanılır.
- **Avantajı:** Oturum yönetimini kolaylaştırır, istemci-sunucu iletişimini güçlendirir.
- **Güvenlik:** Cookie kullanırken `httpOnly`, `secure` ve `sameSite` gibi güvenlik önlemleri alınmalıdır.

Cookie'ler ile güvenli ve etkin oturum yönetimi sağlayabilir, aynı zamanda modern web uygulamalarında kolayca entegre edebilirsiniz. Daha fazla bilgiye ihtiyacınız olursa yardımcı olmaktan mutluluk duyarım! 😊