import { uploadToR2, uploadFromURLToR2 } from './uploadToR2.js';
import fs from 'fs';

// Exemplo de teste com buffer
async function testeComBuffer() {
  try {
    // Simular um buffer de arquivo (você pode usar um arquivo real)
    const textoTeste = 'Este é um teste de upload para R2';
    const buffer = Buffer.from(textoTeste, 'utf8');

    const resultado = await uploadToR2({
      fileBuffer: buffer,
      mimetype: 'text/plain',
      token: 'teste123',
      media: 'document'
    });

    console.log('Upload com buffer realizado com sucesso:');
    console.log('mediaURL:', resultado.mediaURL);
    console.log('Resultado completo:', resultado);

  } catch (error) {
    console.error('Erro no teste com buffer:', error.message);
  }
}

// Exemplo de teste com URL (descomente para testar)
async function testeComURL() {
  try {
    const resultado = await uploadFromURLToR2({
      fileURL: 'https://httpbin.org/image/jpeg',
      mimetype: 'image/jpeg',
      token: 'teste123',
      media: 'image'
    });

    console.log('Upload com URL realizado com sucesso:');
    console.log('mediaURL:', resultado.mediaURL);
    console.log('Resultado completo:', resultado);

  } catch (error) {
    console.error('Erro no teste com URL:', error.message);
  }
}

// Executar teste
console.log('Iniciando testes...\n');
await testeComBuffer();
// await testeComURL(); // Descomente para testar com URL
