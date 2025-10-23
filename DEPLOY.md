# 🚀 SERVIDOR R2 UPLOAD - DEPLOY VPS

## ENDPOINT CRIADO:

### **POST /upload-media**
```
http://SEU_IP:3000/upload-media
```

## PARÂMETROS DO BODY (JSON):

```json
{
  "fileURL": "https://exemplo.com/arquivo.jpg",
  "mimetype": "image/jpeg",
  "token": "seu_token_aqui",
  "media": "image"
}
```

### **Parâmetros obrigatórios:**
- ✅ **fileURL**: URL do arquivo para download
- ✅ **mimetype**: Tipo MIME (image/jpeg, video/mp4, etc.)
- ✅ **token**: Seu token/apikey 
- ✅ **media**: Tipo de mídia (image, video, audio, document)

### **Parâmetros opcionais:**
- **fileName**: Nome customizado do arquivo

## RESPOSTA:
```json
{
  "success": true,
  "mediaURL": "https://files.datafychats.com.br/image/token/arquivo.jpg"
}
```

---

## 🔧 COMO COLOCAR NA VPS:

### 1. **Fazer upload dos arquivos:**
```bash
# Copie estes arquivos para sua VPS:
- server.js
- uploadToR2.js
- package.json
```

### 2. **Na VPS, instalar dependências:**
```bash
npm install
```

### 3. **Iniciar o servidor:**
```bash
npm start
# ou
node server.js
```

### 4. **O servidor roda na porta 3000**
```bash
# Health check:
curl http://seu_ip:3000/health
```

---

## 📋 EXEMPLO DE USO NO SEU CÓDIGO:

```javascript
// No lugar do código que estava dando erro:
const response = await fetch('http://SEU_IP:3000/upload-media', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fileURL: fileURL,        // URL que você já tem
    mimetype: mimetype,      // Tipo MIME que você já tem
    token: token,           // Seu token que você já tem
    media: media            // Tipo de mídia que você já tem
  })
});

const result = await response.json();
const mediaURL = result.mediaURL; // ✅ PRONTO!

return {
  ...dadosTradados,
  mediaURL: mediaURL
};
```

---

## ⚡ ENDPOINTS DISPONÍVEIS:

- **POST /upload-media** - Upload via URL (o que você precisa)
- **POST /upload-buffer** - Upload via buffer/base64
- **GET /health** - Status do servidor
- **GET /** - Documentação da API

---

## 🔥 PRONTO PARA USAR!
Coloque na VPS e use o endpoint `/upload-media`!
