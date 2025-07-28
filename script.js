// Faculty Prime Website JavaScript - Enhanced Version

// Group links configuration
const groupLinks = {
    'first-year': 'https://chat.whatsapp.com/ERc26eBW4K7Hb29hvKRWP7?mode=r_c',
    'second-year': 'https://chat.whatsapp.com/ExGQS79YHzLAEGsLZ1VphR?mode=r_c',
    'accounting': 'https://example.com/accounting',
    'business': 'https://example.com/business',
    'economics': 'https://example.com/economics',
    'statistics': 'https://example.com/statistics'
};

// Enhanced particle system
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.6';
        
        this.resize();
        this.createParticles();
        this.animate();
        
        document.body.appendChild(this.canvas);
        
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(100, window.innerWidth / 10);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                color: this.getRandomColor(),
                opacity: Math.random() * 0.8 + 0.2,
                life: Math.random() * 100 + 50
            });
        }
    }

    getRandomColor() {
        const colors = ['#a29bfe', '#74b9ff', '#fd79a8', '#00b894', '#00cec9'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.01;
                particle.vy += dy * force * 0.01;
            }
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            // Connect nearby particles
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (80 - distance) / 80 * 0.3;
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced card hover effects
function initCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(162, 155, 254, 0.3) 0%, transparent 70%);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 0;
            `;
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        // Tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);
            
            const tiltX = deltaY * 10;
            const tiltY = deltaX * -10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
}

// Enhanced typing animation for titles
function initTypingAnimation() {
    const title = document.querySelector('.main-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '3px solid var(--neon-purple)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                title.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Enhanced scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for card children
                if (entry.target.classList.contains('cards-grid')) {
                    const cards = entry.target.querySelectorAll('.card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) rotateX(0)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section, .cards-grid, .card').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced notification system with sound
function showNotification(message, type = 'info', duration = 3000) {
    // Play notification sound
    playNotificationSound(type);
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = getNotificationIcon(type);
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${icon}</div>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">×</button>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(42, 42, 66, 0.95));
        color: white;
        padding: 20px;
        border-radius: 15px;
        border: 2px solid var(--neon-purple);
        box-shadow: 0 15px 40px rgba(162, 155, 254, 0.4);
        z-index: 1000;
        backdrop-filter: blur(15px);
        animation: slideInRight 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 350px;
        font-family: var(--font-primary);
        transform-origin: right center;
    `;
    
    document.body.appendChild(notification);
    
    // Progress bar animation
    const progressBar = notification.querySelector('.notification-progress');
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: var(--gradient-rainbow);
        border-radius: 0 0 15px 15px;
        animation: progressBar ${duration}ms linear;
    `;
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification.querySelector('.notification-close'));
        }
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        info: '💡',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    return icons[type] || icons.info;
}

function playNotificationSound(type) {
    // Create audio context for notification sounds
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        const frequencies = {
            info: 800,
            success: 1000,
            warning: 600,
            error: 400
        };
        
        oscillator.frequency.setValueAtTime(frequencies[type] || 800, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

// Enhanced group opening function
function openGroup(groupType) {
    const link = groupLinks[groupType];
    
    // Add click animation
    const button = event.target.closest(".card-button, .department-button");
    if (button) {
        button.style.transform = "scale(0.95)";
        setTimeout(() => {
            button.style.transform = "";
        }, 150);
    }
    
    if (link && link !== "#") {
        if (groupType === 'accounting' || groupType === 'business' || groupType === 'economics' || groupType === 'statistics') {
            showNotification(`جروب الفرقة الرابعة سيكون متاحاً لدفعة 2028 قريباً! 🚀`, 'info');
        } else {
            window.location.href = `redirect.html?url=${encodeURIComponent(link)}`;
            trackGroupClick(groupType);
        }
    } else {
        showNotification("سيتم إضافة رابط الجروب قريباً! 🚀", "info");
    }
}

function getGroupName(groupType) {
    const names = {
        'first-year': 'الفرقة الأولى',
        'second-year': 'الفرقة الثانية',
        'accounting': 'المحاسبة',
        'business': 'إدارة الأعمال',
        'economics': 'الاقتصاد',
        'statistics': 'الإحصاء'
    };
    return names[groupType] || groupType;
}

// Enhanced loading screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    const loadingBar = document.getElementById("loadingBar");
    const loadingText = document.getElementById("loadingText");
    const messages = [
        "جاري الاتصال بالسيرفر...",
        "تأمين الاتصال...",
        "تحضير الواجهة الرسومية...",
        "تفعيل التأثيرات البصرية...",
        "تحميل الخطوط والأيقونات...",
        "تهيئة النظام التفاعلي...",
        "تم الاتصال! جاري الدخول..."
    ];
    let currentPercentage = 0;
    let currentMessageIndex = 0;
    const totalDuration = 10000; // 10 seconds
    const intervalTime = 100; // Update every 100ms for smooth animation
    const percentageIncrement = (100 / (totalDuration / intervalTime));

    // Add floating particles to loading screen
    createLoadingParticles();

    const updateLoading = () => {
        if (currentPercentage < 100) {
            currentPercentage += percentageIncrement; // Increment percentage smoothly
            if (currentPercentage > 100) currentPercentage = 100;
            
            loadingBar.style.width = currentPercentage + "%";
            
            // Update loading text based on percentage milestones
            const messageMilestones = [0, 15, 30, 45, 60, 75, 90]; // Percentage points for messages
            if (currentMessageIndex < messages.length - 1 && currentPercentage >= messageMilestones[currentMessageIndex]) {
                currentMessageIndex++;
                loadingText.style.opacity = '0';
                setTimeout(() => {
                    loadingText.textContent = messages[currentMessageIndex];
                    loadingText.style.opacity = '1';
                }, 200);
            }
            
            // Update progress percentage
            const percentageElement = document.querySelector(".loading-percentage");
            if (percentageElement) {
                percentageElement.textContent = Math.floor(currentPercentage) + "%";
            }
            
            requestAnimationFrame(updateLoading);
        } else {
            // Ensure final state is 100%
            loadingBar.style.width = "100%";
            const percentageElement = document.querySelector(".loading-percentage");
            if (percentageElement) {
                percentageElement.textContent = "100%";
            }
            loadingText.textContent = messages[messages.length - 1]; // Final message

            // Hide loading screen after total duration
            setTimeout(() => {
                loadingScreen.classList.add("hidden");
                document.body.style.overflow = "auto"; // Allow scrolling after load
                // Clean up particles
                const particleCanvas = document.querySelector(".loading-particles");
                if (particleCanvas) particleCanvas.remove();
            }, totalDuration - (currentPercentage / percentageIncrement * intervalTime)); // Calculate remaining time to hide
        }
    };

    // Start loading simulation
    updateLoading();
}

function createLoadingParticles() {
    const canvas = document.createElement('canvas');
    canvas.className = 'loading-particles';
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.8 + 0.2,
            color: getRandomLoadingColor()
        });
    }
    
    function getRandomLoadingColor() {
        const colors = ['#a29bfe', '#74b9ff', '#fd79a8', '#00b894', '#00cec9'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // Draw particle
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Enhanced keyboard navigation
function initKeyboardNavigation() {
    const focusableElements = document.querySelectorAll('.card-button, .department-button, a[href]');
    let currentIndex = -1;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            currentIndex = e.shiftKey ? 
                (currentIndex - 1 + focusableElements.length) % focusableElements.length :
                (currentIndex + 1) % focusableElements.length;
            
            focusableElements[currentIndex].focus();
            
            // Add visual focus indicator
            focusableElements.forEach(el => el.classList.remove('keyboard-focus'));
            focusableElements[currentIndex].classList.add('keyboard-focus');
        }
        
        if (e.key === 'Enter' && document.activeElement.classList.contains('card-button')) {
            document.activeElement.click();
        }
    });
}

// Enhanced touch gestures
function initTouchGestures() {
    let startX, startY, startTime;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const endTime = Date.now();
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const deltaTime = endTime - startTime;
        
        // Swipe detection
        if (Math.abs(deltaX) > 50 && deltaTime < 300) {
            if (deltaX > 0) {
                // Swipe right
                showNotification('👈 مرحباً بك في Faculty Prime', 'info');
            } else {
                // Swipe left
                showNotification('👉 استكشف المزيد من الأقسام', 'info');
            }
        }
        
        // Reset
        startX = startY = null;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    initLoadingScreen();
    
    // Initialize all enhanced features
    setTimeout(() => {
        initCardEffects();
        initScrollAnimations();
        initKeyboardNavigation();
        initTouchGestures();
        
        // Initialize particle system on desktop only
        if (window.innerWidth > 768) {
            new ParticleSystem();
        }
        
        // Add typing animation after loading
        setTimeout(() => {
            initTypingAnimation();
        }, 2000);
    }, 1000);
});

// Add enhanced CSS animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
        }
        to {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes progressBar {
        from { width: 100%; }
        to { width: 0%; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-icon {
        font-size: 20px;
        flex-shrink: 0;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
        flex-shrink: 0;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: scale(1.1);
    }
    
    .keyboard-focus {
        outline: 3px solid var(--neon-purple) !important;
        outline-offset: 3px !important;
        box-shadow: 0 0 20px rgba(162, 155, 254, 0.5) !important;
    }
    
    .loader-content {
        text-align: center;
        color: white;
    }
    
    .loader-logo-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        animation: logoEnhanced 2s ease-in-out infinite;
        margin-bottom: 20px;
    }
    
    .loader-text {
        font-size: 2rem;
        font-weight: 900;
        background: var(--gradient-rainbow);
        background-size: 400% 400%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: rainbowText 2s ease-in-out infinite;
        margin-bottom: 30px;
    }
    
    .loader-progress {
        width: 200px;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        overflow: hidden;
        margin: 0 auto;
    }
    
    .loader-progress-bar {
        height: 100%;
        background: var(--gradient-rainbow);
        background-size: 400% 400%;
        animation: rainbowBg 2s ease-in-out infinite;
        width: 0%;
        transition: width 0.3s ease;
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(enhancedStyles);

// Enhanced utility functions
function trackGroupClick(groupType) {
    console.log(`User clicked on ${groupType} group`);
    
    // Enhanced analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'group_click', {
            'group_type': groupType,
            'event_category': 'engagement',
            'event_label': getGroupName(groupType)
        });
    }
    
    // Store user preferences
    const preferences = JSON.parse(localStorage.getItem('facultyPrimePrefs') || '{}');
    preferences.lastClickedGroup = groupType;
    preferences.clickCount = (preferences.clickCount || 0) + 1;
    localStorage.setItem('facultyPrimePrefs', JSON.stringify(preferences));
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function updateGroupLinks(newLinks) {
    Object.assign(groupLinks, newLinks);
    console.log('Group links updated:', groupLinks);
    showNotification('تم تحديث روابط الجروبات! 🔄', 'success');
}

// Export enhanced functions
window.FacultyPrime = {
    openGroup,
    updateGroupLinks,
    showNotification,
    trackGroupClick,
    ParticleSystem
};

// Enhanced console welcome message
console.log(`
🎓✨ Faculty Prime Website - Enhanced Version ✨🎓
📚 كلية التجارة - جامعة كفر الشيخ
🚀 مبادرة طلابية رائدة مع تأثيرات عصرية

🔧 للمطورين: استخدم window.FacultyPrime للوصول إلى الوظائف المتاحة
🎨 التحسينات الجديدة:
   • نظام جسيمات تفاعلي
   • تأثيرات hover محسنة
   • أنيميشن كتابة للعناوين
   • نظام إشعارات متطور
   • دعم اللمس والإيماءات
   • تحسينات الوصولية

💡 نصيحة: جرب تحريك الماوس حول الشاشة لرؤية تأثيرات الجسيمات!
`);

// Service Worker for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Future PWA implementation
        console.log('🔄 PWA capabilities ready for future implementation');
    });
}

