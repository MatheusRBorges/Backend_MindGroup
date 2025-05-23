# 🧠 Backend para Plataforma de Artigos - Case MindGroup

Este é o backend de uma plataforma de publicação de artigos desenvolvida como solução para o **case MindGroup**. 
O sistema permite que usuários se registrem, publiquem, curtam, editem e excluam artigos, além de atualizar seu perfil com imagem de avatar.
---
## 🚀 Funcionalidades

- ✅ Registro e login de usuários com autenticação via JWT
- ✅ Atualização de perfil com upload de imagem
- ✅ Publicação, edição e exclusão de artigos com imagem
- ✅ Curtidas em artigos (like/unlike por usuário)
- ✅ Visualização pública de artigos
- ✅ Proteção de rotas com middleware de autenticação
- ✅ Hash de senhas com `bcryptjs`
- ✅ Upload e validação de imagens com `multer`
---
## 🧰 Tecnologias Utilizadas

| Ferramenta        | Descrição                                          |
|-------------------|----------------------------------------------------|
| **Express**       | Framework para criação da API REST                 |
| **Prisma ORM**    | ORM para interação com banco MySQL                 |
| **JWT**           | Autenticação segura baseada em tokens              |
| **bcryptjs**      | Criptografia de senhas                             |
| **multer**        | Upload de arquivos (avatar e imagem de artigo)     |
| **dotenv**        | Variáveis de ambiente                              |
| **cors**          | Liberação de requisições cross-origin              |
| **path / fs**     | Manipulação de arquivos e diretórios               |
| **typescript**    | Tipagem estática e segurança em tempo de desenvolvimento |
| **nodemon**       | Monitoramento automático do servidor durante desenvolvimento |

---
