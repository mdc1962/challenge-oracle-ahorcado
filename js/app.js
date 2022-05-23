
let pincel;
let canvas;
let palabra;
let letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
let colorTecla = "#212529";
let colorMargen = "rgb(253, 103, 3)";
let inicioX = 200;
let inicioY = 300;
let lon = 35;
let margen = 20;
let pistaText = "";


let listaTeclas = [];
let listaLetras = [];
let listaPalabras = [];


let aciertos = 0;
let errores = 0;


const iniciarJuego = document.querySelector("#iniciarJuego");
const nuevaPalabra = document.querySelector("#nuevaPalabra");
const agregarPalabra = document.querySelector("#agregarPalabra");

listaPalabras.push("ELEFANTE");
listaPalabras.push("FOCA");
listaPalabras.push("OVEJA");
listaPalabras.push("HUEMUL");
listaPalabras.push("GATOPARDO");
listaPalabras.push("JABALI");
listaPalabras.push("CIERVO");
listaPalabras.push("ZORRO");
listaPalabras.push("PERRO");
listaPalabras.push("ACUAMAN");
listaPalabras.push("GATUBELA");
listaPalabras.push("SALMON");
listaPalabras.push("AHORCADO");
listaPalabras.push("FRONTEND");
listaPalabras.push("FULLSTACK");
listaPalabras.push("DEVELOPER");
listaPalabras.push("JAVASCRIPT");
listaPalabras.push("HTML");
        

class Tecla {
    constructor(x, y, ancho, alto, letra){
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.letra = letra;
        this.dibuja = dibujaTecla;
    }
}

class Letra {
    constructor(x, y, ancho, alto, letra){
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.letra = letra;
        this.dibuja = dibujaCajaLetra;
        this.dibujaLetra = dibujaLetra;
    }
}


function dibujaTecla(){
    pincel.fillStyle = colorTecla;
    pincel.strokeStyle = colorMargen;
    pincel.fillRect(this.x, this.y, this.ancho, this.alto);
    pincel.strokeRect(this.x, this.y, this.ancho, this.alto);   
    pincel.fillStyle = "white";
    pincel.font = "bold 20px courier";
    pincel.fillText(this.letra, this.x+this.ancho/2-5, this.y+this.alto/2+5);
}

function dibujaLetra(){
    var w = this.ancho;
    var h = this.alto;
    pincel.fillStyle = "black";
    pincel.font = "bold 40px Courier";
    pincel.fillText(this.letra, this.x+w/2-12, this.y+h/2+14);
}

function dibujaCajaLetra(){
    pincel.fillStyle = "white";
    pincel.strokeStyle = "black";
    pincel.fillRect(this.x, this.y, this.ancho, this.alto);
    pincel.strokeRect(this.x, this.y, this.ancho, this.alto);
}

function teclado(){
    var ren = 0;
    var col = 0;
    var letra = "";
    var miLetra;
    var x = inicioX;
    var y = inicioY;
    for(var i = 0; i < letras.length; i++){
        letra = letras.substr(i,1);
        miLetra = new Tecla(x, y, lon, lon, letra);
        miLetra.dibuja();
        listaTeclas.push(miLetra);
        x += lon + margen;
        col++;
        if(col==10){
            col = 0;
            ren++;
            if(ren==2){
                x = 280;
            } else {
                x = inicioX;
            }
        }
        y = inicioY + ren * 50;
    }
}
function pintaPalabra(){
    var p = Math.floor(Math.random()*listaPalabras.length);
    palabra = listaPalabras[p];
    var w = canvas.width;
    var len = palabra.length;
    var ren = 0;
    var col = 0;
    var y = 230;
    var lon = 50;
    var x = (w - (lon+margen) *len)/2;
    for(var i=0; i<palabra.length; i++){
        var letra = palabra.substr(i,1);
        var miLetra = new Letra(x, y, lon, lon, letra);
        miLetra.dibuja();
        listaLetras.push(miLetra);
        x += lon + margen;
    }
}

function horca(errores){
    var imagen = new Image();
    imagen.src = "imagenes/ahorcado"+errores+".jpg";
    imagen.onload = function(){
        pincel.drawImage(imagen, 0, 0, 220, 220);
    }
}

function ajusta(xx, yy){
    var posCanvas = canvas.getBoundingClientRect();
    var x = xx-posCanvas.left;
    var y = yy-posCanvas.top;
    return{x:x, y:y}
}

function selecciona(e){
    var pos = ajusta(e.clientX, e.clientY);
    var x = pos.x;
    var y = pos.y;
    var tecla;
    var bandera = false;
    for (var i = 0; i < listaTeclas.length; i++){
        tecla = listaTeclas[i];
        if (tecla.x > 0){
            if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)){
                break;
            }
        }
    }
    if (i < listaTeclas.length){
        for (var i = 0 ; i < palabra.length ; i++){ 
            var letra = palabra.substr(i, 1);
            if (letra == tecla.letra){ 
                caja = listaLetras[i];
                caja.dibujaLetra();
                aciertos++;
                bandera = true;
            }
        }
        if (bandera == false){ 
            errores++;
            horca(errores);
            if (errores == 6) gameOver(errores);
        }
       
        pincel.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
        tecla.x - 1;
        
        if (aciertos == palabra.length) gameOver(errores);
    }
}

function gameOver(errores){
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    pincel.fillStyle = "black";

    pincel.font = "bold 35px Courier";
    if (errores < 6){
        pincel.fillText("Ganaste ¡Felicidades! La palabra es: ", 110, 280);
    } else {
        pincel.fillText("Game over! La palabra era: ", 110, 280);
    }
    pincel.font = "bold 80px Courier";
    lon = (canvas.width - (palabra.length*48))/2;
    pincel.fillText(palabra, lon, 380);
    horca(errores);
}

function iniciaJuego(){
    document.getElementById("pantalla").classList.toggle("hidden");
    document.getElementById("reiniciarJuego").classList.toggle("hidden");

    if(listaPalabras.length >= 1 ){
        juego();
        document.querySelector(".containerApp").classList.add("hidden")
        
    } 
}

function juego(){
    canvas = document.getElementById("pantalla");
        if (canvas && canvas.getContext){
            pincel = canvas.getContext("2d");
            if(pincel){
                teclado();
                pintaPalabra();
                horca(errores);
                canvas.addEventListener("click", selecciona, false);
                } else {
                    alert ("Error al cargar el contexto!");
            }
        }
}

function agregaPalabra(){
    
    listaPalabras = [];
    
    listaPalabras.push(nuevaPalabra.value)
    
    console.log(nuevaPalabra.value);
    colocalStorage.clear();
    nuevaPalabra.value = '';
    
}

function validaAgregaPalabra(){
    
    const pattern = new RegExp('^[A-Z]+$');

    if(pattern.test(nuevaPalabra.value)){
        agregaPalabra();
    } else{
        alert("Solo letras mayúsculas, sin espacios sin acentos ni caracteres especiales")
    }

    
}


iniciarJuego.addEventListener("click", iniciaJuego);
agregarPalabra.addEventListener("click", validaAgregaPalabra);
