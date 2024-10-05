const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('price-value');

// Update the displayed price when the slider is moved
priceSlider.addEventListener('input', function() {
    priceValue.textContent = `$${this.value}`;
});
