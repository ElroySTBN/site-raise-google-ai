// GSAP Animations for RaiseMed.IA
gsap.registerPlugin(ScrollTrigger);

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

// ============================================
// SCROLL TRIGGER ANIMATIONS
// ============================================

// Animate section titles
gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animate cards with stagger
gsap.utils.toArray('.card').forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power2.out',
        delay: index * 0.1,
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animate timeline items
gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
        delay: index * 0.15,
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animate stat data cards
gsap.utils.toArray('.stat-data-card').forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: index * 0.2,
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// ============================================
// FLOATING CARDS ANIMATIONS (Hero)
// ============================================

const floatingCard1 = document.querySelector('.floating-card-1');
const floatingCard2 = document.querySelector('.floating-card-2');

if (floatingCard1 && floatingCard2) {
    // Base floating animation
    gsap.to(floatingCard1, {
        y: -15,
        x: 8,
        rotation: 2,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });

    gsap.to(floatingCard2, {
        y: -12,
        x: -6,
        rotation: -2,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });

    // Parallax effect on mouse move
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

            gsap.to(floatingCard1, {
                x: x * 0.5,
                y: y * 0.5,
                duration: 0.5,
                ease: 'power2.out'
            });

            gsap.to(floatingCard2, {
                x: x * -0.3,
                y: y * -0.3,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        heroVisual.addEventListener('mouseleave', () => {
            gsap.to([floatingCard1, floatingCard2], {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }
}

// ============================================
// MAGNETIC BUTTON EFFECT (Header CTA)
// ============================================

const headerCTA = document.querySelector('.header .btn-primary');
if (headerCTA) {
    headerCTA.addEventListener('mousemove', (e) => {
        const rect = headerCTA.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(headerCTA, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    headerCTA.addEventListener('mouseleave', () => {
        gsap.to(headerCTA, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
}

// ============================================
// COUNT-UP ANIMATION FOR STATS
// ============================================

function animateCountUp(element, targetValue, duration = 2) {
    const startValue = 0;
    const increment = targetValue / (duration * 60); // 60fps
    let currentValue = startValue;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            element.textContent = Math.round(targetValue);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(currentValue);
        }
    }, 1000 / 60);
}

// Setup count-up triggers
const statNumbers = document.querySelectorAll('.stat-card-number');
statNumbers.forEach((statNumber) => {
    const targetValue = parseInt(statNumber.getAttribute('data-count'));
    
    ScrollTrigger.create({
        trigger: statNumber,
        start: 'top 80%',
        onEnter: () => {
            if (!statNumber.classList.contains('counted')) {
                statNumber.classList.add('counted');
                animateCountUp(statNumber, targetValue);
            }
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// VSL VIDEO PLACEHOLDER CLICK
// ============================================

const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        // Add your video URL or modal trigger here
        console.log('Video placeholder clicked');
        // Example: window.open('YOUR_VIDEO_URL', '_blank');
    });
}

