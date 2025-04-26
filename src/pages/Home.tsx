import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const features = [
  "Быстрая загрузка файлов",
  "Анализ с помощью обученной модели",
  "Красивый и понятный вывод результатов",
  "Выделение потенциально опасных мест"
];

const CodeDemo: React.FC = () => {
  const [stage, setStage] = useState<'uploading' | 'processing' | 'finished'>('uploading');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === 'uploading') {
        setStage('processing');
      } else if (stage === 'processing') {
        setStage('finished');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="page-wrapper">
      <div className="homepage">
      <section className="hero">
        <h1>Code Vulnerability Analysis</h1>
        <p>
          Добро пожаловать в наш сервис! Здесь вы можете загрузить ваш код или
          проект, и обученная модель проанализирует его на наличие
          <span className="highlight"> уязвимостей</span> или
          <span className="highlight"> ошибок</span>.
        </p>
        <p>Мы делаем вашу разработку — безопаснее и качественнее.</p>
        <button className="cta-button">Попробовать сейчас</button>
      </section>

      <section className="features">
        <h2>Что вы получите?</h2>
        <div className="features-marquee">
          <div className="features-track">
            {[...features].map((item, index) => (
              <div className="feature-item" key={index}>
                {item}
              </div>
            ))}
          </div>
          <div className="features-fade left"></div>
          <div className="features-fade right"></div>
        </div>
      </section>
    </div>
      <div className="intro">
        <h1>Анализ кода через изображения</h1>
        <p>Отправьте своё изображение — мы его обработаем и вернём исправленную версию.</p>
      </div>

      {/* Анимация процесса */}
      <div className="code-demo-wrapper">
       
        <div className="animation-area">

          {stage === 'uploading' && (
            <div className="upload-animation">
              📂
              <p>Отправка изображения...</p>
            </div>
          )}

          {stage === 'processing' && (
            <div className="processing-animation">
              <div className="spinner"></div>
              <p>Анализ изображения...</p>
            </div>
          )}

          {stage === 'finished' && (
            <div className="result-animation">
              🖼️
              <p>Изображение обработано!</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CodeDemo;
