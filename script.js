// Optimized Portfolio Script - Professional & Performance-focused
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements for better performance
    const navbar = document.querySelector('#navbar');
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const burger = document.querySelector('#burger');
    const mobileMenu = document.querySelector('#mobile-menu');
    const scrollToTopBtn = document.querySelector('#scroll-to-top');
    const progressBar = document.querySelector('#scroll-progress');
    const preloader = document.querySelector('#preloader');
    const contactForm = document.querySelector('#contact form');

    // Optimized mobile menu toggle
    burger?.addEventListener('click', toggleMobileMenu);
    
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('h-[300px]');
        const lines = burger.querySelectorAll('div');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            mobileMenu.classList.remove('h-0');
            mobileMenu.classList.add('h-[300px]');
            
            // Animate burger to X
            lines[0]?.classList.add('rotate-45', 'translate-y-[10px]');
            lines[1]?.classList.add('opacity-0');
            lines[2]?.classList.add('-rotate-45', '-translate-y-[10px]');
        }
    }

    window.closeMobileMenu = () => {
        mobileMenu?.classList.add('h-0');
        mobileMenu?.classList.remove('h-[300px]');
        
        const lines = burger?.querySelectorAll('div');
        lines?.[0]?.classList.remove('rotate-45', 'translate-y-[10px]');
        lines?.[1]?.classList.remove('opacity-0');
        lines?.[2]?.classList.remove('-rotate-45', '-translate-y-[10px]');
    };

    // Optimized scroll handler with throttling
    let isScrolling = false;
    
    function handleScroll() {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                updateNavbar();
                updateActiveSection();
                updateScrollProgress();
                updateScrollToTop();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }

    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar?.classList.add('py-2', 'shadow-md');
            navbar?.classList.remove('py-4', 'shadow-sm');
        } else {
            navbar?.classList.add('py-4', 'shadow-sm');
            navbar?.classList.remove('py-2', 'shadow-md');
        }
    }

    function updateActiveSection() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'after:w-full');
            if (link.getAttribute('href')?.slice(1) === current) {
                link.classList.add('text-primary', 'after:w-full');
            }
        });
    }

    function updateScrollProgress() {
        if (progressBar) {
            const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (window.scrollY / scrollTotal) * 100;
            progressBar.style.width = `${Math.min(scrollProgress, 100)}%`;
        }
    }

    function updateScrollToTop() {
        if (scrollToTopBtn) {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
                scrollToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
                scrollToTopBtn.classList.remove('opacity-100', 'visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top functionality
    scrollToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Optimized Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const animation = el.dataset.animation || 'fade-in';
                const delay = el.dataset.delay || '0';
                
                // Apply animation with CSS classes
                el.style.animationDelay = `${delay}s`;
                el.classList.add('animate', `animate-${animation}`);
                
                // Stop observing to prevent re-triggering
                animationObserver.unobserve(el);
            }
        });
    }, observerOptions);

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
        animationObserver.observe(el);
    });

    // Optimized form handling
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            message: document.getElementById('message')
        };
        
        const button = contactForm.querySelector('button');
        const originalText = button.innerHTML;
        
        // Validate form
        if (validateForm(formData)) {
            // Show loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            button.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showFormSuccess(button, originalText);
                contactForm.reset();
                clearFormErrors();
            }, 1500);
        } else {
            // Focus on first error field
            const firstError = contactForm.querySelector('.border-red-500');
            firstError?.focus();
        }
    }

    function validateForm(formData) {
        let isValid = true;
        
        // Name validation
        if (!formData.name.value.trim()) {
            showFieldError(formData.name, 'Please enter your name');
            isValid = false;
        } else {
            clearFieldError(formData.name);
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.value.trim()) {
            showFieldError(formData.email, 'Please enter your email');
            isValid = false;
        } else if (!emailPattern.test(formData.email.value)) {
            showFieldError(formData.email, 'Please enter a valid email');
            isValid = false;
        } else {
            clearFieldError(formData.email);
        }
        
        // Message validation
        if (!formData.message.value.trim()) {
            showFieldError(formData.message, 'Please enter your message');
            isValid = false;
        } else if (formData.message.value.trim().length < 10) {
            showFieldError(formData.message, 'Message too short (min 10 characters)');
            isValid = false;
        } else {
            clearFieldError(formData.message);
        }
        
        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('border-red-500');
        
        // Remove existing error
        const existingError = field.parentElement.querySelector('.error-message');
        existingError?.remove();
        
        // Add new error
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message text-red-500 text-sm mt-1';
        errorElement.textContent = message;
        field.parentElement.appendChild(errorElement);
    }

    function clearFieldError(field) {
        field.classList.remove('border-red-500');
        const errorElement = field.parentElement.querySelector('.error-message');
        errorElement?.remove();
    }

    function clearFormErrors() {
        contactForm.querySelectorAll('.border-red-500').forEach(field => {
            clearFieldError(field);
        });
    }

    function showFormSuccess(button, originalText) {
        button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        button.classList.add('bg-green-500');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('bg-green-500');
            button.disabled = false;
        }, 3000);
    }

    // Preloader handling
    window.addEventListener('load', () => {
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('opacity-0');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    });

    // Enhanced project card interactions
    document.querySelectorAll('.project-card, [data-animate]').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
                img.style.filter = 'brightness(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = '';
                img.style.filter = '';
            }
        });
    });

    // Simple typing effect for hero text
    const heroGradientText = document.querySelector('.hero .text-gradient');
    if (heroGradientText) {
        const originalText = heroGradientText.textContent;
        heroGradientText.textContent = '';
        
        let i = 0;
        function typeText() {
            if (i < originalText.length) {
                heroGradientText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeText, 80);
            }
        }
        
        setTimeout(typeText, 1000);
    }

    // Smooth anchor link scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu?.classList.contains('h-[300px]')) {
                    closeMobileMenu();
                }
            }
        });
    });

    // Live form validation
    ['name', 'email', 'message'].forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('input', function() {
                if (this.classList.contains('border-red-500') && this.value.trim()) {
                    clearFieldError(this);
                }
            });
        }
    });

    // Performance monitoring (optional)
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
            }, 0);
        });
    }
});

// Utility functions
const Utils = {
    // Debounce function for performance optimization
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
};
