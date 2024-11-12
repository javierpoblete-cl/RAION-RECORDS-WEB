document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    let currentIndex = 0;
  
    function showNextSlide() {
      slides.forEach((slide, index) => {
        slide.style.opacity = index === currentIndex ? '1' : '0';
        slide.style.transition = 'opacity 1s ease-in-out';
      });
  
      // Avanza al siguiente índice
      currentIndex = (currentIndex + 1) % slides.length;
    }
  
    // Inicializa el carrusel
    slides.forEach((slide, index) => {
      slide.style.opacity = index === 0 ? '1' : '0';
      slide.style.filter = 'blur(8px)'; // Mantén el desenfoque
    });
  
    setInterval(showNextSlide, 5000);
  });
  