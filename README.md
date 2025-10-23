# 🚀 R2 Upload Service

Serviço para upload de arquivos no Cloudflare R2 Storage.

## 🔧 Instalação

```bash
npm install
```

## 🚀 Uso

### Iniciar servidor:
```bash
npm start
```

### Endpoints:

#### POST /upload-media
Upload de arquivo via URL para Cloudflare R2.

**Body:**
```json
{
  "fileURL": "https://exemplo.com/arquivo.jpg",
  "mimetype": "image/jpeg",
  "token": "seu_token",
  "media": "image"
}
```

**Resposta:**
```json
{
  "success": true,
  "mediaURL": "https://files.datafychats.com.br/image/token/arquivo.jpg"
}
```

#### GET /health
Health check do serviço.

## 🐳 Docker

```bash
# Build
docker build -t r2-upload .

# Run
docker run -p 3000:3000 r2-upload
```

## 🚀 Deploy EasyPanel

1. Criar nova app Docker no EasyPanel
2. Configurar porta 3000
3. Health check: `/health`

## 📋 Parâmetros

- **fileURL**: URL do arquivo para download
- **mimetype**: Tipo MIME (image/jpeg, video/mp4, etc.)
- **token**: Token para organização de pastas
- **media**: Tipo de mídia (image, video, audio, document)

## ⚡ Tecnologias

- Node.js 18
- Express.js
- AWS SDK v3 (para Cloudflare R2)
- Docker
