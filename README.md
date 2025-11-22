# 🌐 SlowRush - Global Solution 2025 (Front-End)

Solução de **bem-estar corporativo** para prevenção de **Burnout** através de monitoramento inteligente de dados.

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura da Solução](#-arquitetura-da-solução)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação e Execução](#-instalação-e-execução)
- [Como Usar](#-como-usar)
- [Endpoints da API](#-endpoints-da-api)
- [Integrantes](#-integrantes)
- [Vídeo Demo](#-vídeo-demo)

---

## 💡 Sobre o Projeto

O **SlowRush** é uma plataforma **B2B SaaS** desenvolvida para combater a *toxicidade de agenda* e o **Burnout** em ambientes corporativos híbridos e remotos.

A solução atua em duas frentes:

### 👤 Para o Colaborador  
Um **Assistente de Check-out Diário** que coleta informações sobre:  
- Horas trabalhadas  
- Intensidade de reuniões  
- Sentimento ao fim do expediente  

### 👨‍💼 Para o Gestor  
Um **Dashboard Analítico** que transforma estes dados em indicadores de risco (Burnout), permitindo ações preventivas e reduzindo o turnover.

---

## 🏗️ Arquitetura da Solução

A aplicação segue uma arquitetura moderna, desacoplada e escalável:

### **Front-end (Este Repositório)**  
SPA criada com **React + Vite**, focada em performance e experiência do usuário.

### **Back-end (API)**  
Desenvolvido em **Java + Quarkus**, hospedado no Render.

### **Banco de Dados**  
- Oracle Database (FIAP)  
- H2 (Testes)

---

## 📁 Estrutura de Pastas (Front-end)
src/
├── components/ # Componentes reutilizáveis (Navbar, Footer...)
├── contexts/ # Contexto de Tema (Dark/Light Mode)
├── pages/ # Telas da aplicação (Login, Dashboard, Checkout...)
│ ├── Dashboard.tsx # Lógica de gráficos + GET/DELETE
│ ├── Checkout.tsx # Formulário + POST
│ └── ...
├── App.tsx # Configuração de Rotas (React Router DOM)
└── main.tsx # Ponto de entrada da aplicação

---

## 🚀 Tecnologias Utilizadas

### **Front-End**
- React  
- Vite  
- TypeScript  
- TailwindCSS  
- Context API  
- React Router DOM  
- Fetch API  

### **Back-End (Integração)**
- Java 17  
- Quarkus  
- Maven  

---

## 🔧 Instalação e Execução

### **Pré-requisitos**
- Node.js 18+
- NPM ou Yarn

### **Passo a Passo**

1. **Clone o repositório**
```bash
git clone https://github.com/eduardomeloalbanese/slowrushfront.git
Acesse o diretório

bash
Copiar código
cd slowrushfront
Instale as dependências

bash
Copiar código
npm install
Configure o arquivo .env

ini
Copiar código
VITE_API_URL=https://slowrush-0d63.onrender.com
Execute o projeto

bash
Copiar código
npm run dev
Acesse em: http://localhost:5173

📱 Como Usar
🔗 Deploy
👉 https://slowrushfront-t6fd.vercel.app

👤 Colaborador
Preencha as 3 etapas do Check-out

Envie os dados (POST)

👨‍💼 Gestor
Acesse o Dashboard

Visualize gráficos + tabela

Edite ou exclua registros (PUT/DELETE)

🌙 Tema (Dark/Light)
Clique no ícone (sol/lua) para alternar o tema global.

📡 Endpoints da API
URL Base:

arduino
Copiar código
https://slowrush-0d63.onrender.com
Método	Rota	Descrição
GET	/api/checkouts	Retorna todos os registros
POST	/api/checkouts	Salva um novo check-out
PUT	/api/checkouts/{id}	Atualiza um registro
DELETE	/api/checkouts/{id}	Remove um registro

👨‍💻 Integrantes (Turma 1TDSPX)
Nome	RM	GitHub	LinkedIn
Eduardo de Melo Albanese	RM561790	GitHub	LinkedIn
Guilherme de Andrade Martini	RM566087	GitHub	LinkedIn
Nathan Gonçalves Pereira Mendes	RM564666	GitHub	LinkedIn

Adicione os links reais aos perfis GitHub e LinkedIn.

🎥 Vídeo Demo
📺 Assista no YouTube:
👉 https://youtu.be/Zvv0O1R60b4?si=hfEWidge93s2RjxA