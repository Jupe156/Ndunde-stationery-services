// JavaScript for Image Slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  // Show the current slide
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
  showSlide(currentSlide);
}

// Automatically change slides every 5 seconds
setInterval(nextSlide, 5000);

// Show the first slide initially
showSlide(currentSlide);


