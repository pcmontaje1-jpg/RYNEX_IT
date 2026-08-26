// Функция для переключения языков
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Обновляем placeholder'ы
    document.getElementById('name').placeholder = lang === 'ru' ? 'Ваше имя' : 
                                              lang === 'en' ? 'Your Name' : 'Tu Nombre';
    document.getElementById('email').placeholder = 'Email';
    
    const messageTextarea = document.getElementById('message');
    messageTextarea.placeholder = lang === 'ru' ? 'Опишите ваш проект' : 
                                  lang === 'en' ? 'Describe your project' : 'Describe tu proyecto';
    
    // Сохраняем выбранный язык
    localStorage.setItem('preferred-language', lang);
}

// Обработчик изменения языка
document.getElementById('language-selector').addEventListener('change', function(e) {
    changeLanguage(e.target.value);
});

// Функция для скролла к контактам
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Обработка формы заказа
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const serviceType = document.getElementById('service-type').value;
    const message = document.getElementById('message').value;
    
    // Здесь можно добавить отправку данных на сервер
    console.log('Order submitted:', { name, email, serviceType, message });
    
    // Показываем уведомление об успешной отправке
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    
    // Очищаем форму
    this.reset();
});

// Загружаем сохранённый язык при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferred-language') || 'ru';
    document.getElementById('language-selector').value = savedLang;
    changeLanguage(savedLang);
    
    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за карточками услуг
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});
