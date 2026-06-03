// --- DOM Selection Setup ---
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let activeGalleryImages = []; // Stores currently filtered images tracking array
let currentIndex = 0;

// --- STEP A: Category Filter System ---
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Switch active button focus highlight state
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        updateActiveImageTracker();
    });
});

// Sync up tracking variables to match display sets
function updateActiveImageTracker() {
    activeGalleryImages = galleryItems.filter(item => item.style.display !== 'none');
}

// --- STEP B: Lightbox Overlay Navigation System ---
function openLightbox(index) {
    currentIndex = index;
    const targetImgSrc = activeGalleryImages[currentIndex].querySelector('img').src;
    lightboxImg.src = targetImgSrc;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function navigateImage(direction) {
    currentIndex += direction;
    
    // Bounds wrapping limits check loops
    if (currentIndex >= activeGalleryImages.length) {
        currentIndex = 0; // Wraps back around to index beginning
    } else if (currentIndex < 0) {
        currentIndex = activeGalleryImages.length - 1; // Wraps to tail back end
    }
    
    lightboxImg.src = activeGalleryImages[currentIndex].querySelector('img').src;
}

// --- STEP C: Event Binding Activations ---

// Click grid item to ignite popup display interface
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Find out what current match index relative position exists within the filtered set
        const filteredIndex = activeGalleryImages.indexOf(item);
        openLightbox(filteredIndex);
    });
});

// Component Control Button click listeners
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', () => navigateImage(1));
prevBtn.addEventListener('click', () => navigateImage(-1));

// Close overlay easily if backdrop workspace itself gets clicked
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Added Keyboard Arrow Accessibility Shortcuts support options
window.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') navigateImage(1);
        if (e.key === 'ArrowLeft') navigateImage(-1);
        if (e.key === 'Escape') closeLightbox();
    }
});

// Initialize setup state arrays immediately on load runtime
updateActiveImageTracker();