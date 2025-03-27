// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('#navbar');
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const burger = document.querySelector('#burger');
    const mobileMenu = document.querySelector('#mobile-menu');

    // Toggle mobile navigation
    burger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('h-0')) {
            mobileMenu.classList.remove('h-0');
            mobileMenu.classList.add('h-[300px]');
            
            // Transform burger to X
            const lines = burger.querySelectorAll('div');
            lines[0].classList.add('rotate-45', 'translate-y-[10px]');
            lines[1].classList.add('opacity-0');
            lines[2].classList.add('-rotate-45', '-translate-y-[10px]');
        } else {
            closeMobileMenu();
        }
    });

    // Close mobile menu function
    window.closeMobileMenu = () => {
        mobileMenu.classList.add('h-0');
        mobileMenu.classList.remove('h-[300px]');
        
        // Transform X back to burger
        const lines = burger.querySelectorAll('div');
        lines[0].classList.remove('rotate-45', 'translate-y-[10px]');
        lines[1].classList.remove('opacity-0');
        lines[2].classList.remove('-rotate-45', '-translate-y-[10px]');
    };

    // Scroll event for navbar and active section highlighting
    window.addEventListener('scroll', () => {
        // Navbar background change on scroll
        if (window.scrollY > 100) {
            navbar.classList.add('py-2', 'shadow-md');
            navbar.classList.remove('py-4', 'shadow-sm');
        } else {
            navbar.classList.add('py-4', 'shadow-sm');
            navbar.classList.remove('py-2', 'shadow-md');
        }

        // Determine active section for navigation highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'after:w-full');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('text-primary', 'after:w-full');
            }
        });
    });

    // Animation on scroll using Intersection Observer
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const animation = el.dataset.animation || 'fade-in';
                const delay = el.dataset.delay || '0';
                
                // Store original styles
                if (!el.dataset.originalColor) {
                    el.dataset.originalColor = window.getComputedStyle(el).color;
                }
                
                // Apply different animation types
                switch(animation) {
                    case 'fade-up':
                        el.style.animation = `slideUp 0.6s ${delay}s ease-out forwards`;
                        break;
                    case 'fade-down':
                        el.style.animation = `slideDown 0.6s ${delay}s ease-out forwards`;
                        break;
                    case 'fade-left':
                        el.style.animation = `slideLeft 0.6s ${delay}s ease-out forwards`;
                        break;
                    case 'fade-right':
                        el.style.animation = `slideRight 0.6s ${delay}s ease-out forwards`;
                        break;
                    case 'zoom-in':
                        el.style.animation = `zoomIn 0.6s ${delay}s ease-out forwards`;
                        break;
                    default:
                        el.style.animation = `fadeIn 0.8s ${delay}s ease-out forwards`;
                }
                
                // Ensure text color is preserved after animation
                el.addEventListener('animationend', () => {
                    if (el.dataset.originalColor) {
                        el.style.color = el.dataset.originalColor;
                    }
                });
                
                el.classList.add('animate');
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Enhanced animation sequence for hero section
    const sequenceAnimate = () => {
        const heroTitle = document.querySelector('.hero h1');
        const heroSubtitle = document.querySelector('.hero h2');
        const heroDesc = document.querySelector('.hero p.text-slate-600');
        const heroCta = document.querySelector('.hero .flex.flex-wrap');

        setTimeout(() => { 
            heroTitle.classList.add('opacity-100'); 
        }, 200);
        
        setTimeout(() => { 
            heroSubtitle.classList.add('opacity-100'); 
            heroDesc.classList.add('opacity-100');
        }, 800);
        
        setTimeout(() => { 
            heroCta.classList.add('opacity-100'); 
        }, 1400);
    };
    
    sequenceAnimate();

    // Interactive project hover effects
    const projectCards = document.querySelectorAll('.project-card, [data-animate]');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('img');
            const content = card.querySelector('.p-6');
            if (img) {
                img.classList.add('scale-105');
                img.style.filter = 'brightness(1.05)';
            }
            if (content) {
                content.classList.add('bg-blue-50', 'dark:bg-blue-900/20');
                content.classList.remove('bg-white', 'dark:bg-slate-800');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('img');
            const content = card.querySelector('.p-6');
            if (img) {
                img.classList.remove('scale-105');
                img.style.filter = '';
            }
            if (content) {
                content.classList.remove('bg-blue-50', 'dark:bg-blue-900/20');
                content.classList.add('bg-white', 'dark:bg-slate-800');
            }
        });
    });

    // Form validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (!name.value.trim()) {
                name.classList.add('border-red-500');
                isValid = false;
            } else {
                name.classList.remove('border-red-500');
            }
            
            if (!email.value.trim() || !email.value.includes('@')) {
                email.classList.add('border-red-500');
                isValid = false;
            } else {
                email.classList.remove('border-red-500');
            }
            
            if (!message.value.trim()) {
                message.classList.add('border-red-500');
                isValid = false;
            } else {
                message.classList.remove('border-red-500');
            }
            
            if (isValid) {
                // Show success message
                const button = contactForm.querySelector('button');
                const originalText = button.innerHTML;
                button.innerHTML = 'Message Sent!';
                button.classList.add('bg-green-500');
                
                // Reset form
                contactForm.reset();
                
                // Restore button after 3 seconds
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.classList.remove('bg-green-500');
                }, 3000);
            }
        });
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check for saved theme preference or prefer-color-scheme
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        // Apply the theme
        if (savedTheme === 'dark' || (!savedTheme && userPrefersDark)) {
            document.documentElement.classList.add('dark');
        }
        
        // Handle theme toggle click
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Scroll progress indicator
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (window.scrollY / scrollTotal) * 100;
            progressBar.style.width = scrollProgress + '%';
        });
    }

    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
                scrollToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
                scrollToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Enhanced animation system with GSAP (add GSAP library)
    const loadGSAP = () => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.async = true;
        script.onload = initializeGSAPAnimations;
        document.head.appendChild(script);
    };

    const initializeGSAPAnimations = () => {
        // Only run if GSAP is loaded
        if (window.gsap) {
            // Create staggered animations for skill items
            const skillItems = document.querySelectorAll('.skill-category li');
            gsap.from(skillItems, {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: "top 80%"
                }
            });

            // Modified section title animation to preserve text content
            document.querySelectorAll('section h2').forEach(title => {
                // Skip animation if ScrollTrigger isn't available
                if (!gsap.plugins || !gsap.plugins.ScrollTrigger) {
                    console.warn('ScrollTrigger plugin not available');
                    return;
                }
                
                // Store original text and create a wrapper
                const originalText = title.textContent;
                const wrapper = document.createElement('span');
                wrapper.classList.add('title-wrapper');
                
                // Create visible but transparent characters that will be animated
                let html = '';
                for (let i = 0; i < originalText.length; i++) {
                    const char = originalText[i];
                    html += `<span class="inline-block opacity-0 title-char">${char === ' ' ? '&nbsp;' : char}</span>`;
                }
                
                // Preserve original text in the DOM with fallback 
                title.setAttribute('data-original-text', originalText);
                wrapper.innerHTML = html;
                title.innerHTML = '';
                title.appendChild(wrapper);
                
                // Create animation that ensures text remains visible
                gsap.to(wrapper.querySelectorAll('.title-char'), {
                    opacity: 1,
                    stagger: 0.03,
                    duration: 0.4,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        once: true,
                        onEnter: () => {
                            wrapper.style.opacity = 1;
                        },
                        onEnterBack: () => {
                            wrapper.style.opacity = 1;
                        },
                        onLeaveBack: () => {
                            wrapper.style.opacity = 1;
                        }
                    },
                    onComplete: () => {
                        // Ensure all characters are visible when animation completes
                        wrapper.querySelectorAll('.title-char').forEach(char => {
                            char.style.opacity = 1;
                        });
                    }
                });
                
                // Fallback to ensure titles are always visible
                setTimeout(() => {
                    if (wrapper.querySelector('.title-char.opacity-0')) {
                        wrapper.querySelectorAll('.title-char').forEach(char => {
                            char.classList.remove('opacity-0');
                            char.style.opacity = 1;
                        });
                    }
                }, 1500);
            });
        }
    };

    // Load GSAP library for enhanced animations
    loadGSAP();

    // Add parallax effect to decorative elements
    const parallaxElements = document.querySelectorAll('.animate-float');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        parallaxElements.forEach(el => {
            const depth = parseFloat(el.getAttribute('data-depth') || 0.1);
            const moveX = mouseX * depth * 40;
            const moveY = mouseY * depth * 40;
            el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) translateY(-10px)`;
        });
    });

    // Add preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('opacity-0');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    });
});

// Particle background effect for hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('#home');
    if (!heroSection) return;

    // Create canvas element for particles
    const canvas = document.createElement('canvas');
    canvas.classList.add('absolute', 'inset-0', '-z-10');
    heroSection.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const resizeCanvas = () => {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles = [];
    const particleCount = 30;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: `rgba(99, 102, 241, ${Math.random() * 0.2})`
        });
    }
    
    // Draw particles
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Boundary check with smooth wrapping
            if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
            if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
            if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
            if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        });
        
        requestAnimationFrame(drawParticles);
    }
    
    drawParticles();
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// Typing effect for hero tagline
document.addEventListener('DOMContentLoaded', function() {
    const heroTagline = document.querySelector('.hero h1 .text-gradient');
    if (!heroTagline) return;
    
    const originalText = heroTagline.textContent;
    heroTagline.textContent = '';
    
    let i = 0;
    const typingSpeed = 80;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTagline.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
});

// Portfolio filtering system
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-white'));
            
            // Add active class to clicked button
            button.classList.add('active', 'bg-primary', 'text-white');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // Show all if filter is 'all', otherwise check category
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.remove('opacity-0', 'scale-95');
                    }, 50);
                } else {
                    const categories = card.getAttribute('data-categories').split(' ');
                    if (categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.remove('opacity-0', 'scale-95');
                        }, 50);
                    } else {
                        card.classList.add('opacity-0', 'scale-95');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
});

// Custom cursor effect
document.addEventListener('DOMContentLoaded', function() {
    // Check if we should use custom cursor (desktop only)
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        const cursorDot = document.createElement('div');
        
        cursor.classList.add('custom-cursor');
        cursorDot.classList.add('cursor-dot');
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);
        
        document.addEventListener('mousemove', (e) => {
            // Default cursor follower with lag
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            
            // Dot follows cursor exactly
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });
        
        // Add effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, [data-cursor="pointer"]');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-active');
                cursorDot.classList.add('dot-active');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-active');
                cursorDot.classList.remove('dot-active');
            });
        });
        
        // Add custom CSS for the cursor
        const style = document.createElement('style');
        style.innerHTML = `
            body { cursor: none; }
            .custom-cursor {
                position: fixed;
                width: 40px;
                height: 40px;
                border: 2px solid rgba(15, 76, 129, 0.3);
                border-radius: 50%;
                pointer-events: none;
                transform-origin: center;
                transition: transform 0.2s, width 0.2s, height 0.2s, border-color 0.2s;
                z-index: 9999;
                transform: translate3d(0, 0, 0) translate(-50%, -50%);
            }
            .cursor-dot {
                position: fixed;
                width: 8px;
                height: 8px;
                background-color: #0F4C81;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                transition: width 0.2s, height 0.2s, background-color 0.2s;
            }
            .cursor-active {
                width: 60px;
                height: 60px;
                border-color: rgba(15, 76, 129, 0.5);
                background-color: rgba(15, 76, 129, 0.05);
            }
            .dot-active {
                width: 10px;
                height: 10px;
                background-color: #0F4C81;
            }
        `;
        document.head.appendChild(style);
    }
});

// Advanced form handling with AJAX submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const button = contactForm.querySelector('button');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        
        // Validation
        let isValid = true;
        const errors = {};
        
        // Name validation
        if (!name.value.trim()) {
            markInvalid(name, 'Please enter your name');
            errors.name = 'Name is required';
            isValid = false;
        } else {
            markValid(name);
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            markInvalid(email, 'Please enter your email');
            errors.email = 'Email is required';
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            markInvalid(email, 'Please enter a valid email address');
            errors.email = 'Email is invalid';
            isValid = false;
        } else {
            markValid(email);
        }
        
        // Message validation
        if (!message.value.trim()) {
            markInvalid(message, 'Please enter your message');
            errors.message = 'Message is required';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            markInvalid(message, 'Message too short (min 10 characters)');
            errors.message = 'Message too short';
            isValid = false;
        } else {
            markValid(message);
        }
        
        if (!isValid) {
            // Reset button if validation fails
            button.innerHTML = originalText;
            button.disabled = false;
            return;
        }
        
        // Form data
        const formData = {
            name: name.value.trim(),
            email: email.value.trim(),
            message: message.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Simulate AJAX form submission
        setTimeout(() => {
            // In a real scenario, you'd send formData to your server endpoint
            console.log('Form submission data:', formData);
            
            // Show success message
            button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            button.classList.add('bg-green-500');
            
            // Reset form
            contactForm.reset();
            
            // Restore button after delay
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('bg-green-500');
                button.disabled = false;
            }, 3000);
        }, 1500);
    });
    
    // Form validation helper functions
    function markInvalid(element, message) {
        element.classList.add('border-red-500');
        
        // Remove any existing error message
        const existingError = element.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('p');
        errorElement.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1', 'font-medium');
        errorElement.innerHTML = message;
        element.parentElement.appendChild(errorElement);
    }
    
    function markValid(element) {
        element.classList.remove('border-red-500');
        element.classList.add('border-green-500');
        
        // Remove any existing error message
        const existingError = element.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Live validation as user types
    ['name', 'email', 'message'].forEach(id => {
        const field = document.getElementById(id);
        if (!field) return;
        
        field.addEventListener('input', function() {
            if (field.classList.contains('border-red-500')) {
                // Revalidate only if previously marked as invalid
                if (field.value.trim().length > 0) {
                    field.classList.remove('border-red-500');
                    const errorMsg = field.parentElement.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            }
        });
    });
});

// Interactive timeline for About section
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.experience-timeline');
    if (!timeline) return;
    
    const timelineItems = timeline.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Animate this item
            item.classList.add('active');
            
            // Add blur to other items
            timelineItems.forEach(other => {
                if (other !== item) {
                    other.classList.add('blur');
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            // Remove active state
            item.classList.remove('active');
            
            // Remove blur from all items
            timelineItems.forEach(other => {
                other.classList.remove('blur');
            });
        });
    });
});

// Add a failsafe for section titles to ensure they're visible
document.addEventListener('DOMContentLoaded', function() {
    // Ensure section titles are visible regardless of animations
    setTimeout(() => {
        document.querySelectorAll('section h2').forEach(title => {
            if (!title.innerText.trim() && title.getAttribute('data-original-text')) {
                // If the title is empty but has original text stored, restore it
                title.innerText = title.getAttribute('data-original-text');
            }
            
            // Make sure all title characters are visible
            title.querySelectorAll('.title-char').forEach(char => {
                char.style.opacity = 1;
            });
        });
    }, 2000);
});
