// Функция для скролла к контактам (если на главной)
function scrollToContact() {
    window.location.href = 'contact.html';
}

// Обработка формы заказа
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const serviceType = document.getElementById('service-type').value;
            const message = document.getElementById('message').value;
            
            // Показываем индикацию загрузки
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Отправка на почту через FormSubmit
            fetch('https://formsubmit.co/ajax/pcmontaje1@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    service_type: serviceType,
                    message: message,
                    _subject: 'New order from Raynex website',
                    _template: 'table',
                    _captcha: 'false'
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('Thank you for your request! We will contact you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Sorry, there was an error. Please email us directly at pcmontaje1@gmail.com');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});
