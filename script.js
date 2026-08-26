// Функция для переключения языков
function changeLanguage(lang) {
    // Переводим все элементы с data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Переводим placeholder'ы
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    
    placeholders.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Обновляем язык в HTML
    document.documentElement.lang = lang;
    
    // Сохраняем выбранный язык
    localStorage.setItem('preferred-language', lang);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем сохранённый язык или используем русский по умолчанию
    const savedLang = localStorage.getItem('preferred-language') || 'ru';
    
    // Устанавливаем выбранный язык в селекторе
    const langSelector = document.getElementById('language-selector');
    if (langSelector) {
        langSelector.value = savedLang;
    }
    
    // Применяем перевод
    changeLanguage(savedLang);
    
    // Добавляем обработчик изменения языка
    if (langSelector) {
        langSelector.addEventListener('change', function(e) {
            changeLanguage(e.target.value);
        });
    }
    
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
    const currentLang = localStorage.getItem('preferred-language') || 'ru';
    
    const successMessages = {
        ru: 'Спасибо за заявку! Мы свяжемся с вами в ближайшее время.',
        en: 'Thank you for your request! We will contact you soon.',
        es: '¡Gracias por tu solicitud! Te contactaremos pronto.'
    };
    
    alert(successMessages[currentLang] || successMessages.ru);
    
    // Очищаем форму
    this.reset();
});
