# ARA MES - Sistema de Controle de Recebimento de Frutas

Sistema MES (Manufacturing Execution System) para controle de recebimento de frutas em packing house de exportação de uvas.

## Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Prisma ORM** - ORM para MySQL
- **ShadCN UI** - Componentes de UI
- **Tailwind CSS** - Estilização
- **JWT** - Autenticação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mysql://user:password@localhost:3306/ara_mes"
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"
```

### 3. Configurar banco de dados

```bash
# Gerar cliente Prisma
npm run db:generate

# Criar/atualizar schema no banco
npm run db:push

# Ou criar migration
npm run db:migrate
```

### 4. Criar usuário inicial

Execute o script de seed ou crie manualmente via Prisma Studio:

```bash
npm run db:studio
```

## Estrutura do Projeto

```
ara/
├── app/                    # Rotas Next.js (App Router)
│   ├── api/               # API Routes
│   ├── dashboard/         # Dashboard
│   ├── cadastros/         # Formulários de cadastro
│   └── apontamento/       # Formulário de apontamento
├── components/            # Componentes React
│   ├── ui/               # Componentes ShadCN UI
│   ├── auth/             # Componentes de autenticação
│   ├── layout/           # Componentes de layout
│   └── cadastros/        # Formulários de cadastro
├── lib/                  # Utilitários e configurações
│   ├── prisma.ts         # Cliente Prisma
│   ├── auth.ts           # Funções de autenticação
│   └── utils.ts          # Funções utilitárias
└── prisma/               # Schema Prisma
    └── schema.prisma     # Schema do banco de dados
```

## Funcionalidades

### 1ª Etapa (Implementada)

- ✅ Sistema de login com JWT
- ✅ Níveis de acesso (Diretor, Analista, Inspetor)
- ✅ Dashboard com indicadores:
  - Contentores por cor na última hora
  - Total do dia por kg
  - Sobra de contentores do dia anterior
- ✅ Formulários de cadastro:
  - Cabeçais
  - Válvulas (com cor dinâmica)
  - Variedades de frutas
  - Linhas de produção
  - Posições
  - Embaladeiras
- ✅ Formulário de apontamento de chegada:
  - Número da carroça
  - Seleção de cabeçal
  - Seleção de válvula (filtrada por cabeçal)
  - Variedade da fruta
  - Quantidade de contentores
  - Cor do contentor (automática baseada na válvula)

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia servidor de produção
- `npm run db:generate` - Gera cliente Prisma
- `npm run db:push` - Atualiza schema no banco
- `npm run db:migrate` - Cria migration
- `npm run db:studio` - Abre Prisma Studio

## Níveis de Acesso

- **DIRETOR**: Acesso completo ao sistema
- **ANALISTA**: Acesso a dashboard e cadastros
- **INSPETOR**: Acesso a dashboard e apontamentos

## Cores de Contentores

O sistema suporta as seguintes cores:
- Vermelho
- Azul Marinho
- Verde
- Amarelo
- Branco
- Laranja

A cor é definida automaticamente pela válvula selecionada no cadastro.

## Próximas Etapas

- 2ª Etapa: (A definir)
- 3ª Etapa: (A definir)

