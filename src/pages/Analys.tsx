import React, { useState } from 'react';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState('');
  const [analyzedCode, setAnalyzedCode] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSend = () => {
    let codeText = message;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        analyzeCode(fileContent);
      };
      reader.readAsText(file);
    } else {
      analyzeCode(codeText);
    }

    setMessage('');
    setFile(null);
  };

  const analyzeCode = (codeStr: string) => {
    const lines = codeStr.split('\n');
    setCode(codeStr);
    setAnalyzedCode(lines);
  };

  return (
    <div className="home">
      <div className="intro">
        <h1>Автоматический анализ кода на уязвимости</h1>
        <p>
          Наш сервис использует обученную модель для анализа вашего кода и выявления потенциальных уязвимостей.
          Просто отправьте нам свой код, и мы покажем, какие фрагменты требуют доработки, а также дадим рекомендации по их улучшению.
        </p>

        {/* Сообщение + файл */}
        <div className="message-box">
          <input
            type="text"
            placeholder="Введите код или сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <label className="file-label">
            📎
            <input type="file" onChange={handleFileChange} />
          </label>

          <button onClick={handleSend}>Отправить</button>
        </div>

        {file && <p className="file-name">📁 {file.name}</p>}

        {analyzedCode.length > 0 && (
          <div className="analyzed-output">
            <h2>Результат анализа</h2>
            <pre className="code-block">
              {analyzedCode.map((line, index) => (
                <div
                  key={index}
                  className={`code-line ${index === 4 ? 'vulnerable' : ''}`}
                >
                  <span className="line-number">{index + 1}</span> {line}
                </div>
              ))}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
