import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

/**
 * Função para fazer upload de arquivos para o Cloudflare R2
 * @param {Object} params - Parâmetros do upload
 * @param {Buffer|ArrayBuffer} params.fileBuffer - Buffer do arquivo para upload
 * @param {string} params.mimetype - Tipo MIME do arquivo (ex: 'image/jpeg', 'video/mp4')
 * @param {string} params.token - Token para organização de pastas
 * @param {string} params.media - Tipo de mídia (ex: 'image', 'video', 'audio', 'document')
 * @param {string} [params.fileName] - Nome customizado do arquivo (opcional)
 * @returns {Promise<Object>} Objeto com mediaURL
 */
export async function uploadToR2(params) {
  const {
    fileBuffer,
    mimetype,
    token,
    media,
    fileName: customFileName
  } = params;

  // Credenciais do R2
  const R2accessKeyId = '4584056453f0df4c3d46f74e139714bf';
  const R2secretAccessKey = '61cc0c6703f469434ace06bc865d49f2a77c65e45f24da86372f447d49721b80';
  const R2accountId = 'cd5cbd7c662d76f2a6ef25fa3208599a';
  const R2bucket = 'datafy';

  // Configuração do cliente S3 para R2
  const s3 = new S3Client({
    region: 'us-east-1',
    endpoint: `https://${R2accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2accessKeyId,
      secretAccessKey: R2secretAccessKey
    }
  });

  try {
    // Gerar nome único do arquivo se não fornecido
    let fileName;
    if (customFileName) {
      fileName = customFileName;
    } else {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const extension = mimetype?.split('/')[1]?.split(';')[0]?.trim() || 'bin';
      fileName = `${timestamp}_${randomStr}.${extension}`;
    }

    // Chave de upload (caminho no bucket)
    const uploadKey = `${media}/${token}/${fileName}`;

    // Converter para Buffer se necessário
    let bodyBuffer;
    if (fileBuffer instanceof ArrayBuffer) {
      bodyBuffer = Buffer.from(fileBuffer);
    } else if (Buffer.isBuffer(fileBuffer)) {
      bodyBuffer = fileBuffer;
    } else {
      throw new Error('fileBuffer deve ser um Buffer ou ArrayBuffer');
    }

    // Parâmetros do upload
    const uploadParams = {
      Bucket: R2bucket,
      Key: uploadKey,
      Body: bodyBuffer,
      ContentType: mimetype
    };

    // Fazer o upload
    await s3.send(new PutObjectCommand(uploadParams));

    // Retornar a URL da mídia
    const mediaURL = `https://files.datafychats.com.br/${uploadKey}`;
    
    return {
      success: true,
      mediaURL: mediaURL,
      uploadKey: uploadKey,
      fileName: fileName
    };

  } catch (error) {
    console.error('Erro no upload para R2:', error);
    throw new Error(`Erro no upload: ${error.message}`);
  }
}

/**
 * Função auxiliar para fazer upload de arquivo a partir de uma URL
 * @param {Object} params - Parâmetros do upload
 * @param {string} params.fileURL - URL do arquivo para download e upload
 * @param {string} params.mimetype - Tipo MIME do arquivo
 * @param {string} params.token - Token para organização de pastas
 * @param {string} params.media - Tipo de mídia
 * @param {string} [params.fileName] - Nome customizado do arquivo (opcional)
 * @returns {Promise<Object>} Objeto com mediaURL
 */
export async function uploadFromURLToR2(params) {
  const { fileURL, mimetype, token, media, fileName } = params;

  try {
    // Baixar o arquivo da URL
    const response = await fetch(fileURL);
    if (!response.ok) {
      throw new Error(`Erro ao baixar arquivo: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    // Fazer upload usando a função principal
    return await uploadToR2({
      fileBuffer: arrayBuffer,
      mimetype,
      token,
      media,
      fileName
    });

  } catch (error) {
    console.error('Erro no download/upload:', error);
    throw new Error(`Erro no processo: ${error.message}`);
  }
}

// Exemplo de uso
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Função uploadToR2 criada com sucesso!');
  console.log('Use: import { uploadToR2, uploadFromURLToR2 } from "./uploadToR2.js"');
}
