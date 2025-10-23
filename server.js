import express from 'express';
import { uploadFromURLToR2, uploadToR2 } from './uploadToR2.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Endpoint principal para upload de mídia
app.post('/upload-media', async (req, res) => {
  try {
    const { fileURL, mimetype, token, media, fileName } = req.body;

    // Validar parâmetros obrigatórios
    if (!fileURL || !mimetype || !token || !media) {
      return res.status(400).json({
        error: 'Parâmetros obrigatórios: fileURL, mimetype, token, media'
      });
    }

    // Fazer upload para R2
    const result = await uploadFromURLToR2({
      fileURL,
      mimetype,
      token,
      media,
      fileName
    });

    // Retornar apenas a mediaURL como solicitado
    res.json({
      success: true,
      mediaURL: result.mediaURL
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// Endpoint para upload direto com buffer/base64
app.post('/upload-buffer', async (req, res) => {
  try {
    const { fileData, mimetype, token, media, fileName, encoding } = req.body;

    // Validar parâmetros obrigatórios
    if (!fileData || !mimetype || !token || !media) {
      return res.status(400).json({
        error: 'Parâmetros obrigatórios: fileData, mimetype, token, media'
      });
    }

    // Converter base64 para buffer se necessário
    let buffer;
    if (encoding === 'base64') {
      buffer = Buffer.from(fileData, 'base64');
    } else {
      buffer = Buffer.from(fileData);
    }

    // Fazer upload para R2
    const result = await uploadToR2({
      fileBuffer: buffer,
      mimetype,
      token,
      media,
      fileName
    });

    // Retornar apenas a mediaURL como solicitado
    res.json({
      success: true,
      mediaURL: result.mediaURL
    });

  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// Endpoint de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'R2 Upload Service'
  });
});

// Endpoint para documentação
app.get('/', (req, res) => {
  res.json({
    service: 'R2 Upload Service',
    endpoints: {
      'POST /upload-media': {
        description: 'Upload de arquivo via URL',
        parameters: {
          fileURL: 'URL do arquivo para download',
          mimetype: 'Tipo MIME (ex: image/jpeg)',
          token: 'Token para organização',
          media: 'Tipo de mídia (image, video, audio, document)',
          fileName: 'Nome do arquivo (opcional)'
        }
      },
      'POST /upload-buffer': {
        description: 'Upload de arquivo via buffer/base64',
        parameters: {
          fileData: 'Dados do arquivo (buffer ou base64)',
          mimetype: 'Tipo MIME (ex: image/jpeg)',
          token: 'Token para organização',
          media: 'Tipo de mídia (image, video, audio, document)',
          fileName: 'Nome do arquivo (opcional)',
          encoding: 'base64 se os dados estão em base64'
        }
      },
      'GET /health': 'Health check do serviço'
    }
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor R2 Upload rodando na porta ${PORT}`);
  console.log(`📡 Endpoints disponíveis:`);
  console.log(`   POST http://localhost:${PORT}/upload-media`);
  console.log(`   POST http://localhost:${PORT}/upload-buffer`);
  console.log(`   GET  http://localhost:${PORT}/health`);
});

export default app;
