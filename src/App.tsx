import { useState, useCallback } from "react";
import Container from "./components/Container.tsx";
import containerStyles from "./styles/Container.module.css";
import Button from "./components/Button.tsx";
import appStyles from "./styles/App.module.css";

type ButtonText = 'Copiar' | 'Copiado!';

export default function App() {
  // Estado para o texto do botão "Copiar"
  const [copyButtonText, setCopyButtonText] = useState<ButtonText>('Copiar');
  // Estado para armazenar a senha gerada
  const [password, setPassword] = useState<string>('');

  // Função para gerar a senha aleatória
  const generatePassword = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
    const length = 14;
    let newPassword = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    // Atualiza o estado com a nova senha gerada
    setPassword(newPassword);
  }, []); // Apenas cria a função uma vez, pois não depende de nenhum valor externo

  // Função para copiar a senha gerada para a área de transferência
  const copyPassword = useCallback(async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopyButtonText('Copiado!');
      // Retorna o texto do botão para "Copiar" após 1.5 segundos
      setTimeout(() => setCopyButtonText('Copiar'), 1500);
    }
  }, [password]); 

  return (
    <Container className={containerStyles.container}>
      <h1 className={appStyles.h1}>Gerador de senhas</h1>
      <div className={appStyles.div}>
        <Button onClick={generatePassword}>Gerar!</Button>
        <Button onClick={copyPassword}>{copyButtonText}</Button>
      </div>
      {/* Exibe a senha gerada */}
      <span className={appStyles.span}>{password}</span>
    </Container>
  );
}
