import React from "react";
import "../styles/About.css";

const features = [
  "Быстрая загрузка файлов",
  "Анализ с помощью обученной модели",
  "Красивый и понятный вывод результатов",
  "Выделение потенциально опасных мест"
];

const Home = () => {
  return (
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
  );
};

export default Home;
