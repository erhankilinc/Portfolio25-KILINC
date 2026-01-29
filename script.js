// ===== GESTION DES MODALES =====

// Fonction pour ouvrir une modale
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animation d'entrée
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.animation = 'modalSlideIn 0.3s ease';
        }
    }
}

// Fonction pour fermer une modale
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Animation de sortie
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.animation = 'modalSlideOut 0.3s ease';
        }
        
        // Fermer après l'animation
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// ===== GESTION DES IMAGES PLEIN ÉCRAN =====

// Fonction pour ouvrir une image en plein écran
function openFullscreenImage(imageSrc, imageAlt) {
    const fullscreenDiv = document.getElementById('imageFullscreen');
    const fullscreenImg = document.getElementById('fullscreenImg');
    
    if (fullscreenDiv && fullscreenImg) {
        fullscreenImg.src = imageSrc;
        fullscreenImg.alt = imageAlt;
        fullscreenDiv.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Fonction pour fermer l'image plein écran
function closeFullscreenImage() {
    const fullscreenDiv = document.getElementById('imageFullscreen');
    if (fullscreenDiv) {
        fullscreenDiv.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===== GESTION DU FORMULAIRE DE CONTACT =====

// Fonction pour gérer l'envoi du formulaire
function handleContactForm(event) {
    event.preventDefault();
    
    // Récupération des données du formulaire
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validation basique
    if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }
    
    // Simulation d'envoi
    const submitBtn = event.target.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Animation de chargement
    submitBtn.innerHTML = '📤 Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulation d'un délai d'envoi
    setTimeout(() => {
        // Affichage du message de succès
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
        }
        
        // Réinitialisation du formulaire
        event.target.reset();
        
        // Restauration du bouton
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Masquer le message après 5 secondes
        setTimeout(() => {
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 5000);
        
    }, 1500);
}

// ===== NAVIGATION DOUCE =====

// Fonction pour la navigation douce vers les sections
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId.replace('#', ''));
    if (element) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// ===== ANIMATIONS AU SCROLL =====

// Fonction pour observer les éléments et déclencher les animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec la classe fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== GESTION DES ERREURS D'IMAGES =====

// Fonction pour gérer les images manquantes
function handleImageErrors() {
    document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('error', function() {
            // Masquer l'image défaillante
            this.style.display = 'none';
            
            // Créer un placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'project-image-placeholder';
            placeholder.innerHTML = `
                📷<br>
                <strong>Image à venir</strong><br>
                <small>${this.alt}</small>
            `;
            
            // Insérer le placeholder après l'image
            this.parentNode.insertBefore(placeholder, this.nextSibling);
        });
    });
}

// ===== GESTION DES ÉVÉNEMENTS CLAVIER =====

// Fonction pour gérer les raccourcis clavier
function setupKeyboardEvents() {
    document.addEventListener('keydown', function(e) {
        // Fermer avec Escape
        if (e.key === 'Escape') {
            // Fermer l'image plein écran
            closeFullscreenImage();
            
            // Fermer toutes les modales ouvertes
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    const modalId = modal.id;
                    closeModal(modalId);
                }
            });
        }
    });
}

// ===== AMÉLIORATION DE L'ACCESSIBILITÉ =====

// Fonction pour améliorer l'accessibilité
function setupAccessibility() {
    // Ajouter des attributs ARIA aux modales
    document.querySelectorAll('.modal').forEach(modal => {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-hidden', 'true');
    });
    
    // Ajouter des attributs aux boutons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
    });
}

// ===== OPTIMISATIONS PERFORMANCES =====

// Fonction de debounce pour optimiser les événements
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== CONFIGURATION DES ÉVÉNEMENTS =====

// Fonction pour configurer les événements de clic sur les images
function setupImageClickEvents() {
    document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('click', function() {
            openFullscreenImage(this.src, this.alt);
        });
        
        // Support clavier pour l'accessibilité
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFullscreenImage(this.src, this.alt);
            }
        });
        
        // Rendre focusable
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `Voir en plein écran: ${this.alt}`);
    });
    
    // Fermer l'image plein écran en cliquant en dehors
    const fullscreenDiv = document.getElementById('imageFullscreen');
    if (fullscreenDiv) {
        fullscreenDiv.addEventListener('click', function(e) {
            if (e.target === this) {
                closeFullscreenImage();
            }
        });
    }
}

// Fonction pour configurer les événements de navigation
function setupNavigationEvents() {
    // Navigation douce pour tous les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    // Fermer les modales en cliquant en dehors
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
}

// Fonction pour configurer le formulaire de contact
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
        
        // Animation des champs au focus
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.2s ease';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }
}

// ===== PARTICULES EN ARRIÈRE-PLAN =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        
        // Durée d'animation aléatoire
        particle.style.animationDuration = Math.random() * 4 + 6 + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
        
        // Supprimer la particule après l'animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }
    
    // Créer des particules régulièrement
    setInterval(createParticle, 800);
    
    // Créer quelques particules initiales
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 200);
    }
}

// ===== ANIMATIONS SUPPLÉMENTAIRES =====

// Ajouter l'animation de sortie pour les modales
const style = document.createElement('style');
style.textContent = `
    @keyframes modalSlideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-50px);
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALISATION =====

// Fonction d'initialisation principale
function initializePortfolio() {
    console.log('🚀 Portfolio Erhan Kilinc - Initialisation...');
    
    // Fonctionnalités principales
    createParticles();
    setupScrollAnimations();
    handleImageErrors();
    setupKeyboardEvents();
    setupAccessibility();
    setupImageClickEvents();
    setupNavigationEvents();
    setupContactForm();
    
    console.log('✅ Portfolio initialisé avec succès !');
}

// ===== ÉVÉNEMENT DE CHARGEMENT =====

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', initializePortfolio);

// Fonction de fallback si DOMContentLoaded est déjà passé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

// ===== GESTION DES ERREURS GLOBALES =====

// Gestionnaire d'erreurs global pour un meilleur debugging
window.addEventListener('error', function(e) {
    console.error('Erreur dans le portfolio:', e.error);
});

// Gestionnaire pour les promesses rejetées
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesse rejetée:', e.reason);
});

// ===== FONCTIONS GLOBALES POUR COMPATIBILITÉ =====

// Rendre les fonctions disponibles globalement
window.openModal = openModal;
window.closeModal = closeModal;
window.openFullscreenImage = openFullscreenImage;
window.closeFullscreenImage = closeFullscreenImage;