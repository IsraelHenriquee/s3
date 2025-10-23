# 🚀 DEPLOY NO EASYPANEL

## 📦 ARQUIVOS PARA DEPLOY:

Você precisa apenas destes arquivos:
- ✅ `Dockerfile`
- ✅ `.dockerignore`
- ✅ `package.json`
- ✅ `server.js`
- ✅ `uploadToR2.js`

## 🐳 CONFIGURAÇÃO NO EASYPANEL:

### 1. **Criar Nova App:**
- Nome: `r2-upload-service`
- Tipo: `Docker`

### 2. **Configurações:**
- **Port:** `3000`
- **Build Context:** `./`
- **Dockerfile:** `Dockerfile`

### 3. **Environment Variables (opcional):**
```
PORT=3000
NODE_ENV=production
```

### 4. **Health Check:**
- **Path:** `/health`
- **Port:** `3000`

## 📋 COMANDOS PARA TESTAR LOCAL:

```bash
# Build da imagem
docker build -t r2-upload .

# Rodar container
docker run -p 3000:3000 r2-upload

# Testar
curl http://localhost:3000/health
```

## ✅ ENDPOINTS APÓS DEPLOY:

- **POST** `https://sua-app.easypanel.io/upload-media`
- **GET** `https://sua-app.easypanel.io/health`

### **Exemplo de uso após deploy:**
```javascript
const response = await fetch('https://sua-app.easypanel.io/upload-media', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fileURL: "https://exemplo.com/arquivo.jpg",
    mimetype: "image/jpeg",
    token: "seu_apikey",
    media: "image"
  })
});

const result = await response.json();
console.log(result.mediaURL); // ✅ URL do R2
```

## 🔥 PRONTO PARA DEPLOY NO EASYPANEL!
