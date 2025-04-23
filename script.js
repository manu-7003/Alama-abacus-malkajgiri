// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('back-to-top');
    
    // Testimonials
    const testimonialSlider = document.getElementById('testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevTestimonial = document.getElementById('prev-testimonial');
    const nextTestimonial = document.getElementById('next-testimonial');
    const dots = document.querySelectorAll('.dot');
    
    // Stats counters
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Form
    const contactForm = document.getElementById('inquiry-form');
    const formStatus = document.getElementById('form-status');
    
    // Current testimonial index
    let currentTestimonial = 0;
    let isAnimating = false;
    
    // Navigation Functions
    function toggleMenu() {
        navMenu.classList.toggle('active');
    }
    
    function closeMenu() {
        navMenu.classList.remove('active');
    }
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY;
        
        // Adjust navbar based on scroll position
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show or hide back to top button
        if (scrollPosition > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Highlight active navigation link
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Testimonial Functions
    function showTestimonial(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected slide and dot
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current index
        currentTestimonial = index;
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    function nextSlide() {
        let nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(prevIndex);
    }
    
    // Stats Animation
    function animateStats() {
        statNumbers.forEach(statNumber => {
            const target = parseInt(statNumber.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 30); // Update every 30ms
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    statNumber.textContent = target;
                    clearInterval(counter);
                } else {
                    statNumber.textContent = Math.floor(current);
                }
            }, 30);
        });
    }
    
    // Scroll animation for elements
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-content, .program-card, .benefit-item, .testimonial-slider, .contact-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const childAge = document.getElementById('child-age').value;
        const message = document.getElementById('message').value;
        
        // Validate inputs
        if (!name || !email || !phone || !childAge || !message) {
            formStatus.innerHTML = '<span style="color: red;">Please fill in all fields</span>';
            return;
        }
        
        // Simulate form submission
        formStatus.innerHTML = '<span style="color: var(--primary-color);">Sending your message...</span>';
        
        // Simulate API call
        setTimeout(() => {
            contactForm.reset();
            formStatus.innerHTML = '<span style="color: green;">Message sent successfully! We\'ll contact you soon.</span>';
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }, 1500);
    }
    
    // Initialize Floating Numbers Animation
    function initFloatingNumbers() {
        const floatingNumbers = document.querySelectorAll('.floating-numbers .num');
        
        floatingNumbers.forEach(num => {
            // Set random movement direction for each number
            const tx = (Math.random() * 200 - 100);
            const ty = (Math.random() * -100 - 50);
            num.style.setProperty('--tx', `${tx}px`);
            num.style.setProperty('--ty', `${ty}px`);
        });
    }
    
    // Auto Testimonial Slider
    let testimonialInterval;
    
    function startTestimonialInterval() {
        testimonialInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }
    
    // Event Listeners
    menuToggle.addEventListener('click', toggleMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('scroll', () => {
        // Check if stats section is in view
        const aboutSection = document.querySelector('.about');
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (aboutPosition < windowHeight - 100) {
            animateStats();
            // Remove event listener after animation starts
            window.removeEventListener('scroll', animateStats);
        }
        
        animateOnScroll();
    });
    
    // Testimonial navigation
    prevTestimonial.addEventListener('click', () => {
        prevSlide();
        resetTestimonialInterval();
    });
    
    nextTestimonial.addEventListener('click', () => {
        nextSlide();
        resetTestimonialInterval();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetTestimonialInterval();
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Back to top button
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Apply initial styling for scroll animations
    document.querySelectorAll('.about-content, .program-card, .benefit-item, .testimonial-slider, .contact-container').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
    });
    
    // Initialize
    highlightNavLink();
    initFloatingNumbers();
    startTestimonialInterval();
    animateOnScroll();
    
    // Set first testimonial as active
    showTestimonial(0);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        if (!targetId) return; // Handle empty hash
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });

    document.getElementById('inquiry-form').addEventListener('submit', function(e) {
        e.preventDefault();
    
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            age: document.getElementById('child-age').value,
            message: document.getElementById('message').value
        };
    
        fetch('https://script.google.com/macros/s/AKfycbyQaSkN_oI559Kydf94ju9xvKYwdB16d8P3K5Bwrjura2tPIEV04Ykfay_YA6Tv6gi_YA/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            alert("✅ Thank you! Your message has been recorded.");
            document.getElementById('inquiry-form').reset();
        })
        .catch(error => {
            alert("⚠️ Something went wrong. Please try again.");
            console.error('Error!', error.message);
        });
    });
    
});