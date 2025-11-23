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
// PERFORMANCE DETECTION
// ============================================
const isLowEndDevice = () => {
    // Check for low RAM or slow CPU
    const memory = navigator.deviceMemory; // GB
    const cores = navigator.hardwareConcurrency;
    return (memory && memory <= 8) || (cores && cores <= 4);
};

const PERFORMANCE_MODE = isLowEndDevice();

// ============================================
// CURSOR GLOW EFFECT (Disabled on low-end devices)
// ============================================
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && !PERFORMANCE_MODE) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorGlow, {
            x: e.clientX,
            y: e.clientY,
            opacity: 0.6,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
} else if (cursorGlow) {
    // Hide cursor glow on low-end devices
    cursorGlow.style.display = 'none';
}

// ============================================
// PROGRESS-BAR-TRIGGERED TIMELINE ANIMATIONS
// ============================================
const timelineItems = document.querySelectorAll('.timeline-item');
const stepColors = ['#005EB8', '#10B981', '#8B5CF6', '#F59E0B']; // 4 colors for 4 steps
const timelineProgress = document.querySelector('.timeline-progress');
const timelineContainer = document.querySelector('.timeline-container');

// Track which steps have been activated
const activatedSteps = new Set();

// Calculate which step should be active based on progress bar height
function getActiveStepFromProgress(progressPercent) {
    if (progressPercent < 15) return null;
    if (progressPercent < 35) return 1;
    if (progressPercent < 60) return 2;
    if (progressPercent < 85) return 3;
    return 4;
}

// Activate a timeline step with animations
function activateStep(stepNumber) {
    if (activatedSteps.has(stepNumber)) return; // Already activated

    activatedSteps.add(stepNumber);
    const stepIndex = stepNumber - 1;
    const stepColor = stepColors[stepIndex];
    const stepElement = document.querySelector(`.timeline-item[data-step="${stepNumber}"]`);

    if (!stepElement) return;

    stepElement.classList.add('active');

    const marker = stepElement.querySelector('.timeline-marker');
    const card = stepElement.querySelector('.card');

    // Simplified animations for low-end devices
    const animationDuration = PERFORMANCE_MODE ? 0.5 : 1;
    const maxScale = PERFORMANCE_MODE ? 1.15 : 1.3;

    // Circle fills when progress bar reaches it (like being "powered" by the bar)
    gsap.timeline()
        .to(marker, {
            backgroundColor: stepColor,
            borderColor: stepColor,
            color: '#fff',
            scale: maxScale,
            boxShadow: PERFORMANCE_MODE
                ? `0 0 0 4px var(--bg-body), 0 0 20px ${stepColor}`
                : `0 0 0 8px var(--bg-body), 0 0 40px ${stepColor}, 0 0 80px ${stepColor}40`,
            duration: animationDuration,
            ease: 'power2.out'
        })
        .to(marker, {
            scale: 1.1,
            duration: animationDuration * 0.3,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.2');

    // Card glow animation
    gsap.to(card, {
        borderColor: stepColor,
        boxShadow: PERFORMANCE_MODE
            ? `0 10px 30px ${stepColor}40`
            : `0 10px 50px ${stepColor}50, 0 0 0 2px ${stepColor}30 inset, 0 0 40px ${stepColor}20`,
        duration: animationDuration,
        ease: 'power2.out'
    });

    // Particle burst effect - reduced particles on low-end devices
    if (!PERFORMANCE_MODE) {
        setTimeout(() => {
            createParticleBurst(marker, stepColor);
        }, animationDuration * 600);
    }
}

// Update progress bar and trigger step activations
function updateTimelineProgress() {
    if (!timelineContainer || !timelineProgress) return;

    const containerRect = timelineContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const screenCenter = windowHeight / 2;

    // Start progress when container top reaches screen center
    if (containerRect.top > screenCenter) {
        timelineProgress.style.height = '0%';
        return;
    }

    if (containerRect.bottom < screenCenter) {
        timelineProgress.style.height = '100%';
        // Activate all steps if scrolled past
        [1, 2, 3, 4].forEach(step => activateStep(step));
        return;
    }

    // Calculate progress based on screen center position within container
    const scrolled = Math.max(0, screenCenter - containerRect.top);
    const totalScrollable = containerRect.height;
    const scrollProgress = Math.min(100, (scrolled / totalScrollable) * 100);

    timelineProgress.style.height = scrollProgress + '%';

    // Activate steps when progress bar reaches their position
    // Each step is at approximately 25%, 50%, 75%, 100% of the timeline
    const stepPositions = [20, 45, 70, 95]; // Adjusted for better timing

    stepPositions.forEach((position, index) => {
        if (scrollProgress >= position) {
            activateStep(index + 1);
        }
    });
}

// Scroll listener for progress bar and step activation
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateTimelineProgress();
            ticking = false;
        });
        ticking = true;
    }
});
window.addEventListener('resize', updateTimelineProgress);

