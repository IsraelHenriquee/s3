#!/bin/bash

# Script para testar o endpoint
echo "🧪 Testando endpoint de upload..."

# Teste com uma imagem de exemplo
curl -X POST http://localhost:3000/upload-media \
  -H "Content-Type: application/json" \
  -d '{
    "fileURL": "https://httpbin.org/image/jpeg",
    "mimetype": "image/jpeg", 
    "token": "teste123",
    "media": "image"
  }' | jq

echo -e "\n✅ Teste concluído!"
