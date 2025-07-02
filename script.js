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

// Project Modal Functionality
const projectData = {
    artifacts: {
        title: "ARtifacts Explorer",
        description: "A comprehensive AR museum project featuring both a dedicated museum website and an innovative AR mobile application. The platform brings historical artifacts to life through immersive augmented reality experiences, offering visitors interactive storytelling and seamless exploration of cultural heritage both online and through the AR app.",
        longDescription: "ARtifacts Explorer represents the cutting edge of museum technology, combining traditional web presence with groundbreaking augmented reality experiences. The project consists of two main components: a fully-featured museum website and a revolutionary AR mobile application. The website serves as the digital gateway to the museum, featuring detailed artifact catalogs, virtual tours, educational resources, and visitor information. The AR mobile app transforms the physical museum experience by overlaying digital information onto real artifacts, creating an interactive layer that tells stories, provides historical context, and engages visitors in ways never before possible.",
        technologies: ["Unity AR", "ARCore/ARKit", "Hostinger", "3D Modeling", "C#"],
        features: [
            "Real-time AR artifact recognition and overlay",
            "Interactive 3D models with detailed information",
            "Audio narration and visual storytelling",
            "Web promotion and mobile ar integration",
            "Content management system for museum staff",
            "Analytics dashboard for visitor engagement tracking"
        ],
        images: [
            {
                src: "Assets/Images/Unity/nakatayo head.jpg",
                alt: "AR Museum Interface",
                caption: "Main AR interface showing artifact recognition"
            },
            {
                src: "Assets/Images/Unity/sample1.jpg",
                alt: "3D Artifact Model",
                caption: "Interactive 3D artifact models"
            },
            {
                src: "Assets/Images/Unity/sample2.jpg",
                alt: "Museum Website",
                caption: "Responsive museum website design"
            },
            {
                src: "Assets/Images/Unity/sample3.jpg",
                alt: "AR Experience",
                caption: "Immersive AR storytelling experience"
            }
        ],
        link: "https://artifactsmalvar.com",
        status: "Completed"
    },
    artexpo: {
        title: "ArtExpo E-commerce Platform",
        description: "A sophisticated art e-commerce platform built with WordPress WooCommerce, featuring artist portfolios, secure payment processing, and inventory management for art galleries and collectors.",
        longDescription: "ArtExpo is a comprehensive e-commerce solution designed specifically for the art industry. Built on WordPress with WooCommerce integration, the platform provides galleries, artists, and collectors with a powerful tool for buying and selling artwork online. The system includes advanced features such as artist portfolio management, detailed artwork catalogs with high-resolution images, secure payment processing, and sophisticated inventory tracking. The platform also includes customer relationship management tools, sales analytics, and automated email marketing capabilities.",
        technologies: ["WordPress", "WooCommerce", "PHP", "MySQL", "PayPal API", "Stripe"],
        features: [
            "Artist portfolio management system",
            "High-resolution image galleries with zoom functionality",
            "Secure payment processing with multiple gateways",
            "Advanced search and filtering by style, medium, price",
            "Automated invoice generation and order tracking",
            "Customer wishlist and favorites functionality",
            "Admin dashboard with sales analytics",
            "Mobile-responsive design for all devices"
        ],
        images: [
            {
                src: "Assets/Images/ArtExpo/Sunset.png",
                alt: "ArtExpo Homepage",
                caption: "Modern and elegant homepage design"
            },
            {
                src: "Assets/Images/ArtExpo/artExpo1.png",
                alt: "Product Gallery",
                caption: "Interactive artwork gallery with filtering"
            },
            {
                src: "Assets/Images/ArtExpo/artExpo2.png",
                alt: "Artist Profile",
                caption: "Detailed artist portfolio pages"
            },
            {
                src: "Assets/Images/ArtExpo/artExpo3.png",
                alt: "Shopping Cart",
                caption: "Streamlined checkout process"
            }
        ],
        status: "Completed"
    },
    'arktech-web': {
        title: "Arktech Corporate Website",
        description: "A complete website renewal from WordPress to full-stack PHP solution with integrated backend CMS for managing potential employees, featuring application tracking and HR management capabilities.",
        longDescription: "The Arktech website project involved a complete technological transformation from a traditional WordPress site to a custom full-stack PHP solution. This rebuild was driven by the need for advanced HR management capabilities and better performance. The new system includes a sophisticated content management system specifically designed for HR operations, including application tracking, employee onboarding workflows, and comprehensive candidate management. The frontend provides an engaging corporate presence while the backend empowers HR teams with powerful tools for managing their recruitment pipeline.",
        technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Bootstrap", "AJAX"],
        features: [
            "Custom-built HR management system",
            "Application tracking and candidate pipeline",
            "Automated email notifications for applicants",
            "Document upload and management system",
            "Employee onboarding workflow automation",
            "Role-based access control for different departments",
            "Analytics dashboard for recruitment metrics",
            "Mobile-responsive design for all devices"
        ],
        images: [
            {
                src: "Assets/Images/Arktech/arktech.png",
                alt: "Arktech Homepage",
                caption: "Modern corporate website design"
            },
            {
                src: "Assets/Images/Arktech/company.png",
                alt: "Company Profile",
                caption: "Company information and values section"
            },
            {
                src: "Assets/Images/Arktech/home.png",
                alt: "Services Overview",
                caption: "Services and capabilities showcase"
            }
        ],
        status: "Completed"
    },
    'sakto-space': {
        title: "SaktoSpace AR",
        description: "An innovative augmented reality mobile application built with Flutter, featuring AR visualization and interactive spatial experiences using ar_flutter_plugin_2 for seamless AR integration.",
        longDescription: "SaktoSpace AR represents the next generation of spatial computing applications, built entirely with Flutter for cross-platform compatibility. The application leverages advanced AR technologies to create immersive spatial experiences that blend digital content with the physical world. Using the ar_flutter_plugin_2, the app provides users with tools for spatial visualization, virtual object placement, and interactive 3D experiences. The project showcases the potential of Flutter as a platform for AR development and demonstrates advanced implementation of augmented reality features in mobile applications.",
        technologies: ["Flutter", "Dart", "AR Flutter Plugin", "ARCore", "ARKit", "Firebase"],
        features: [
            "Cross-platform AR experiences (iOS and Android)",
            "Real-time spatial tracking and mapping",
            "Virtual object placement with persistence",
            "Interactive 3D content and animations",
            "Cloud-based content synchronization",
            "Multi-user AR collaboration features",
            "Advanced lighting and shadow rendering",
            "Performance optimization for mobile devices"
        ],
        images: [
            {
                src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                alt: "AR Interface",
                caption: "Main AR interface with spatial tracking"
            }
        ],
        status: "In Progress"
    }
};

