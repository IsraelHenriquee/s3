import { uploadFromURLToR2 } from './uploadToR2.js';

/**
 * Função para processar mídia do UazAPI e fazer upload para R2
 * Substitui diretamente o código que estava dando erro
 */
export async function processarMidiaUazAPI(dadosTradados) {
  const servidor_uazapi = 'https://datafy.uazapi.com';
  
  const messageId = dadosTradados.messageId;
  const token = dadosTradados.apikey;
  const media = dadosTradados.messageType;
  const mimetype = dadosTradados.mimetype;

  try {
    // 1. Baixar a mídia do UazAPI
    const downloadResponse = await fetch(`${servidor_uazapi}/message/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({ id: messageId })
    });

    if (!downloadResponse.ok) {
      throw new Error(`Erro ao baixar a mídia: ${downloadResponse.statusText}`);
    }

    const downloadData = await downloadResponse.json();
    const fileURL = downloadData.fileURL;

    // 2. Fazer upload para R2 usando nossa função
    const uploadResult = await uploadFromURLToR2({
      fileURL: fileURL,
      mimetype: mimetype,
      token: token,
      media: media
    });

    // 3. Retornar os dados processados com a nova mediaURL
    return {
      ...dadosTradados,
      mediaURL: uploadResult.mediaURL
    };

  } catch (error) {
    console.error('Erro no processamento da mídia:', error);
    // Em caso de erro, retorna os dados originais
    return {
      ...dadosTradados,
      mediaURL: dadosTradados.mediaURL || null
    };
  }
}

// Exemplo de uso
if (import.meta.url === `file://${process.argv[1]}`) {
  // Dados de exemplo
  const dadosExemplo = {
    messageId: 'msg123',
    apikey: 'sua_api_key',
    messageType: 'image',
    mimetype: 'image/jpeg',
    mediaURL: 'url_original'
  };

  console.log('Exemplo de uso:');
  console.log('const resultado = await processarMidiaUazAPI(dadosTradados);');
  console.log('console.log(resultado.mediaURL);');
}
