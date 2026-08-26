function scrollToContact() {
    window.location.href = 'contact.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const serviceType = document.getElementById('service-type').value;
            const message = document.getElementById('message').value;
            
            const subject = encodeURIComponent('New Order from Rynex IT Website');
            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Service Type: ${serviceType}\n\n` +
                `Project Description:\n${message}`
            );
            
            window.location.href = `mailto:pcmontaje1@gmail.com?subject=${subject}&body=${body}`;
            
            alert('Your email client has been opened with your request. Please send the email to complete your order.');
            
            this.reset();
        });
    }
});
