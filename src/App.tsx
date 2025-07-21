import { useState, useCallback, useEffect, useRef } from "react";
import Container from "./components/Container.tsx";
import Toast from "./components/Toast";
import containerStyles from "./styles/Container.module.css";
import appStyles from "./styles/App.module.css";
import { FaCopy } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

export default function App() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [tempLength, setTempLength] = useState<string>(String(length))
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleGeneratePassword = () => {
    // Fecha o toast se estiver visível
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setShowToast(false);

    // Gera nova senha
    generatePassword();
  };

  // Gera senha com base no comprimento atual
  const generatePassword = useCallback(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
    let newPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
  }, [length]);

  // Copia a senha para a área de transferência
  const copyPassword = useCallback(async () => {
    if (password) {
      await navigator.clipboard.writeText(password);

      // Se já tiver um toast ativo, cancela ele
      if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
      setShowToast(false);

        // Aguarda um pequeno delay para o React renderizar o fechamento e reabrir o toast
        setTimeout(() => {
          setShowToast(true);
          toastTimeoutRef.current = setTimeout(() => {
            setShowToast(false);
            toastTimeoutRef.current = null;
          }, 2800);
        }, 50); // delay pequeno só para garantir que o componente re-renderize corretamente
      } else {
        // Caso não tenha toast aberto
        setShowToast(true);
        toastTimeoutRef.current = setTimeout(() => {
          setShowToast(false);
          toastTimeoutRef.current = null;
        }, 2800);
      }
    }
  }, [password]);

  // Gera senha na primeira renderização
  useEffect(() => {
    generatePassword();
  }, []);

  // Gera senha automaticamente quando o comprimento muda
  useEffect(() => {
    generatePassword();
    setTempLength(String(length))

    // Fecha o toast se estiver visível
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setShowToast(false);
  }, [length, generatePassword]);

  // Atualiza o estado length (com validação) e sincroniza o tempLength
  const applyLengthChange = (value: number) => {
    const validatedLength = Math.max(1, Math.min(50, value));
    setLength(validatedLength);
    setTempLength(String(validatedLength));
  };

    const handleCloseToast = () => {
    setShowToast(false);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
  };

  return (
    <>
      <Container className={containerStyles.container}>
        <h1 className={appStyles.h1}>Gerador de senhas</h1>

        {/* Caixa da senha */}
        <div className={appStyles.passwordBox}>
          <span className={appStyles.passwordText}>
            {password || "Sua senha aparecerá aqui"}
          </span>
          <div className={appStyles.iconButtons}>
            <button
              onClick={handleGeneratePassword}
              title="Gerar senha"
              className={appStyles.iconButton}
            >
              <FiRefreshCcw />
            </button>
            <button
              onClick={copyPassword}
              className={appStyles.iconButton}
            >
              <FaCopy />
            </button>
          </div>
        </div>

        {/* Personalização */}
        <div className={appStyles.optionsBox}>
          <h2>Personalize sua senha</h2>
          <hr />
          <label htmlFor="length">Número de caracteres da senha</label>
          <div className={appStyles.rangeContainer}>
            <input
              type="number"
              min={1}
              max={50}
              value={tempLength}
              onChange={(e) => {
                setTempLength(e.target.value); // permite apagar input, vazio etc
              }}
              onBlur={() => {
                // Ao perder foco, valida e aplica o valor
                if (tempLength === "" || isNaN(Number(tempLength))) {
                  applyLengthChange(12); // padrão 12
                } else {
                  applyLengthChange(Number(tempLength));
                }
              }}
              className={appStyles.numberInput}
            />
            <input
              id="length"
              type="range"
              min={1}
              max={50}
              value={length}
              onChange={(e) => applyLengthChange(Number(e.target.value))}
            />
          </div>
        </div>
      </Container>

      {/* Toast */}
      {showToast && (
        <Toast
          message="Texto copiado!"
          onClose={handleCloseToast}
        />
      )}
    </>
  );
}