// Modal functions
window.openProjectModal = function(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = project.title;        modalContent.innerHTML = `
            <div class="space-y-6">
                <div class="project-gallery">
                    ${project.images.map((image, index) => `
                        <div class="gallery-image modal-image-container">
                            <img src="${image.src}" alt="${image.alt}" class="modal-image" loading="lazy" onclick="openImageModal('${image.src}', '${image.alt}', '${image.caption}')">
                            <div class="image-zoom-overlay">
                                <i class="fas fa-expand"></i> Click to enlarge
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        <div class="space-y-6">
            <div>
                <div class="flex items-center gap-3 mb-4">
                    <h3 class="text-xl font-bold">Project Overview</h3>
                    <span class="px-3 py-1 text-xs font-medium rounded-full ${
                        project.status === 'Live' ? 'bg-green-100 text-green-800' :
                        project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                    }">${project.status}</span>
                </div>
                <p class="text-gray-600 leading-relaxed">${project.longDescription}</p>
            </div>
            
            <div>
                <h4 class="text-lg font-bold mb-3">Technologies Used</h4>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `
                        <span class="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">${tech}</span>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <h4 class="text-lg font-bold mb-3">Key Features</h4>
                <ul class="space-y-2">
                    ${project.features.map(feature => `
                        <li class="flex items-start gap-3">
                            <i class="fas fa-check-circle text-primary mt-1 flex-shrink-0"></i>
                            <span class="text-gray-600">${feature}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            ${project.link ? `
                <div class="pt-4 border-t border-gray-200">
                    <a href="${project.link}" target="_blank" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                        <i class="fas fa-external-link-alt"></i>
                        Visit Live Project
                    </a>
                </div>
            ` : ''}
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};    window.closeProjectModal = function() {
        const modal = document.getElementById('projectModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    };

    // Image Modal Functions
    window.openImageModal = function(src, alt, caption) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalImageCaption');

        modalImage.src = src;
        modalImage.alt = alt;
        modalCaption.textContent = caption || alt;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    window.closeImageModal = function() {
        const modal = document.getElementById('imageModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    };    // Close modal when clicking outside
    document.getElementById('projectModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeProjectModal();
        }
    });

    // Close image modal when clicking outside
    document.getElementById('imageModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeImageModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!document.getElementById('imageModal').classList.contains('hidden')) {
                closeImageModal();
            } else if (!document.getElementById('projectModal').classList.contains('hidden')) {
                closeProjectModal();
            }
        }
    });
