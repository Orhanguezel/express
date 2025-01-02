### **JWT (JSON Web Token) Nedir?**

**JWT**, bir uygulamada iki taraf arasında güvenli bir şekilde bilgi alışverişi yapmak için kullanılan bir standarttır. Bu standart, **JSON** formatında bir yapıya sahiptir ve veriyi dijital olarak imzalar. Dijital imza sayesinde, bilgi değiştirilemez ve doğruluğu garanti edilir.

JWT, genellikle kimlik doğrulama (authentication) ve yetkilendirme (authorization) işlemlerinde kullanılır.

---

### **JWT'nin Yapısı**

Bir JWT, üç farklı parçadan oluşur ve noktalar (`.`) ile ayrılır:

1. **Header (Başlık):**
   - Token hakkında meta bilgileri içerir.
   - Örneğin, hangi algoritmanın (HS256, RS256) kullanıldığını belirtir.
   - Örnek:
     ```json
     {
       "alg": "HS256",
       "typ": "JWT"
     }
     ```

2. **Payload (Yük):**
   - Token içindeki esas bilgileri taşır.
   - Örneğin, kullanıcı ID’si, rolü, e-posta gibi bilgiler yer alır.
   - Bu kısım **şifrelenmez**, sadece **kodlanır (base64)**. Yani, token’ı gören biri payload’ı okuyabilir.
   - Örnek:
     ```json
     {
       "id": "12345",
       "email": "user@example.com",
       "role": "admin"
     }
     ```

3. **Signature (İmza):**
   - Token'ın doğruluğunu garanti eden dijital imzadır.
   - Header ve Payload, belirli bir algoritma (örneğin HMAC-SHA256) ve bir **gizli anahtar (secret key)** kullanılarak imzalanır.
   - Örnek:
     ```
     HMACSHA256(
       base64UrlEncode(header) + "." + base64UrlEncode(payload),
       secret
     )
     ```

---

### **JWT'nin Avantajları**
1. **Stateless (Durumsuz) Yapı:**
   - JWT, server tarafında oturum bilgisi tutmayı gerektirmez.
   - Tüm doğrulama ve yetkilendirme bilgileri token içinde taşınır.

2. **Verimli ve Güvenilir:**
   - Token’lar, JSON formatında olduğundan kolayca kodlanır ve çözülür.
   - Dijital imza sayesinde token'ın manipüle edilmediğinden emin olunur.

3. **Çoklu Platform Desteği:**
   - JWT, mobil uygulamalar, web uygulamaları ve API servisleri dahil birçok platformda kullanılabilir.

---

### **JWT Kullanım Alanları**

1. **Kimlik Doğrulama (Authentication):**
   - Kullanıcı giriş yapar ve bir JWT alır.
   - Daha sonra, kullanıcı her istekte bu token’ı gönderir.
   - Backend, token’ı doğrular ve kullanıcıyı yetkilendirir.

2. **Yetkilendirme (Authorization):**
   - Token içinde kullanıcının rolü (örneğin `admin` veya `user`) saklanır.
   - Backend, kullanıcıya uygun yetkileri bu role göre belirler.

3. **Veri Bütünlüğü Sağlama:**
   - JWT, dijital imza sayesinde, veri transferi sırasında bilgilerin değiştirilmediğini garanti eder.

---

### **JWT Kullanımı**

Bir JWT kullanımı şu adımlarla gerçekleşir:

1. **Kullanıcı Giriş Yapar:**
   Kullanıcı, kullanıcı adı ve şifre ile giriş yapar.

2. **JWT Oluşturulur ve Gönderilir:**
   Backend, kullanıcı bilgilerini alır, doğrular ve bir JWT oluşturur. Bu token genelde şu bilgilere sahiptir:
   - Kullanıcı ID
   - Kullanıcı rolü
   - Token süresi

   Token örneği:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg2MTczNjAwLCJleHAiOjE2ODYxNzcyMDB9.sQbHgZpLv9qY0DK9d3qRmzJAlWwh8zvPHpQyIkGy8Fc
   ```

3. **Kullanıcı, Token’ı Saklar:**
   Kullanıcı, bu token’ı genelde `LocalStorage`, `SessionStorage` veya `HTTP Only Cookie` gibi yerlerde saklar.

4. **Her İstekle Token Gönderilir:**
   Kullanıcı, korumalı bir API’ye istek gönderirken token’ı genelde `Authorization` başlığı içinde gönderir:
   ```
   Authorization: Bearer <JWT_TOKEN>
   ```

5. **Backend Token’ı Doğrular:**
   Backend, token’ı alır ve doğrular. Eğer token geçerli ve süresi dolmamışsa, işlem devam eder.

---

### **JWT Örneği**

#### **JWT Oluşturma:**
```javascript
const jwt = require('jsonwebtoken');

const payload = {
  id: "12345",
  email: "user@example.com",
  role: "admin"
};

const token = jwt.sign(payload, "SECRET_KEY", { expiresIn: '1h' });
console.log(token);
```

#### **JWT Doğrulama:**
```javascript
const jwt = require('jsonwebtoken');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Kullanıcının gönderdiği token

try {
  const decoded = jwt.verify(token, "SECRET_KEY");
  console.log(decoded); // Token geçerliyse, içeriği burada alırsınız
} catch (err) {
  console.error("Invalid token");
}
```

---

### **JWT’nin Zayıf Yönleri**
1. **Payload Şifrelenmez:**
   - Token'daki bilgiler sadece **kodlanır** (base64). Bu nedenle hassas bilgiler taşınmamalıdır.

2. **Süresi Dolmuş Token:**
   - Kullanıcı token süresi dolduktan sonra tekrar giriş yapmak zorundadır.

3. **Secret Key Güvenliği:**
   - Gizli anahtar (secret key) tehlikeye girerse, tüm token’lar güvensiz hale gelir.

---

### **JWT ile İlgili Tavsiyeler**
- **Hassas Bilgi Taşımayın:** Örneğin, kullanıcı şifresi veya kredi kartı bilgileri token içinde taşınmamalıdır.
- **Süresini Sınırlayın:** Token’ların süresini kısa tutun (`expiresIn`).
- **HTTP Only Cookies Kullanımı:** Tarayıcı güvenliğini artırmak için token’ı `HTTP Only Cookie` içinde saklayın.
- **Secret Key’i Güvende Tutun:** Anahtarın ele geçirilmesi tüm sistemin güvenliğini tehlikeye atar.

---

JWT, modern uygulamalarda kimlik doğrulama ve yetkilendirme için güçlü ve verimli bir araçtır. Ancak doğru kullanımı ve güvenlik önlemleri alınması önemlidir. Başka bir sorunuz olursa, detaylıca yardımcı olabilirim! 😊