// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-header, .about-content, .instructor-content, .shop-grid, .packages-grid, .app-content, .contact-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;

            // Show popup with 24-hour response message
            showContactPopup(name);
            this.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate newsletter subscription
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            this.reset();
        });
    }

    // Shop functionality
    const addToCartButtons = document.querySelectorAll('.product-card .btn-primary');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            showNotification(`${productName} added to cart!`, 'success');
        });
    });

    // Package selection
    const packageButtons = document.querySelectorAll('.package-card .btn-primary');
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.closest('.package-card').querySelector('h3').textContent;
            showNotification(`You selected the ${packageName} package!`, 'success');
        });
    });

    // App download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('span').textContent.includes('App Store') ? 'iOS' : 'Android';
            showNotification(`Redirecting to ${platform} download...`, 'info');
        });
    });

    // Contact form popup
    function showContactPopup(name) {
        const popup = document.createElement('div');
        popup.className = 'contact-popup';
        popup.innerHTML = `
            <div class="popup-overlay"></div>
            <div class="popup-content">
                <div class="popup-header">
                    <h3>Thank You, ${name}!</h3>
                    <button class="popup-close">&times;</button>
                </div>
                <div class="popup-body">
                    <div class="popup-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <p>Your message has been successfully sent to our team.</p>
                    <p class="popup-highlight">We will respond within 24 hours.</p>
                    <p>In the meantime, feel free to explore our services and packages.</p>
                </div>
                <div class="popup-footer">
                    <button class="btn btn-primary popup-ok">Got it!</button>
                </div>
            </div>
        `;

        // Add popup styles
        const style = document.createElement('style');
        style.textContent = `
            .contact-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .popup-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }
            
            .popup-content {
                position: relative;
                background: white;
                border-radius: 20px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                animation: slideIn 0.3s ease;
            }
            
            .popup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid #f0ede5;
            }
            
            .popup-header h3 {
                color: #b8a898;
                margin: 0;
            }
            
            .popup-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #999;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .popup-close:hover {
                background: #f5f3f0;
                color: #b8a898;
            }
            
            .popup-body {
                margin-bottom: 2rem;
            }
            
            .popup-icon {
                font-size: 4rem;
                color: #b8a898;
                margin-bottom: 1rem;
            }
            
            .popup-body p {
                margin-bottom: 1rem;
                color: #5a5a5a;
                line-height: 1.6;
            }
            
            .popup-highlight {
                font-weight: 600;
                color: #b8a898;
                font-size: 1.1rem;
            }
            
            .popup-footer {
                text-align: center;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @media (max-width: 768px) {
                .popup-content {
                    padding: 1.5rem;
                    margin: 1rem;
                }
                
                .popup-icon {
                    font-size: 3rem;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(popup);

        // Close popup functionality
        const closePopup = () => {
            popup.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(popup)) {
                    document.body.removeChild(popup);
                }
            }, 300);
        };

        const closeBtn = popup.querySelector('.popup-close');
        const okBtn = popup.querySelector('.popup-ok');
        const overlay = popup.querySelector('.popup-overlay');

        closeBtn.addEventListener('click', closePopup);
        okBtn.addEventListener('click', closePopup);
        overlay.addEventListener('click', closePopup);

        // Add fadeOut animation
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#b8a898' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Counter animation for instructor stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h4');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                }
            };

            updateCounter();
        });
    }

    // Trigger counter animation when instructor section is visible
    const instructorSection = document.querySelector('.instructor');
    if (instructorSection) {
        const instructorObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    instructorObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        instructorObserver.observe(instructorSection);
    }

    // Mobile menu toggle animation
    navToggle.addEventListener('click', function() {
        const spans = this.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.transition = 'transform 0.3s ease';
            if (this.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                padding: 2rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                z-index: 999;
            }
            
            .nav-menu.active {
                transform: translateY(0);
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);
});

// Lazy loading for images (placeholder for future implementation)
function lazyLoadImages() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    // This would be replaced with actual image loading logic
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            showNotification('Image placeholder clicked! Replace with actual images.', 'info');
        });
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);