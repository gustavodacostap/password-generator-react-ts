# 🔐 Gerador de Senhas — React + TypeScript

Olá! 👋 Esse é o meu primeiro projeto com React e TypeScript. A ideia aqui é simples: criar um gerador de senhas aleatórias e com uma interface intuitiva.

👉 [Acesse o projeto online aqui](https://password-generator-react-ts.vercel.app/)

## ✨ Funcionalidades

- **Gerar Senha**: Clique no botão "🔄" para gerar uma nova senha com os critérios definidos.
- **Copiar Senha**: Clique no botão "📋" para copiar a senha para a área de transferência. Um toast aparece no canto informando: Texto copiado!.
- **Feedback visual com Toast**: Ao copiar a senha, um toast aparece por 3 segundos com feedback visual e desaparece automaticamente. Se uma nova senha for gerada, o toast também é fechado automaticamente.
- **Personalizar tamanho da senha**: É possível definir a quantidade de caracteres (entre 1 e 50) por meio de:
  - Um input numérico (controlado e com validação)
  - Um input range (slider) sincronizado
- **Ajuste dinâmico e instantâneo**: Toda mudança no tamanho da senha já gera uma nova senha instantaneamente, sem precisar clicar em "gerar".
- **Personalizar composição da senha**: Você pode escolher quais tipos de caracteres a senha deve conter:
  - Letras **maiúsculas**
  - Letras **minúsculas**
  - **Números**
  - **Símbolos**
  - Sempre haverá pelo menos uma categoria ativa (não é possível desmarcar todas).
  - Ao ativar ou desativar qualquer categoria, uma nova senha é gerada automaticamente.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Tipagem estática para mais segurança e produtividade
- **CSS Modules**: Estilização modular e isolada para os componentes.
- **React Hooks**
  - useState para gerenciamento de estados
  - useEffect para sincronizar ações automáticas
  - useRef para controle de tempo do toast
  - useCallback para evitar recriação de funções desnecessariamente
