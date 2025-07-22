# Sistema de Pessoas CRUD

Um sistema completo de CRUD (Create, Read, Update, Delete) para gerenciamento de pessoas, desenvolvido com **Backend .NET Core** e **Frontend Angular 17**.

## 🚀 Tecnologias Utilizadas

### Backend
- **.NET 8.0**
- **ASP.NET Core Web API**
- **C#**
- **Swagger/OpenAPI**

### Frontend
- **Angular 17**
- **TypeScript**
- **CSS3 com Grid e Flexbox**
- **Responsive Design**

## 📋 Funcionalidades

- ✅ **Criar** novas pessoas
- ✅ **Listar** todas as pessoas
- ✅ **Editar** pessoas existentes
- ✅ **Excluir** pessoas
- ✅ **Interface responsiva** e moderna
- ✅ **Validação de formulários**
- ✅ **Dados estáticos** (conforme solicitado)

## 🏗️ Estrutura do Projeto

```
PessoasCRUD-DotNetAngular/
├── backend/
│   └── PessoasAPI/
│       ├── Controllers/
│       │   └── PessoasController.cs
│       ├── Models/
│       │   └── Pessoa.cs
│       ├── Services/
│       │   └── PessoaService.cs
│       ├── Program.cs
│       └── PessoasAPI.csproj
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/
│   │   │   │   └── pessoa.ts
│   │   │   ├── services/
│   │   │   │   └── pessoa.service.ts
│   │   │   ├── pessoas/
│   │   │   │   └── pessoas.component.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   └── app.routes.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos

1. **.NET 8.0 SDK** instalado
2. **Node.js** (versão 16 ou superior)
3. **npm** ou **yarn**

### Backend (.NET Core)

1. **Navegue para a pasta do backend:**
   ```bash
   cd backend/PessoasAPI
   ```

2. **Restaura as dependências:**
   ```bash
   dotnet restore
   ```

3. **Executa o projeto:**
   ```bash
   dotnet run
   ```

4. **Acesse a API:**
   - **Swagger UI:** https://localhost:7001/swagger
   - **API Base:** https://localhost:7001/api/pessoas

### Frontend (Angular)

1. **Navegue para a pasta do frontend:**
   ```bash
   cd frontend
   ```

2. **Instala as dependências:**
   ```bash
   npm install
   ```

3. **Executa o projeto:**
   ```bash
   npm start
   ```

4. **Acesse a aplicação:**
   - **URL:** http://localhost:4200

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/pessoas` | Lista todas as pessoas |
| `GET` | `/api/pessoas/{id}` | Busca uma pessoa específica |
| `POST` | `/api/pessoas` | Cria uma nova pessoa |
| `PUT` | `/api/pessoas/{id}` | Atualiza uma pessoa |
| `DELETE` | `/api/pessoas/{id}` | Remove uma pessoa |

## 📝 Modelo de Dados

```csharp
public class Pessoa
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Endereco { get; set; }
    public DateTime DataNascimento { get; set; }
}
```

## 🎨 Interface do Usuário

A interface foi desenvolvida com foco na **experiência do usuário**:

- **Design responsivo** que funciona em desktop e mobile
- **Formulário intuitivo** com validação em tempo real
- **Cards elegantes** para exibição das pessoas
- **Animações suaves** e feedback visual
- **Cores harmoniosas** com gradientes modernos

## 🔧 Funcionalidades da Interface

### Formulário
- **Campos obrigatórios** com validação
- **Modo de edição** integrado
- **Botão de cancelar** durante edição
- **Feedback visual** para campos inválidos

### Lista de Pessoas
- **Cards informativos** com todos os dados
- **Botões de ação** (Editar/Excluir)
- **Estado vazio** quando não há pessoas
- **Hover effects** para melhor interação

### Responsividade
- **Layout em grid** que se adapta ao tamanho da tela
- **Botões empilhados** em telas menores
- **Tipografia responsiva**
- **Espaçamento otimizado** para mobile

## 🛠️ Desenvolvimento

### Backend
- **Arquitetura limpa** com separação de responsabilidades
- **Injeção de dependências** configurada
- **CORS habilitado** para comunicação com frontend
- **Swagger** para documentação da API
- **Dados estáticos** conforme solicitado

### Frontend
- **Angular 17** com standalone components
- **TypeScript** para type safety
- **Services** para comunicação com API
- **Reactive forms** para validação
- **CSS Grid e Flexbox** para layout

## 🎯 Como Usar

1. **Inicie o backend** primeiro
2. **Inicie o frontend**
3. **Acesse** http://localhost:4200
4. **Adicione pessoas** usando o formulário
5. **Edite ou exclua** pessoas usando os botões na lista

## 📱 Compatibilidade

- ✅ **Chrome** (recomendado)
- ✅ **Firefox**
- ✅ **Safari**
- ✅ **Edge**
- ✅ **Mobile browsers**

## 🎨 Características Visuais

- **Paleta de cores:** Tons de azul e roxo
- **Gradientes:** Efeitos visuais modernos
- **Sombras:** Profundidade e elevação
- **Bordas arredondadas:** Design suave
- **Animações:** Transições suaves

## 🔒 Segurança

- **CORS configurado** para permitir apenas o frontend
- **Validação de entrada** no backend
- **Sanitização de dados** automática
- **Headers de segurança** configurados

## 📊 Dados Iniciais

O sistema vem com **3 pessoas pré-cadastradas** para demonstração:

1. **João Silva** - Rua das Flores, 123 - 15/05/1990
2. **Maria Santos** - Av. Principal, 456 - 22/08/1985
3. **Pedro Oliveira** - Rua do Comércio, 789 - 10/03/1992

## 🚀 Próximos Passos

Para expandir o projeto, você pode:

- [ ] **Adicionar banco de dados** (SQL Server, PostgreSQL, etc.)
- [ ] **Implementar autenticação** (JWT, Identity)
- [ ] **Adicionar mais campos** (CPF, telefone, email)
- [ ] **Implementar paginação** na lista
- [ ] **Adicionar filtros** e busca
- [ ] **Implementar upload de foto**
- [ ] **Adicionar testes unitários**


Este projeto foi desenvolvido com muito carinho e dedicação, seguindo as melhores práticas de desenvolvimento e com foco na experiência do usuário.

---