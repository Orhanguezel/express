### **Express Async Handler Nedir?**

`express-async-handler`, Express.js uygulamalarında asenkron fonksiyonlar ile çalışırken hata yönetimini kolaylaştırmak için kullanılan hafif bir kütüphanedir. Bu kütüphane, özellikle asenkron middleware ve route handler'larında (örneğin `async`/`await` kullanılan yerlerde) oluşabilecek hataları yakalamak ve Express'in hata yönetim middleware'ine otomatik olarak iletmek için kullanılır.

---

### **Neden Gerekli?**

Express.js, doğal olarak asenkron hataları (örneğin `async`/`await` içinde oluşan hatalar) otomatik olarak yakalamaz. Örneğin:

```javascript
app.get('/example', async (req, res) => {
    const data = await someAsyncFunction();
    throw new Error('Something went wrong'); // Bu hata Express tarafından otomatik yakalanmaz
});
```

Bu durumda, `throw` edilen hata yakalanmaz ve Express'in hata yönetim middleware'ine ulaşmaz. Bunun yerine, tüm uygulamayı çökertebilir. Bu tür hataları manuel olarak yönetmek zorunda kalırsınız:

```javascript
app.get('/example', async (req, res, next) => {
    try {
        const data = await someAsyncFunction();
        res.json(data);
    } catch (err) {
        next(err); // Hataları manuel olarak next'e iletmek gerekiyor
    }
});
```

`express-async-handler`, bu işlemi otomatikleştirir ve manuel `try-catch` bloklarına olan ihtiyacı ortadan kaldırır.

---

### **Nasıl Kullanılır?**

#### **Kurulum**

Kütüphaneyi yüklemek için:

```bash
npm install express-async-handler
```

#### **Kullanım**

`express-async-handler`, bir asenkron fonksiyonu sararak hataları otomatik olarak yakalar ve `next` fonksiyonuna iletir.

```javascript
const express = require('express');
const asyncHandler = require('express-async-handler');
const app = express();

app.get(
    '/example',
    asyncHandler(async (req, res) => {
        const data = await someAsyncFunction();
        res.json(data); // Hata oluşursa otomatik olarak next(err) çağrılır
    })
);
```

---

### **Örnek Kullanım**

#### **Kütüphane Olmadan:**
```javascript
app.get('/users', async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err); // Hataları manuel olarak iletmek gerekiyor
    }
});
```

#### **Kütüphane ile:**
```javascript
const asyncHandler = require('express-async-handler');

app.get(
    '/users',
    asyncHandler(async (req, res) => {
        const users = await User.find();
        res.json(users); // Hatalar otomatik olarak yakalanır
    })
);
```

---

### **Avantajları**

1. **Daha Az Kod:** `try-catch` bloklarını tekrar tekrar yazmanız gerekmez.
2. **Hata Yönetimi:** Tüm asenkron hataları otomatik olarak Express'in hata yönetim middleware'ine iletir.
3. **Kolay Entegrasyon:** Var olan Express.js projelerine kolayca eklenebilir.
4. **Performans:** Oldukça hafif bir kütüphanedir ve performans üzerinde olumsuz bir etkisi yoktur.

---

### **Hata Yönetimi ile Birlikte Kullanım**

Eğer bir `errorHandler.js` dosyanız varsa, bu kütüphane ile entegre şekilde çalışabilir:

```javascript
const express = require('express');
const asyncHandler = require('express-async-handler');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.get(
    '/users',
    asyncHandler(async (req, res) => {
        const users = await User.find();
        res.json(users);
    })
);

// Hata yönetim middleware'i
app.use(errorHandler);
```

---

### **Alternatifler**

- `express-promise-router`: Benzer şekilde asenkron hataları yakalamak için kullanılan bir router kütüphanesidir.

---

### **Sonuç**

`express-async-handler`, asenkron fonksiyonlar ile çalışan Express.js uygulamaları için harika bir yardımcı kütüphanedir. Özellikle büyük projelerde tekrar eden `try-catch` bloklarını azaltır ve hata yönetimini daha temiz bir hale getirir. Eğer asenkron kodlar kullanıyorsanız, projelerinizde bu kütüphaneyi entegre etmeyi düşünebilirsiniz. 😊