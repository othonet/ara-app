# 🚀 Push Seguro - Build Automatizado

Script automatizado para fazer push com verificação de build antes de enviar para o GitHub.

## 📋 Como Usar

### Opção 1: Usando npm

```bash
# Com mensagem de commit personalizada
npm run push "Sua mensagem de commit aqui"

# Com mensagem padrão (data/hora)
npm run push

# Com confirmação automática (sem perguntar)
npm run push "Sua mensagem" --yes
```

### Opção 2: Usando o script diretamente

```bash
# Com mensagem de commit personalizada
./scripts/safe-push.sh "Sua mensagem de commit aqui"

# Com mensagem padrão
./scripts/safe-push.sh

# Com confirmação automática (sem perguntar)
./scripts/safe-push.sh "Sua mensagem" --yes
# ou
./scripts/safe-push.sh "Sua mensagem" -y
```

## 🔄 O que o script faz

1. ✅ **Verifica mudanças** - Checa se há arquivos modificados
2. ✅ **Mostra status** - Exibe as mudanças que serão commitadas
3. ✅ **Pede confirmação** - Solicita confirmação antes de continuar (pode ser pulada com `--yes` ou `-y`)
4. ✅ **Adiciona arquivos** - `git add -A`
5. ✅ **Faz commit** - Cria commit com a mensagem fornecida
6. ✅ **Testa build** - Executa `npm run build` para verificar erros
7. ✅ **Faz push** - Se o build passar, envia para o GitHub
8. ❌ **Cancela push** - Se o build falhar, cancela o push

## 🚀 Flags Disponíveis

- `--yes` ou `-y`: Pula a confirmação interativa e faz commit/push automaticamente

## 📝 Exemplos

### Exemplo 1: Commit simples
```bash
npm run push "Adiciona nova funcionalidade"
```

### Exemplo 2: Commit com mensagem padrão
```bash
npm run push
# Usa: "Update: 2025-12-05 10:30:45"
```

### Exemplo 3: Commit com descrição detalhada
```bash
npm run push "Implementa Split Screen layout

- Adiciona layout split screen na página de login
- Remove botões desnecessários da top bar
- Centraliza container com espaços laterais"
```

### Exemplo 4: Commit sem confirmação (automático)
```bash
npm run push "Update styling" --yes
# ou
./scripts/safe-push.sh "Update styling" -y
```

## ⚠️ Importante

- **Se o build falhar**: O commit será feito localmente, mas o push será cancelado
- **Se o build passar**: O push será realizado automaticamente
- **Sempre revise** as mudanças antes de confirmar

## 🎯 Workflow Recomendado

1. Fazer suas alterações
2. Executar: `npm run push "Descrição das mudanças"`
3. Confirmar quando solicitado
4. Aguardar build e push automático

## 🔍 Verificação Manual

Se quiser apenas testar o build sem fazer push:

```bash
npm run build
```

## 🆘 Troubleshooting

### Erro: "Permission denied"
```bash
chmod +x scripts/safe-push.sh
```

### Erro: "Build failed"
- Verifique os erros no console
- Corrija os problemas
- Execute novamente: `npm run push`

### Commit foi feito mas push cancelado
- O commit está apenas local
- Corrija os erros de build
- Execute: `npm run push` novamente (vai fazer push do commit existente)

