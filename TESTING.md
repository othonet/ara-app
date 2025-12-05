# 🧪 Suite de Testes Automatizados

Suite completa de testes para garantir qualidade e prevenir erros no deploy.

## 📋 Estrutura de Testes

```
tests/
├── setup.ts              # Configuração global dos testes
├── lib/                  # Testes de funções utilitárias
│   ├── auth.test.ts     # Testes de autenticação
│   └── utils.test.ts    # Testes de utilitários
├── components/           # Testes de componentes
│   ├── ui/              # Testes de componentes UI
│   └── layout/          # Testes de layout
└── api/                 # Testes de API routes
    └── auth.test.ts     # Testes de API de autenticação
```

## 🚀 Como Executar

### Executar todos os testes
```bash
npm run test
```

### Executar testes em modo watch (desenvolvimento)
```bash
npm run test
# Pressione 'a' para rodar todos os testes
```

### Executar testes uma vez (CI/CD)
```bash
npm run test:run
```

### Executar testes com UI interativa
```bash
npm run test:ui
```

### Gerar relatório de cobertura
```bash
npm run test:coverage
```

## 📊 Cobertura de Testes

Os testes cobrem:

### ✅ Funções Utilitárias
- `lib/auth.ts`: Hash de senha, verificação, geração e validação de tokens JWT
- `lib/utils.ts`: Função `cn` para merge de classes

### ✅ Componentes
- Componentes UI básicos (Button, etc.)
- Componentes de layout (Sidebar)

### ✅ APIs
- Validação de entrada
- Tratamento de erros
- Respostas HTTP corretas

## 🔄 Integração com CI/CD

### No GitHub Actions
Os testes são executados automaticamente antes do build:
1. ✅ Instala dependências
2. ✅ Executa linter
3. ✅ **Executa testes** ← Novo!
4. ✅ Faz build
5. ✅ Faz deploy

### No Script Safe Push
O script `safe-push.sh` executa testes antes do build:
1. Verifica mudanças
2. Faz commit
3. **Executa testes** ← Novo!
4. Testa build
5. Faz push

## 📝 Adicionando Novos Testes

### Exemplo: Teste de Componente
```typescript
// tests/components/meu-componente.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MeuComponente } from '@/components/meu-componente'

describe('MeuComponente', () => {
  it('should render correctly', () => {
    render(<MeuComponente />)
    expect(screen.getByText('Texto esperado')).toBeInTheDocument()
  })
})
```

### Exemplo: Teste de Função
```typescript
// tests/lib/minha-funcao.test.ts
import { describe, it, expect } from 'vitest'
import { minhaFuncao } from '@/lib/minha-funcao'

describe('minhaFuncao', () => {
  it('should return expected value', () => {
    const result = minhaFuncao('input')
    expect(result).toBe('expected-output')
  })
})
```

## 🎯 Boas Práticas

1. **Sempre escreva testes** para novas funcionalidades
2. **Execute testes localmente** antes de fazer push
3. **Mantenha cobertura alta** (>80% para código crítico)
4. **Teste casos de erro** além de casos de sucesso
5. **Use nomes descritivos** para os testes

## 🐛 Troubleshooting

### Erro: "Cannot find module"
- Verifique se o caminho do import está correto
- Use `@/` para imports absolutos

### Erro: "window is not defined"
- Certifique-se de que `environment: 'jsdom'` está configurado no `vitest.config.ts`

### Testes muito lentos
- Use `vi.mock()` para mockar dependências pesadas
- Evite testes que fazem chamadas reais ao banco de dados

## 📚 Recursos

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

