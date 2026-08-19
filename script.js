const contenedorPrincipal = document.getElementById("contenedorPrincipal");
const ingresaNumero = document.getElementById("ingresaNumero");
const ingresaCantidad = document.getElementById("ingresaCantidad");
const botonLanzaDado = document.getElementById("botonLanzaDado");
const resultado = document.getElementById("resultado");
const mensajeError = document.getElementById("mensajeError");
const mensajeError2 = document.getElementById("mensajeError2");
const cantidadFinal = document.getElementById("cantidadFinal");
const mensajeResultado = document.getElementById("mensajeResultado");
const mensajeFinal = document.getElementById("mensajeFinal");
const juego = document.getElementById("juego");
const botonJugarOtravez = document.getElementById("botonJugarOtravez");
const colores = ["#B2054C", "#0B1849", "#443199", "#FFC300", "#254F22", "#FF5F00"];
let cantidadInicial = 50; 

function cambiaColorTitulo(){
    const indiceAleatorio = Math.floor(Math.random() * colores.length);
    juego.style.color = colores[indiceAleatorio];
}

function validaNumero(){
    //console.log("se ingreso un numero");
    const numeroIngresadoString = ingresaNumero.value;
    if(numeroIngresadoString === ""){
        mensajeError.textContent = "";
        return;
    }

    const numeroIngresado = Number(numeroIngresadoString);
    if (Number.isNaN(numeroIngresado) || numeroIngresado <1 || numeroIngresado >6 || numeroIngresado %1 !== 0){
        mensajeError.textContent = "Ingresa un número válido del dado (Número del 1 al 6)";
        return;
    }
    console.log("numero ingresado:", numeroIngresado);
    mensajeError.textContent = "";
    return numeroIngresado;
}
function validaCantidad(){
    //console.log("se ingreso un numero");
    const cantidadIngresadaString = ingresaCantidad.value;
    if(cantidadIngresadaString === ""){
        mensajeError2.textContent = "";
        return;
    }
    const cantidadIngresada = Number(cantidadIngresadaString);
    if (Number.isNaN(cantidadIngresada) || cantidadIngresada <1 || cantidadIngresada > cantidadInicial || cantidadIngresada %1 !== 0){
        mensajeError2.textContent = "No puedes apostar más de lo que tienes";
        return;
    }
    console.log("cantidad ingresada:", cantidadIngresada);
    mensajeError2.textContent = "";
    return cantidadIngresada;
}
function lanzaDadoalAzar(){ //recibe el numero ingresado para hacer la comparacion con el random que salga y determian si ganas o no
    return Math.floor(Math.random() * 6 )+1;
}
function jugar(numeroIngresado, cantidadIngresada){

    if(cantidadIngresada > cantidadInicial){
        console.log("No tienes suficiente dinero para hacer esta apuesta");
        return;
    }
    const resultadoDado = lanzaDadoalAzar();
    resultado.value = resultadoDado;
    contenedorPrincipal.classList.remove("ganasteFondo", "perdisteFondo");
    mensajeResultado.classList.remove("ganaste", "perdiste");
    console.log("resultado dado",resultadoDado);
    if(numeroIngresado !== resultadoDado){
        contenedorPrincipal.classList.add("perdisteFondo");
        mensajeResultado.textContent = "Perdiste";
        mensajeResultado.classList.add("perdiste");
        
        console.log("Perdiste");
        restaApuesta(cantidadIngresada);
    }else{
        contenedorPrincipal.classList.add("ganasteFondo");
        mensajeResultado.textContent = "Ganaste";
        mensajeResultado.classList.add("ganaste");
        console.log("Ganaste");
        sumaApuesta(cantidadIngresada);
    }
    botonLanzaDado.textContent = "Lanzar otra vez";
    cantidadFinal.textContent = `$${cantidadInicial}`;
    if(cantidadInicial === 0 || cantidadInicial === 200){
        contenedorPrincipal.classList.add("juegoTerminado");
        mensajeFinal.textContent = "El juego terminó";
        botonLanzaDado.disabled = true;
        contenedorPrincipal.classList.add("juegoTerminado");
        botonJugarOtravez.style.display = "inline-block";
        console.log("El juego terminó");
    }
    limpiaCampos();
}
function restaApuesta(cantidadIngresada){ // recibe la cantidad apostada
    cantidadInicial -= cantidadIngresada;
    console.log("cantidad actual: ",cantidadInicial);
    //return resultadoCantidadResta;
}
function sumaApuesta(cantidadIngresada){ // recibe la cantidad apostada
    cantidadInicial += cantidadIngresada;
    console.log("cantidad actual: ",cantidadInicial);
   // return resultadoCantidadSuma;
}
function limpiaCampos(){
    ingresaNumero.value = "";
    ingresaCantidad.value = "";
}
function jugarOtra(){
    cantidadInicial = 50;
    resultado.value = "";
    cantidadFinal.textContent = "$50";
    mensajeResultado.textContent = "";
    mensajeFinal.textContent = "";
    mensajeResultado.classList.remove("ganaste", "perdiste");
    contenedorPrincipal.classList.remove("juegoTerminado");
    botonLanzaDado.disabled = false;
    botonLanzaDado.textContent = "Lanzar dado";
    limpiaCampos();
}
ingresaNumero.addEventListener("input", validaNumero);
ingresaCantidad.addEventListener("input",validaCantidad);
botonLanzaDado.addEventListener("click",function(){
    cambiaColorTitulo();
    const numeroIngresado = validaNumero();
    const cantidadIngresada = validaCantidad();
    if(numeroIngresado === undefined || cantidadIngresada === undefined){
        return;
    }
    jugar(numeroIngresado, cantidadIngresada);
});
botonJugarOtravez.addEventListener("click", jugarOtra);
