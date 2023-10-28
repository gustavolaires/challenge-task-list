# challenge-task-list

## Requisitos

* NodeJS
* Git

## Como configurar

1. Clone o projeto;

`
  git clone https://github.com/gustavolaires/challenge-task-list.git
`

2. Acesse o diretório raiz do projeto;

`
  cd challenge-task-list
`

3. Instale as dependências do projeto;

`
  npm install
`

4. Crie um arquivo **.env.local** para adicionar as variáveis de ambiente;

5. Crie um projeto na [plataforma do Firebase](https://firebase.google.com/?hl=pt) (Será necessário uma conta google);

6. Adicione o Firebase Authentication com os métodos de autenticação:

- Google
- Github
- E-mail/Senha

7. Adicione o Firebase Realtime Database;

8. Nas configurações do projeto firebase, em Contas de serviço, crie uma chave privada;

9. Adicione as seguintes variáveis de ambiente (**.env.local**) a partir do projeto firebase criado na plataforma:

- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PRIVATE_DATABASE_URL
- NEXT_PRIVATE_FIREBASE_ADMIN_TYPE
- NEXT_PRIVATE_FIREBASE_ADMIN_PROJECT_ID
- NEXT_PRIVATE_FIREBASE_ADMIN_PRIVATE_KEY_ID
- NEXT_PRIVATE_FIREBASE_ADMIN_PRIVATE_KEY
- NEXT_PRIVATE_FIREBASE_ADMIN_CLIENT_EMAIL
- NEXT_PRIVATE_FIREBASE_ADMIN_CLIENT_ID
- NEXT_PRIVATE_FIREBASE_ADMIN_AUTH_URI
- NEXT_PRIVATE_FIREBASE_ADMIN_TOKEN_URI
- NEXT_PRIVATE_FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL
- NEXT_PRIVATE_FIREBASE_ADMIN_CLIENT_X509_CERT_URL
- NEXT_PRIVATE_FIREBASE_ADMIN_UNIVERSE_DOMAIN

10. Execute o projeto localmente;

`
  npm run dev
`

11. Abra o seguinte o endereço [http://localhost:3000](http://localhost:3000) no seu navegador;

12. Enjoy! :D

## Observações

Esse projeto foi implementado utilizando [Next.js](https://nextjs.org/) e [Firebase](https://firebase.google.com/?hl=pt).

Bibliotecas utilizadas:

- @heroicons/react
- firebase
- firebase-admin
- moment
- next
- react
- react-dom
- react-firebase-hooks
- react-hook-form
- react-spinners
- socket.io
- socket.io-client