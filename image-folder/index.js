let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function changeSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex += n;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    } else if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    slides[slideIndex - 1].classList.add('active');
}

document.addEventListener("DOMContentLoaded", function() {
    showSlides(); // Auto-start the slideshow when the page loads
});
