const canvas = document.querySelector('#firma');
const form = document.querySelector('#form-firma');
const btnLimpiar = document.querySelector('#btnLimpiar');
const btnGenerarDocumento = document.querySelector('#btnGenerarDocumento');
const btnDescargar = document.querySelector('#btnDescargar');
const contexto = canvas.getContext('2d');


const colorPincel = 'black';
const colorFondo = 'white';

const grosor = 2;

let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;
const obtenerXReal = (clientX) => clientX - canvas.getBoundingClientRect().left;
const obtenerYReal = (clientY) => clientY - canvas.getBoundingClientRect().top;
let dibujando = false;

canvas.addEventListener("mousedown", evento => {
    // En este evento solo se ha iniciado el clic, así que dibujamos un punto
    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(evento.clientX);
    yActual = obtenerYReal(evento.clientY);
    contexto.beginPath();
    contexto.fillStyle = colorPincel;
    contexto.fillRect(xActual, yActual, grosor, grosor);
    contexto.closePath();
    // Y establecemos la bandera
    dibujando = true;
});

canvas.addEventListener("mousemove", (evento) => {
    if (!dibujando) {
        return;
    }
    // El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo

    xAnterior = xActual;
    yAnterior = yActual;
    xActual = obtenerXReal(evento.clientX);
    yActual = obtenerYReal(evento.clientY);
    contexto.beginPath();
    contexto.moveTo(xAnterior, yAnterior);
    contexto.lineTo(xActual, yActual);
    contexto.strokeStyle = colorPincel;
    contexto.lineWidth = grosor;
    contexto.stroke();
    contexto.closePath();
});
["mouseup", "mouseout"].forEach(nombreDeEvento => {
    canvas.addEventListener(nombreDeEvento, () => {
        dibujando = false;
    });
});


// limpiar canvas

const limpiarCanvas = () => {
    // Colocar color blanco en fondo de canvas
    contexto.fillStyle = colorFondo;
    contexto.fillRect(0, 0, canvas.width, canvas.height);
};
limpiarCanvas();
btnLimpiar.onclick = limpiarCanvas;

btnDescargar.onclick = () => {
    const enlace = document.createElement('a');
    enlace.download = "Firma.png";
    enlace.href = canvas.toDataURL();
    enlace.click();
};

window.obtenerImagen = () => {
    return canvas.toDataURL();
};

btnGenerarDocumento.onclick = () =>{
    window.open("impresion.html")
};

//? intento de cambiar el cursor situado en el canvas
//? no funciona
// Cuando el cursor entra en el área del canvas
canvas.addEventListener("mouseenter", function () {
    // Cambiar el cursor a una imagen personalizada
    console.log('el mouse esta en la firma')
    canvas.style.cursor = "url(pen.jpg), pointer";
});

// Cuando el cursor sale del área del canvas
canvas.addEventListener("mouseleave", function () {
    // Restaurar el cursor predeterminado
    console.log('el cursor salio del chat')
    canvas.style.cursor = "auto";
});