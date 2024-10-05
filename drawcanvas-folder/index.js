const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const sizePicker = document.getElementById('size');
const clearButton = document.getElementById('clear');

// Set canvas dimensions
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 150;

// Variables to keep track of drawing
let painting = false;

// Start painting
function startPosition(e) {
    painting = true;
    draw(e);
}

// End painting
function endPosition() {
    painting = false;
    ctx.beginPath(); // Start a new path to avoid connecting lines
}

// Draw on the canvas
function draw(e) {
    if (!painting) return;

    ctx.lineWidth = sizePicker.value; // Set brush size
    ctx.lineCap = 'round'; // Round edges of the brush
    ctx.strokeStyle = colorPicker.value; // Set brush color

    // Draw the line
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath(); // Begin a new path for the next segment
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Clear the canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
});

// Event listeners for mouse actions
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
