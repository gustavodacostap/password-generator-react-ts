import { useState, useCallback, useEffect, useRef } from "react";
import Container from "./components/Container";
import Toast from "./components/Toast";
import appStyles from "./styles/App.module.css";
import { FaCopy } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

export default function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  // Valor temporário do input numérico (permite digitação livre)
  const [tempLength, setTempLength] = useState(String(length));
  const [showToast, setShowToast] = useState(false);

  // Referência para o timeout do toast (permite limpar antes de mostrar outro)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Gera uma nova senha baseada no comprimento */
  const generatePassword = useCallback(() => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
    const newPassword = Array.from({ length }, () =>
      charset.charAt(Math.floor(Math.random() * charset.length))
    ).join("");

    // Fecha qualquer toast aberto ao gerar nova senha
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setShowToast(false);

    // Atualiza o estado da nova senha
    setPassword(newPassword);
  }, [length]);

  /** Exibe o toast de "Texto copiado!" garantindo que apenas um esteja ativo */
  const showCopyToast = useCallback(() => {
    // Cancela o toast anterior se ainda estiver ativo
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      setShowToast(false);
    }

    // Aguarda um pequeno tempo para permitir re-renderização do toast
    setTimeout(() => {
      setShowToast(true);
      toastTimeoutRef.current = setTimeout(() => {
        setShowToast(false);
        toastTimeoutRef.current = null;
      }, 2800);
    }, 50);
  }, []);

  /** Copia a senha atual para a área de transferência e mostra o toast */
  const copyPassword = useCallback(async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    showCopyToast();
  }, [password, showCopyToast]);

  /** Fecha o toast manualmente (por botão de fechar ou lógica interna) */
  const handleCloseToast = () => {
    setShowToast(false);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
  };

  /** Atualiza o comprimento da senha (range ou input) com limite entre 1 e 50 */
  const updateLength = (value: number) => {
    const clampedLength = Math.max(1, Math.min(50, value));
    setLength(clampedLength);
    setTempLength(String(clampedLength));
  };

  /** Aplica o valor digitado no input quando o campo perde o foco */
  const handleBlurTempLength = () => {
    const numeric = Number(tempLength);
    if (!tempLength || isNaN(numeric)) {
      updateLength(12);
    } else {
      updateLength(numeric);
    }
  };

  // Gera uma senha inicial ao montar o componente
  useEffect(() => {
    generatePassword();
  }, []);

  // Gera nova senha automaticamente sempre que `length` for alterado
  useEffect(() => {
    generatePassword();
    handleCloseToast();
  }, [length]);

  return (
    <>
      <Container>
        <h1 className={appStyles.h1}>Gerador de senhas</h1>

        {/* Caixa de exibição da senha e botões de ação */}
        <div className={appStyles.passwordBox}>
          <span className={appStyles.passwordText}>{password}</span>
          <div className={appStyles.iconButtons}>
            <button
              type="button"
              onClick={generatePassword}
              title="Gerar nova senha"
              className={appStyles.iconButton}
            >
              <FiRefreshCcw />
            </button>
            <button
              type="button"
              onClick={copyPassword}
              title="Copiar senha"
              className={appStyles.iconButton}
            >
              <FaCopy />
            </button>
          </div>
        </div>

        {/* Personalização */}
        <div className={appStyles.optionsBox}>
          <h2>Escolha o tamanho</h2>
          <hr />
          <span id="range-label">Número de caracteres da senha</span>
          <div className={appStyles.rangeContainer}>
            {/* Input numérico controlado por tempLength */}
            <input
              type="number"
              min={1}
              max={50}
              maxLength={2}
              aria-labelledby="range-label"
              value={tempLength}
              onChange={(e) => {
                const value = e.target.value;
                // Permite vazio ou até dois dígitos
                if (value === "" || /^[0-9]{1,2}$/.test(value)) {
                  setTempLength(value);
                }
              }}
              onBlur={handleBlurTempLength}
              className={appStyles.numberInput}
            />

            {/* Input deslizante que altera diretamente o length */}
            <input
              id="length"
              type="range"
              min={1}
              max={50}
              aria-labelledby="range-label"
              value={length}
              onChange={(e) => updateLength(Number(e.target.value))}
            />
          </div>
        </div>
      </Container>

      {/* Toast de feedback ao copiar */}
      {showToast && (
        <Toast message="Texto copiado!" onClose={handleCloseToast} />
      )}
    </>
  );
}
