// Portfolio Website with 3D PI Rotation Feature
class PortfolioManager {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        
        // Rotation tracking
        this.lastAzimuthalAngle = 0;
        this.totalRotation = 0;
        this.completedRotations = 0;
        this.projectsUnlocked = false;
        
        // DOM elements
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingMessage = document.getElementById('loading-message');
        this.modelViewer = document.getElementById('model-viewer');
        this.rotationCounter = document.getElementById('rotation-counter');
        this.rotationDisplay = document.getElementById('rotation-display');
        this.rotationCount = document.getElementById('rotation-count');
        this.piInstruction = document.getElementById('pi-instruction');
        this.projectsGrid = document.getElementById('projects-grid');
        this.unlockMessage = document.getElementById('unlock-message');
        
        this.init();
    }
    
    init() {
        // Hide loading screen after a short delay
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
        }, 1500);
        
        // Initialize 3D scene
        this.init3DScene();
        
        // Add event listeners
        this.addEventListeners();
        
        // Add smooth scrolling
        this.addSmoothScrolling();
    }
    
    init3DScene() {
        if (!this.modelViewer) return;
        
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xfbbf24); // Yellow/orange background
        
        // Camera
        const aspect = this.modelViewer.clientWidth / this.modelViewer.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.set(2, 2, 5);
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.modelViewer.clientWidth, this.modelViewer.clientHeight);
        this.renderer.setClearColor(0xfbbf24);
        this.modelViewer.appendChild(this.renderer.domElement);
        
        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;
        this.controls.maxPolarAngle = Math.PI / 2;
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1).normalize();
        this.scene.add(directionalLight);
        
        // Load model or create fallback
        this.loadModel();
        
        // Start animation loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }
    
    loadModel() {
        const loader = new THREE.GLTFLoader();
        
        // Try to load the PI model
        loader.load(
            'pi_model.gltf',
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(0.1, 0.1, 0.1);
                this.model.position.set(0, -1, 0);
                this.scene.add(this.model);
                this.loadingMessage.style.display = 'none';
                this.lastAzimuthalAngle = this.controls.getAzimuthalAngle();
            },
            (progress) => {
                const percent = Math.round((progress.loaded / progress.total) * 100);
                this.loadingMessage.textContent = `Loading PI model... ${percent}%`;
            },
            (error) => {
                console.log('GLTF model not found, creating fallback 3D PI');
                this.createFallbackPI();
                this.loadingMessage.style.display = 'none';
            }
        );
    }
    
    createFallbackPI() {
        // Create a simple 3D representation of a Raspberry PI
        const group = new THREE.Group();
        
        // Main board (green)
        const boardGeometry = new THREE.BoxGeometry(2, 0.1, 1.5);
        const boardMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
        const board = new THREE.Mesh(boardGeometry, boardMaterial);
        group.add(board);
        
        // CPU chip (black)
        const cpuGeometry = new THREE.BoxGeometry(0.5, 0.15, 0.5);
        const cpuMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        const cpu = new THREE.Mesh(cpuGeometry, cpuMaterial);
        cpu.position.set(0, 0.125, 0);
        group.add(cpu);
        
        // GPIO pins (gold)
        const pinGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.2);
        const pinMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 });
        
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 2; j++) {
                const pin = new THREE.Mesh(pinGeometry, pinMaterial);
                pin.position.set(-0.8 + (i * 0.08), 0.15, -0.2 + (j * 0.4));
                group.add(pin);
            }
        }
        
        // USB ports (silver)
        const usbGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.15);
        const usbMaterial = new THREE.MeshLambertMaterial({ color: 0xC0C0C0 });
        
        for (let i = 0; i < 2; i++) {
            const usb = new THREE.Mesh(usbGeometry, usbMaterial);
            usb.position.set(0.85, 0.1, -0.3 + (i * 0.6));
            group.add(usb);
        }
        
        // HDMI port (black)
        const hdmiGeometry = new THREE.BoxGeometry(0.25, 0.1, 0.4);
        const hdmiMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        const hdmi = new THREE.Mesh(hdmiGeometry, hdmiMaterial);
        hdmi.position.set(-0.85, 0.05, 0);
        group.add(hdmi);
        
        // Add PI logo text
        const loader = new THREE.FontLoader();
        // Since we can't load external fonts easily, we'll add a simple text representation
        const textGeometry = new THREE.RingGeometry(0.1, 0.15, 8);
        const textMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
        const logo = new THREE.Mesh(textGeometry, textMaterial);
        logo.position.set(-0.5, 0.06, -0.5);
        logo.rotation.x = -Math.PI / 2;
        group.add(logo);
        
        this.model = group;
        this.model.position.set(0, 0, 0);
        this.scene.add(this.model);
        this.lastAzimuthalAngle = this.controls.getAzimuthalAngle();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
            
            // Track rotation only if projects aren't unlocked yet
            if (!this.projectsUnlocked) {
                this.trackRotation();
            }
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
    trackRotation() {
        if (!this.controls) return;
        
        const currentAngle = this.controls.getAzimuthalAngle();
        let delta = currentAngle - this.lastAzimuthalAngle;
        
        // Handle angle wrapping
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;
        
        this.totalRotation += Math.abs(delta);
        this.lastAzimuthalAngle = currentAngle;
        
        // Calculate completed rotations
        const newCompletedRotations = Math.floor(this.totalRotation / (Math.PI * 2));
        
        if (newCompletedRotations > this.completedRotations) {
            this.completedRotations = newCompletedRotations;
            this.updateRotationDisplay();
            
            // Check if we've reached 3 rotations
            if (this.completedRotations >= 3 && !this.projectsUnlocked) {
                this.unlockProjects();
            }
        }
    }
    
    updateRotationDisplay() {
        if (this.rotationDisplay) {
            this.rotationDisplay.textContent = `${this.completedRotations}/3`;
        }
        if (this.rotationCount) {
            this.rotationCount.textContent = this.completedRotations;
        }
    }
    
    unlockProjects() {
        this.projectsUnlocked = true;
        
        // Hide instruction
        if (this.piInstruction) {
            this.piInstruction.style.transition = 'all 0.5s ease';
            this.piInstruction.style.opacity = '0';
            this.piInstruction.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                this.piInstruction.style.display = 'none';
            }, 500);
        }
        
        // Hide rotation counter
        if (this.rotationCounter) {
            this.rotationCounter.style.display = 'none';
        }
        
        // Show unlock message
        if (this.unlockMessage) {
            setTimeout(() => {
                this.unlockMessage.classList.remove('hidden');
                this.unlockMessage.classList.add('revealed');
            }, 600);
        }
        
        // Show projects with animation
        if (this.projectsGrid) {
            setTimeout(() => {
                this.projectsGrid.classList.remove('hidden');
                this.projectsGrid.classList.add('revealed');
                this.animateProjectCards();
            }, 1000);
        }
        
        // Add celebration effect
        this.addCelebrationEffect();
    }
    
    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px) scale(0.9)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 50);
            }, index * 200);
        });
    }
    
    addCelebrationEffect() {
        // Create confetti effect
        const colors = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '9999';
        
        document.body.appendChild(confettiContainer);
        
        // Create confetti pieces
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
        
        // Add CSS for confetti animation
        if (!document.getElementById('confetti-styles')) {
            const style = document.createElement('style');
            style.id = 'confetti-styles';
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        transform: translateY(-10px) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    onWindowResize() {
        if (!this.camera || !this.renderer || !this.modelViewer) return;
        
        const aspect = this.modelViewer.clientWidth / this.modelViewer.clientHeight;
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.modelViewer.clientWidth, this.modelViewer.clientHeight);
    }
    
    addEventListeners() {
        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
            });
        }
    }
    
    addSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openResume() {
    window.open('/SUJAL THAPA CV.pdf', '_blank');
}

// Initialize the portfolio when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});