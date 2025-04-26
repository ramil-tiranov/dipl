import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Добавляем useNavigate
import '../styles/Home.css';

const features = [
  "Быстрая загрузка файлов",
  "Анализ с помощью обученной модели",
  "Красивый и понятный вывод результатов",
  "Выделение потенциально опасных мест"
];

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Для перехода по клику
  const [stage, setStage] = useState<number>(0);
  const processStages = [
    { icon: '👤', text: 'Пользователь загружает файл' },
    { icon: '📤', text: 'Отправка на сервер' },
    { icon: '🖥️', text: 'Сервер обрабатывает файл' },
    { icon: '🔍', text: 'Анализ кода' },
    { icon: '📊', text: 'Генерация отчёта' },
    { icon: '📩', text: 'Отправка результата' },
    { icon: '✅', text: 'Готово!' }
  ];

  // Для анимации появления features
  const featuresRef = useRef<HTMLDivElement>(null);
  const [featuresVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (featuresRef.current) observer.observe(featuresRef.current);
    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
    };
  }, []);

  // Анимация процесса
  useEffect(() => {
    const timer = setInterval(() => {
      setStage(prev => (prev + 1) % processStages.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [processStages.length]);

  return (
    <div className="page-wrapper">
      {/* Hero + Features Section объединено */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Code Vulnerability Analysis</h1>
          <div className="hero-description">
            <p>
              Добро пожаловать в наш сервис! Здесь вы можете загрузить ваш код или
              проект, и обученная модель проанализирует его на наличие
              <span className="highlight"> уязвимостей</span> или
              <span className="highlight"> ошибок</span>.
            </p>
            <p>Мы делаем вашу разработку — безопаснее и качественнее.</p>
          </div>

          {/* Features Block внутри Hero */}
          <section className="features" ref={featuresRef}>
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
      </div>

      {/* Process Animation Section */}
      <div className="process-section">
        <div className="section-header">
          <h2>Как это работает?</h2>
          <p>Весь процесс анализа кода занимает всего несколько минут</p>
        </div>
        <div className="process-line">
          {processStages.map((item, index) => (
            <div 
              key={index}
              className={`process-step ${index === stage ? 'active' : ''} ${index < stage ? 'completed' : ''}`}
            >
              <div className="step-icon">{item.icon}</div>
              <div className="step-text">{item.text}</div>
              {index < processStages.length - 1 && (
                <div className={`step-connector ${index < stage ? 'completed' : ''}`}></div>
              )}
            </div>
          ))}
        </div>
        {/* Кнопка - появляется после features */}
        {featuresVisible && (
            <button
              className="cta-button"
              onClick={() => navigate('/analysis')}
              style={{ marginTop: '2rem' }}
            >
              Попробовать сейчас
            </button>
          )}
      </div>
    </div>
  );
};

export default HomePage;
