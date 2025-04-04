// Main JavaScript for Historical School Website - Arabic Version

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Image Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.direction = 'ltr'; // Keep lightbox controls in standard position
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            
            lightbox.appendChild(lightboxImg);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
            
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
    
    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Form Validation - Updated for Arabic
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (!nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'الاسم مطلوب');
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                isValid = false;
                showError(emailInput, 'البريد الإلكتروني مطلوب');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
            } else {
                removeError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'الرسالة مطلوبة');
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                alert('شكرا لرسالتك! سنعود إليك قريبا.');
                contactForm.reset();
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.textAlign = 'right'; // Ensure error messages are right-aligned
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('error-input');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('error-input');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Run on initial load
    checkIfInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkIfInView);
});