// Initial check
updateTimelineProgress();

// Particle burst effect - Reduced particles for performance
function createParticleBurst(element, color) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Reduce particles on low-end devices
    const particleCount = PERFORMANCE_MODE ? 8 : 16;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 15px ${color}`;
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        document.body.appendChild(particle);

        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 100;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        gsap.to(particle, {
            x: targetX,
            y: targetY,
            opacity: 0,
            scale: 0,
            duration: 1.2,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
}

// ============================================
// PARALLAX BACKGROUND (Disabled on low-end devices)
// ============================================
if (!PERFORMANCE_MODE) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const mesh = document.querySelector('.mesh-background');
        if (mesh) {
            mesh.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// ============================================
// DYNAMIC GLASS HEADER
// ============================================
// Burger Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        const isActive = mobileNavOverlay.classList.contains('active');

        if (!isActive) {
            // Open Menu
            mobileNavOverlay.classList.add('active');
            burgerMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            // Close Menu
            mobileNavOverlay.classList.remove('active');
            burgerMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (burgerMenu && mobileNavOverlay) {
        burgerMenu.addEventListener('click', toggleMenu);

        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', toggleMenu);
        }

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                burgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Re-initialize icons for the new close button
    if (window.lucide) {
        lucide.createIcons();
    }
});

// Initialize Lucide icons
lucide.createIcons();

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// THREE.JS 3D ORBITAL SYSTEM
// ============================================

const threeContainer = document.getElementById('threejs-container');
const heroVisual = document.querySelector('.hero-visual');

// Check if mobile device
const isMobile = window.innerWidth <= 768;

if (threeContainer && heroVisual && typeof THREE !== 'undefined' && !PERFORMANCE_MODE) {
    // Scene setup
    const scene = new THREE.Scene();
    
    // Renderer setup - optimisé pour mobile
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    // Réduire pixelRatio sur mobile pour meilleures performances
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    const initialWidth = heroVisual.offsetWidth;
    const initialHeight = heroVisual.offsetHeight;
    renderer.setSize(initialWidth, initialHeight);
    threeContainer.appendChild(renderer.domElement);
    
    // Camera setup - ajustée pour voir le personnage agrandi (élément principal)
    // Utiliser le bon aspect ratio dès le début pour éviter la déformation
    const initialAspect = initialWidth / initialHeight;
    const camera = new THREE.PerspectiveCamera(60, initialAspect, 0.1, 2000);
    // Position caméra ajustée pour mobile et desktop
    camera.position.z = isMobile ? 700 : 1000;
    camera.position.y = isMobile ? -50 : -100;
    
    // Lights - optimisées pour mobile
    const ambientLight = new THREE.AmbientLight(0xffffff, isMobile ? 0.8 : 0.6);
    scene.add(ambientLight);
    
    // DirectionalLight seulement sur desktop pour économiser les performances
    if (!isMobile) {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(100, 100, 100);
        scene.add(directionalLight);
    }
    
    // Character texture loader
    const textureLoader = new THREE.TextureLoader();
    let characterMesh = null;
    
    // Create a group for dashboards (so we can rotate them independently)
    const dashboardsGroup = new THREE.Group();
    scene.add(dashboardsGroup);
    
    textureLoader.load('Copie de Sans titre (1).png', (texture) => {
        // Préserver les couleurs originales du PNG
        texture.colorSpace = THREE.SRGBColorSpace;
        
        // S'assurer que la texture n'est pas déformée
        texture.flipY = false; // Important pour éviter les inversions
        
        // Obtenir les dimensions originales de l'image
        const imageWidth = texture.image.width;
        const imageHeight = texture.image.height;
        
        // Calculer les proportions pour préserver le ratio d'aspect
        // Taille de base pour agrandir (hauteur de référence) - réduite sur mobile
        const baseHeight = isMobile ? 800 : 1200;
        const aspectRatio = imageWidth / imageHeight;
        const width = baseHeight * aspectRatio;
        const height = baseHeight;
        
        // Créer la géométrie avec les proportions originales exactes
        const geometry = new THREE.PlaneGeometry(width, height);
        
        const material = new THREE.MeshBasicMaterial({ 
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            // Pas de modification de couleur - couleurs originales
            color: 0xffffff
        });
        characterMesh = new THREE.Mesh(geometry, material);
        // Retourner le personnage (rotation de 180 degrés sur l'axe X)
        characterMesh.rotation.x = Math.PI;
        // Positionner le personnage plus bas, au niveau du haut du bouton "Lancer mon Audit d'Éligibilité"
        // Position ajustée pour mobile et desktop
        characterMesh.position.y = isMobile ? -200 : -350;
        scene.add(characterMesh);
    });
    
    // Dashboard configuration avec vraies images de dashboards
    // Configuration différente pour mobile (tailles et rayons réduits)
    const dashboardConfigBase = isMobile ? [
        { 
            texture: 'carré-dash.png', 
            size: 100, 
            radius: 180, 
            speed: 0.5, 
            initialAngle: 0 
        },
        { 
            texture: 'ovale-dash.png', 
            size: 110, 
            radius: 220, 
            speed: 0.7, 
            initialAngle: 120 
        },
        { 
            texture: 'triangle-dash.png', 
            size: 105, 
            radius: 260, 
            speed: 1.0, 
            initialAngle: 240 
        }
    ] : [
        { 
            texture: 'carré-dash.png', 
            size: 150, 
            radius: 280, 
            speed: 0.5, 
            initialAngle: 0 
        },
        { 
            texture: 'ovale-dash.png', 
            size: 170, 
            radius: 320, 
            speed: 0.7, 
            initialAngle: 72 
        },
        { 
            texture: 'triangle-dash.png', 
            size: 160, 
            radius: 360, 
            speed: 1.0, 
            initialAngle: 144 
        },
        { 
            texture: 'octogone-dash.png', 
            size: 150, 
            radius: 400, 
            speed: 1.2, 
            initialAngle: 216 
        },
        { 
            texture: 'dash.png', 
            size: 170, 
            radius: 440, 
            speed: 1.5, 
            initialAngle: 288 
        }
    ];
    const dashboardConfig = dashboardConfigBase;
    
    // Create dashboards with real textures
    const dashboards = [];
    let loadedDashboards = 0;
    
    dashboardConfig.forEach((config, index) => {
        textureLoader.load(config.texture, (texture) => {
            const geometry = new THREE.PlaneGeometry(config.size, config.size);
            const material = new THREE.MeshBasicMaterial({ 
                map: texture,
                transparent: true,
                opacity: 0.95,
                side: THREE.DoubleSide
            });
            const dashboard = new THREE.Mesh(geometry, material);
            dashboard.userData = { ...config, angle: config.initialAngle };
            dashboardsGroup.add(dashboard);
            dashboards.push(dashboard);
            
            loadedDashboards++;
        }, undefined, (error) => {
            console.error('Error loading dashboard texture:', config.texture, error);
        });
    });
    
    // Create orbit rings - segments réduits sur mobile
    const rings = [];
    const ringSegments = isMobile ? 32 : 64;
    dashboardConfig.forEach((config) => {
        const ringGeometry = new THREE.RingGeometry(config.radius - 2, config.radius + 2, ringSegments);
        const ringMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.05,
            side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: false
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        dashboardsGroup.add(ring);
        rings.push(ring);
    });
    
    // Mouse tracking for parallax (disabled on mobile)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    
    if (!isMobile) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Convert to -1 to 1 range
            mouseX = (x - 0.5) * 2;
            mouseY = (y - 0.5) * 2;
            
            // Calculate target rotation (max ±8 degrees - plus subtil)
            targetRotationX = mouseY * 8 * (Math.PI / 180);
            targetRotationY = mouseX * 8 * (Math.PI / 180);
        });
    }
    
    // Scroll tracking
    let scrollProgress = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollVelocity = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
        
        const heroRect = heroVisual.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const heroTop = heroRect.top;
        const heroHeight = heroRect.height;
        
        if (heroTop < viewportHeight && heroTop + heroHeight > 0) {
            scrollProgress = Math.max(0, Math.min(1, (viewportHeight - heroTop) / (viewportHeight + heroHeight)));
        } else {
            scrollProgress = 0;
        }
    });
    
    // Animation loop
    let animationId;
    let currentTime = 0;
    
    function animate() {
        animationId = requestAnimationFrame(animate);
        
        currentTime += 0.016;
        
        // Smooth rotation for dashboards group (lerp) - only on desktop
        // This rotates only the dashboards, not the character
        if (!isMobile) {
            currentRotationX += (targetRotationX - currentRotationX) * 0.05;
            currentRotationY += (targetRotationY - currentRotationY) * 0.05;
            
            // Apply rotation to dashboards group (not camera, so character stays fixed)
            dashboardsGroup.rotation.x = currentRotationX;
            dashboardsGroup.rotation.y = currentRotationY;
        }
        
        // Subtle floating animation for character
        if (characterMesh) {
            characterMesh.position.y = Math.sin(currentTime * 0.5) * 10; // Flottement subtil
        }
        
        // Scroll multiplier for orbital speed
        const scrollMultiplier = 1 + (scrollProgress * 1.5) + (scrollVelocity * 0.01);
        
        // Update dashboard positions
        dashboards.forEach((dashboard) => {
            const config = dashboard.userData;
            config.angle += config.speed * scrollMultiplier * 0.01;
            
            const x = Math.cos(config.angle) * config.radius;
            const z = Math.sin(config.angle) * config.radius;
            
            dashboard.position.x = x;
            dashboard.position.z = z;
            dashboard.position.y = 0;
            
            // Keep dashboards facing forward (no lookAt to avoid movement issues)
            dashboard.rotation.x = 0;
            dashboard.rotation.y = 0;
            
            // Rotate dashboards on themselves
            dashboard.rotation.z += 0.005;
        });
        
        renderer.render(scene, camera);
    }
    
    // Handle resize
    function handleResize() {
        const width = heroVisual.offsetWidth;
        const height = heroVisual.offsetHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
            } else {
                cancelAnimationFrame(animationId);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(heroVisual);
    
    // Start animation
    animate();
}

// ============================================
// LOGO CAROUSEL PAUSE ON HOVER
// ============================================

const heroMarquee = document.querySelector('.hero-marquee');
const heroMarqueeWrapper = document.querySelector('.hero-marquee-wrapper');

if (heroMarquee && heroMarqueeWrapper) {
    // Pause animation on hover
    heroMarqueeWrapper.addEventListener('mouseenter', () => {
        heroMarquee.classList.add('paused');
    });
    
    // Resume animation when mouse leaves
    heroMarqueeWrapper.addEventListener('mouseleave', () => {
        heroMarquee.classList.remove('paused');
    });
}
