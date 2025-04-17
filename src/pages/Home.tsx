import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const CodeDemo: React.FC = () => {
  const vulnerableCode = 'const userInput = eval(input);';
  const correctedCode = 'const userInput = JSON.parse(input);';

  const [displayedCode, setDisplayedCode] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [step, setStep] = useState<'typingVulnerable' | 'showVulnerability' | 'typingCorrected' | 'success'>('typingVulnerable');

  useEffect(() => {
    let index = 0;
    let interval: NodeJS.Timeout;

    const typeText = (text: string, callback: () => void) => {
      interval = setInterval(() => {
        setDisplayedCode((prev) => prev + text[index]);
        index++;
        if (index >= text.length) {
          clearInterval(interval);
          callback();
        }
      }, index > text.length - 8 ? 160 : 60);
    };

    if (step === 'typingVulnerable') {
      setDisplayedCode('');
      typeText(vulnerableCode, () => {
        setDialogMessage('⚠️ CVA: Этот код уязвим! Я рекомендую заменить его на:');
        setStep('showVulnerability');
      });
    }

    if (step === 'typingCorrected') {
      setDisplayedCode('');
      typeText(correctedCode, () => {
        setDialogMessage('✅ CVA: Отлично, теперь всё безопасно!');
        setStep('success');
      });
    }

    return () => clearInterval(interval);
  }, [step]);

  const handleFixCode = () => {
    setDialogMessage('');
    setStep('typingCorrected');
  };

  return (
    <div className="page-wrapper">

      {/* Инфо о сайте */}
      <div className="intro">
        <h1>Автоматический анализ кода на уязвимости</h1>
        <p>
          Наш сервис использует обученную модель для анализа вашего кода и выявления потенциальных уязвимостей.
          Просто отправьте нам свой код, и мы покажем, какие фрагменты требуют доработки, а также дадим рекомендации по их улучшению.
        </p>
      </div>

      {/* Интерактивный пример */}
      <div className="code-demo-wrapper">
        <h2 className="code-demo-title">Пример анализа кода</h2>
        <div className="code-demo-block">
          <pre className="code-demo-code">{displayedCode}</pre>

          {dialogMessage && (
            <div className="code-demo-dialog">
              <p>{dialogMessage}</p>
              {step === 'showVulnerability' && (
                <>
                  <pre className="code-demo-suggestion">{'const userInput = JSON.parse(input);'}</pre>
                  <button className="code-demo-button" onClick={handleFixCode}>Заменить код</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default CodeDemo;
