/* ============================================
   CHENNAI SUPER KINGS - LEGACY WEBSITE
   Premium JavaScript Implementation
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // AOS INITIALIZATION
    // ============================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
        });
    }

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');

    if (cursor && cursorFollower && window.innerWidth > 991) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursor.style.left = cursorX - 6 + 'px';
            cursor.style.top = cursorY - 6 + 'px';
            cursorFollower.style.left = followerX - 20 + 'px';
            cursorFollower.style.top = followerY - 20 + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .tilt-card, .flip-card, .trophy-3d');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursorFollower.style.transform = 'scale(1.5)';
                cursorFollower.style.borderColor = 'var(--csk-yellow)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.borderColor = 'var(--csk-gold)';
            });
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('mainNav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // HERO PARTICLES
    // ============================================
    const heroParticles = document.getElementById('heroParticles');
    if (heroParticles) {
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.5 + 0.2;

            // Random gold shades
            const shades = ['#F9D71C', '#D4AF37', '#FFD700', '#B8860B'];
            particle.style.background = shades[Math.floor(Math.random() * shades.length)];

            heroParticles.appendChild(particle);
        }
    }

    // ============================================
    // THREE.JS HERO SCENE
    // ============================================
    initThreeJS();

    function initThreeJS() {
        const container = document.getElementById('hero-canvas-container');
        if (!container || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Create floating geometric shapes
        const geometries = [];
        const shapes = [];

        // Trophy-like shape (cylinder with sphere on top)
        const trophyGroup = new THREE.Group();

        // Trophy body
        const bodyGeometry = new THREE.CylinderGeometry(0.8, 1.2, 2.5, 32);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0xD4AF37,
            shininess: 100,
            specular: 0xFFD700,
            transparent: true,
            opacity: 0.9
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0;
        trophyGroup.add(body);

        // Trophy top
        const topGeometry = new THREE.SphereGeometry(0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const topMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFD700,
            shininess: 120,
            specular: 0xFFFFFF,
            transparent: true,
            opacity: 0.95
        });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.y = 1.25;
        trophyGroup.add(top);

        // Trophy base
        const baseGeometry = new THREE.CylinderGeometry(1.4, 1.6, 0.4, 32);
        const baseMaterial = new THREE.MeshPhongMaterial({
            color: 0xB8860B,
            shininess: 80,
            specular: 0xD4AF37
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -1.45;
        trophyGroup.add(base);

        // Handles
        const handleGeometry = new THREE.TorusGeometry(0.6, 0.1, 16, 32, Math.PI);
        const handleMaterial = new THREE.MeshPhongMaterial({
            color: 0xD4AF37,
            shininess: 100
        });

        const handle1 = new THREE.Mesh(handleGeometry, handleMaterial);
        handle1.position.set(1.1, 0.3, 0);
        handle1.rotation.z = -Math.PI / 2;
        trophyGroup.add(handle1);

        const handle2 = new THREE.Mesh(handleGeometry, handleMaterial);
        handle2.position.set(-1.1, 0.3, 0);
        handle2.rotation.z = Math.PI / 2;
        trophyGroup.add(handle2);

        trophyGroup.position.set(3, 0, -5);
        trophyGroup.scale.set(1.2, 1.2, 1.2);
        scene.add(trophyGroup);

        // Floating rings
        for (let i = 0; i < 5; i++) {
            const ringGeometry = new THREE.TorusGeometry(2 + i * 0.8, 0.05, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.12, 1, 0.5 + i * 0.05),
                transparent: true,
                opacity: 0.3 - i * 0.04
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.set(3, 0, -5);
            ring.rotation.x = Math.PI / 2;
            ring.userData = {
                rotationSpeed: 0.005 + i * 0.002,
                initialRotation: i * Math.PI / 5
            };
            scene.add(ring);
            shapes.push(ring);
        }

        // Floating particles/spheres
        for (let i = 0; i < 30; i++) {
            const sphereGeometry = new THREE.SphereGeometry(Math.random() * 0.1 + 0.05, 16, 16);
            const sphereMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.12 + Math.random() * 0.05, 1, 0.5 + Math.random() * 0.3),
                transparent: true,
                opacity: Math.random() * 0.6 + 0.2
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 4 + Math.random() * 6;

            sphere.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta) * 0.5,
                radius * Math.cos(phi) - 5
            );

            sphere.userData = {
                speed: Math.random() * 0.01 + 0.005,
                radius: radius,
                theta: theta,
                phi: phi,
                yOffset: Math.random() * Math.PI * 2
            };

            scene.add(sphere);
            shapes.push(sphere);
        }

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xFFD700, 1, 20);
        pointLight1.position.set(5, 5, 0);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xFF6B00, 0.5, 20);
        pointLight2.position.set(-5, -3, 2);
        scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0xF9D71C, 0.8, 15);
        pointLight3.position.set(0, 5, -3);
        scene.add(pointLight3);

        camera.position.z = 8;

        // Mouse interaction
        let mouseXThree = 0, mouseYThree = 0;
        document.addEventListener('mousemove', (e) => {
            mouseXThree = (e.clientX / window.innerWidth) * 2 - 1;
            mouseYThree = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation loop
        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;

            // Rotate trophy
            trophyGroup.rotation.y += 0.005;
            trophyGroup.position.y = Math.sin(time) * 0.3;

            // Camera parallax
            camera.position.x += (mouseXThree * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseYThree * 0.3 - camera.position.y) * 0.05;
            camera.lookAt(3, 0, -5);

            // Animate shapes
            shapes.forEach((shape, index) => {
                if (shape.geometry.type === 'TorusGeometry') {
                    shape.rotation.z += shape.userData.rotationSpeed;
                    shape.scale.setScalar(1 + Math.sin(time + index) * 0.05);
                } else if (shape.geometry.type === 'SphereGeometry') {
                    const data = shape.userData;
                    data.theta += data.speed;
                    shape.position.x = data.radius * Math.sin(data.phi) * Math.cos(data.theta);
                    shape.position.z = data.radius * Math.cos(data.phi) - 5;
                    shape.position.y = Math.sin(time + data.yOffset) * 0.5;
                }
            });

            // Pulse lights
            pointLight1.intensity = 1 + Math.sin(time * 2) * 0.3;
            pointLight3.intensity = 0.8 + Math.sin(time * 1.5) * 0.2;

            renderer.render(scene, camera);
        }
        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    // TILT CARD EFFECT
    // ============================================
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ============================================
    // TROPHY 3D FLIP
    // ============================================
    const trophy3Ds = document.querySelectorAll('.trophy-3d');

    trophy3Ds.forEach(trophy => {
        trophy.addEventListener('click', () => {
            trophy.classList.toggle('flipped');
        });

        // Tilt effect for trophy cards
        trophy.addEventListener('mousemove', (e) => {
            const rect = trophy.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            if (!trophy.classList.contains('flipped')) {
                trophy.style.transform = `rotateY(${rotateY}deg) rotateX(${-rotateX}deg)`;
            }
        });

        trophy.addEventListener('mouseleave', () => {
            if (!trophy.classList.contains('flipped')) {
                trophy.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }
        });
    });

    // ============================================
    // GALLERY CAROUSEL
    // ============================================
    const galleryCarousel = document.getElementById('galleryCarousel');
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryDots = document.getElementById('galleryDots');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    let currentSlide = 0;
    let galleryInterval;

    // Create dots
    gallerySlides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        galleryDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.gallery-dot');

    function goToSlide(index) {
        gallerySlides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;
        if (currentSlide >= gallerySlides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = gallerySlides.length - 1;

        gallerySlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    function startInterval() {
        galleryInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(galleryInterval);
        startInterval();
    }

    startInterval();

    // Touch support for gallery
    let touchStartX = 0;
    let touchEndX = 0;

    if (galleryCarousel) {
        galleryCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        galleryCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetInterval();
        }
    }

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // GSAP ANIMATIONS
    // ============================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero title animation
        gsap.from('.hero-title .title-line', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power4.out',
            delay: 0.5
        });

        // Hero stats animation
        gsap.from('.stat-item', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 1
        });

        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // Timeline cards
        gsap.utils.toArray('.timeline-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 80,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Trophy cards
        gsap.utils.toArray('.trophy-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'back.out(1.7)'
            });
        });

        // Hall of Fame cards
        gsap.utils.toArray('.hof-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                y: 60,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.08,
                ease: 'power3.out'
            });
        });

        // Big stats
        gsap.utils.toArray('.big-stat-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.7,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Parallax for hero
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 100,
            opacity: 0.3
        });
    }

    // ============================================
    // TROPHY PARTICLES
    // ============================================
    const trophyParticles = document.getElementById('trophyParticles');
    if (trophyParticles) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${['#F9D71C', '#D4AF37', '#FFD700'][Math.floor(Math.random() * 3)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.4 + 0.1};
                animation: floatTrophyParticle ${Math.random() * 8 + 6}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            trophyParticles.appendChild(particle);
        }
    }

    // Add keyframe for trophy particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatTrophyParticle {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
            25% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
            50% { transform: translateY(-10px) translateX(-10px); opacity: 0.3; }
            75% { transform: translateY(-30px) translateX(5px); opacity: 0.4; }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // COMPARISON BAR ANIMATION
    // ============================================
    const comparisonBars = document.querySelectorAll('.comp-bar');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    comparisonBars.forEach(bar => barObserver.observe(bar));

    // ============================================
    // NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input.value) {
                // Show success message
                const btn = newsletterForm.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Subscribed!';
                btn.style.background = '#28a745';
                input.value = '';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 3000);
            }
        });
    }

    // ============================================
    // ACTIVE NAV LINK
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // SCROLL REVEAL FOR GALLERY GRID
    // ============================================
    const galleryGridItems = document.querySelectorAll('.gallery-grid-item');

    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                gridObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    galleryGridItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        gridObserver.observe(item);
    });

    // ============================================
    // MAGNETIC BUTTON EFFECT
    // ============================================
    const magneticBtns = document.querySelectorAll('.btn-csk-primary, .btn-csk-outline, .btn-csk-glow');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================
    // TEXT SCRAMBLE EFFECT FOR HERO TITLE
    // ============================================
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];

            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }

            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;

            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];

                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span style="color: var(--csk-gold)">${char}</span>`;
                } else {
                    output += from;
                }
            }

            this.el.innerHTML = output;

            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }

        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Apply scramble effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const phrases = [
            'The Pride of Chennai · Whistle Podu · Since 2008',
            '5-Time IPL Champions · Yellow Army · CSK',
            'Thala Dhoni · Legendary · Forever'
        ];

        const fx = new TextScramble(heroSubtitle);
        let counter = 0;

        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 4000);
            });
            counter = (counter + 1) % phrases.length;
        };

        setTimeout(next, 3000);
    }

    // ============================================
    // FOOTER PARTICLES
    // ============================================
    const footerParticles = document.getElementById('footerParticles');
    if (footerParticles) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${['#F9D71C', '#D4AF37'][Math.floor(Math.random() * 2)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.3 + 0.1};
                animation: floatFooterParticle ${Math.random() * 10 + 8}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            footerParticles.appendChild(particle);
        }
    }

    // Add footer particle keyframe
    const footerStyle = document.createElement('style');
    footerStyle.textContent = `
        @keyframes floatFooterParticle {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
            50% { transform: translateY(-30px) rotate(180deg); opacity: 0.3; }
        }
    `;
    document.head.appendChild(footerStyle);

    // ============================================
    // PERFORMANCE: Pause animations when tab is hidden
    // ============================================
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause expensive animations
            document.body.classList.add('paused');
        } else {
            document.body.classList.remove('paused');
        }
    });

    // ============================================
    // PRELOADER (Simple fade in)
    // ============================================
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('%c🏏 Chennai Super Kings Legacy Website Loaded', 'color: #F9D71C; font-size: 16px; font-weight: bold;');
    console.log('%c💛 Whistle Podu! 💛', 'color: #D4AF37; font-size: 12px;');
});
