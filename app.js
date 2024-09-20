const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let color = 'black';
let lineWidth = 5;


canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);


document.querySelectorAll('.color').forEach(colorButton => {
    colorButton.addEventListener('click', () => {
        color = colorButton.style.backgroundColor;
    });
});


document.getElementById('colorPicker').addEventListener('input', (e) => {
    color = e.target.value;
});


document.getElementById('sizePicker').addEventListener('input', (e) => {
    lineWidth = e.target.value;
});

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

git
document.getElementById('save').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'drawing.png';
    link.click();
});
