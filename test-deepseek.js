#!/usr/bin/env node

/**
 * Script de Teste da Integração Deepseek
 * 
 * Como usar:
 * 1. Configure DEEPSEEK_API_KEY em .env.local
 * 2. Execute: node test-deepseek.js
 */

const fs = require('fs');
const path = require('path');

// Cores para output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

console.log(`${colors.bright}${colors.blue}🧪 Teste da Integração Deepseek${colors.reset}\n`);

// 1. Verificar .env.local
console.log(`${colors.blue}1. Verificando configuração...${colors.reset}`);
const envPath = path.join(__dirname, '.env.local');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  console.log(`${colors.red}❌ .env.local não encontrado${colors.reset}`);
  console.log(`${colors.yellow}   Execute: cp .env.example .env.local${colors.reset}`);
  process.exit(1);
}

// 2. Verificar chave Deepseek
const envContent = fs.readFileSync(envPath, 'utf8');
const deepseekKeyMatch = envContent.match(/NEXT_PUBLIC_DEEPSEEK_API_KEY\s*=\s*(.+)/);

if (!deepseekKeyMatch || !deepseekKeyMatch[1].trim()) {
  console.log(`${colors.red}❌ NEXT_PUBLIC_DEEPSEEK_API_KEY não configurada${colors.reset}`);
  console.log(`${colors.yellow}   Adicione sua chave em .env.local${colors.reset}`);
  process.exit(1);
}

const apiKey = deepseekKeyMatch[1].trim();
console.log(`${colors.green}✅ Chave Deepseek encontrada${colors.reset}`);
console.log(`   Chave: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}\n`);

// 3. Verificar arquivos
console.log(`${colors.blue}2. Verificando arquivos...${colors.reset}`);

const requiredFiles = [
  'lib/deepseek.ts',
  'components/DDSGenerator.tsx',
  'app/api/deepseek/route.ts',
  'DEEPSEEK_SETUP.md',
  'ARQUITETURA.md',
];

let allFilesExist = true;
for (const file of requiredFiles) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`${colors.green}✅${colors.reset} ${file}`);
  } else {
    console.log(`${colors.red}❌${colors.reset} ${file}`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.log(`${colors.red}\n❌ Alguns arquivos estão faltando${colors.reset}`);
  process.exit(1);
}

console.log();

// 4. Testar conexão com API
console.log(`${colors.blue}3. Testando conexão com API Deepseek...${colors.reset}`);

const testPrompt = 'Responda com um JSON simples: {"status": "ok", "timestamp": "<data_atual>"}';

fetch('https://api.deepseek.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'deepseek-chat',
    messages: [
      {
        role: 'user',
        content: testPrompt,
      },
    ],
    temperature: 0.5,
    max_tokens: 100,
  }),
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.choices && data.choices[0] && data.choices[0].message) {
      console.log(`${colors.green}✅ Conexão bem-sucedida${colors.reset}`);
      console.log(`   Resposta da IA: ${data.choices[0].message.content.substring(0, 50)}...\n`);
      
      // Sucesso!
      console.log(`${colors.bright}${colors.green}🎉 Tudo está pronto!${colors.reset}`);
      console.log(`\n${colors.blue}Próximas etapas:${colors.reset}`);
      console.log(`1. Execute: ${colors.yellow}npm run dev${colors.reset}`);
      console.log(`2. Acesse: ${colors.yellow}http://localhost:3000${colors.reset}`);
      console.log(`3. Clique em: ${colors.yellow}"Gerar com IA (Deepseek)"${colors.reset}\n`);
    } else {
      throw new Error('Resposta inválida da API');
    }
  })
  .catch(error => {
    console.log(`${colors.red}❌ Erro ao conectar${colors.reset}`);
    console.log(`   Erro: ${error.message}`);
    console.log(`\n${colors.yellow}Possíveis causas:${colors.reset}`);
    console.log(`- Chave API incorreta ou expirada`);
    console.log(`- Sem conexão com internet`);
    console.log(`- API Deepseek indisponível`);
    console.log(`\n${colors.blue}Solução:${colors.reset}`);
    console.log(`1. Verifique a chave em: https://platform.deepseek.com`);
    console.log(`2. Atualize .env.local com uma chave válida`);
    console.log(`3. Tente novamente\n`);
    process.exit(1);
  });
