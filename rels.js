document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openBtn");
    const cover = document.getElementById("cover");
    const content = document.getElementById("content");
    const music = document.getElementById("music");

    let opened = false;

    // Если кнопки открытия нет (мы убрали секцию), автоматически показываем контент
    function revealContent(autoPlay) {
      if (opened) return; opened = true;
      if (autoPlay && music) {
        music.volume = 0.45;
        music.play().catch(() => { /* автозапуск может быть заблокирован */ });
      }
      if (cover) {
        cover.style.opacity = "0";
        setTimeout(() => {
          if (cover) cover.style.display = "none";
          if (content) content.classList.add("show");
        }, 600);
      } else if (content) {
        content.classList.add("show");
      }
    }

    if (openBtn) {
      openBtn.addEventListener("click", () => revealContent(true));
    } else {
      revealContent(false);
    }

    // Навигация по локации при клике на кнопку
    const showMapBtn = document.getElementById('showMapBtn');
    if (showMapBtn) {
        showMapBtn.addEventListener('click', function() {
            // Координаты локации
            const latitude = 39.661611;
            const longitude = 66.9536258;
            
            // Открываем Google Maps с маршрутом для мобильных и десктопа
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
            window.open(mapsUrl, '_blank');
        });
    }
});

// Плавное появление секций при скролле
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach(section => observer.observe(section));


// Hover-анимация для цветов дресс-кода
const colors = document.querySelectorAll('.colors span');

colors.forEach(color => {
  color.addEventListener('mouseenter', () => {
    color.style.transform = 'scale(1.15)';
    color.style.boxShadow = '0 6px 15px rgba(0,0,0,0.25)';
  });

  color.addEventListener('mouseleave', () => {
    color.style.transform = 'scale(1)';
    color.style.boxShadow = 'none';
  });
});


// (необязательно) Автодата
const dateEl = document.getElementById('event-date');
if (dateEl) {
  const date = new Date();
  dateEl.textContent = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
// 🔔 ДАТА СВАДЬБЫ (ИЗМЕНИ!)
const weddingDate = new Date('2026-06-20T16:00:00').getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = days;
  hoursEl.textContent = hours.toString().padStart(2, '0');
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);
