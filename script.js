const contenedorPrincipal = document.getElementById("contenedorPrincipal");
const ingresaNumero = document.getElementById("ingresaNumero");
const ingresaCantidad = document.getElementById("ingresaCantidad");
const botonLanzaDado = document.getElementById("botonLanzaDado");
const resultado = document.getElementById("resultado");
const cantidadFinal = document.getElementById("cantidadFinal");
const mensajeResultado = document.getElementById("mensajeResultado");
const mensajeFinal = document.getElementById("mensajeFinal");
const lanzar = document.getElementById("lanzar");
const tuDinero = document.getElementById("tuDinero");
const resultadoLeyenda = document.getElementById("resultadoLeyenda");
const cantidadFinalLeyenda = document.getElementById("cantidadFinalLeyenda");
const botonJugarOtravez = document.getElementById("botonJugarOtravez");
const contenedorDado = document.getElementById("contenedorDado");
const contenedorDinero = document.getElementById("contenedorDinero");
const colores = ["#B2054C", "#0B1849", "#443199", "#FFC300", "#254F22", "#7C00FE"];
let cantidadInicial = 50; 


function cambiaColorTitulo(){
    const indiceAleatorio = Math.floor(Math.random() * colores.length);
    lanzar.style.color = colores[indiceAleatorio];
}

function validaNumero(){
    const numeroIngresadoString = ingresaNumero.value;
    if(numeroIngresadoString === ""){
         Swal.fire({
            title:"Ingresa un número válido (del 1 al 6)",
            width: 400,
            icon:"error",
            padding: "3em",
            color: "#85193C"
        });
        return;
    }
    const numeroIngresado = Number(numeroIngresadoString);
    if (Number.isNaN(numeroIngresado) || numeroIngresado <1 || numeroIngresado >6 || numeroIngresado %1 !== 0){
        /*mensajeError.textContent = */
        Swal.fire({
            title:"Ingresa un número válido (del 1 al 6)",
            width: 400,
            icon:"error",
            padding: "3em",
            color: "#85193C"
        }).then(() => {
            ingresaNumero.value = "";
        });
        return;
    }
    console.log("numero ingresado:", numeroIngresado);
    return numeroIngresado;
}

function validaCantidad(){
    //console.log("se ingreso un numero");
    const cantidadIngresadaString = ingresaCantidad.value;
    if(cantidadIngresadaString === ""){
        Swal.fire({
            title:"No puedes apostar más de lo que tienes",
            width: 400,
            icon:"error",
            padding: "3em",
            color: "#85193C"
        });
        return;
    }
    const cantidadIngresada = Number(cantidadIngresadaString);
    if (Number.isNaN(cantidadIngresada) || cantidadIngresada <1 || cantidadIngresada > cantidadInicial || cantidadIngresada %1 !== 0){
        Swal.fire({
            title:"No puedes apostar más de lo que tienes",
            width: 400,
            icon:"error",
            padding: "3em",
            color: "#85193C"
        }).then(() => {
            ingresaNumero.value = "";
        });
        return;
    }
    console.log("cantidad ingresada:", cantidadIngresada);
    return cantidadIngresada;
}

function lanzaDadoalAzar(){ //recibe el numero ingresado para hacer la comparacion con el random que salga y determian si ganas o no
    return Math.floor(Math.random() * 6 )+1;
}


function jugar(numeroIngresado, cantidadIngresada){
    tuDinero.textContent = "";
    if(cantidadIngresada > cantidadInicial){
        console.log("No tienes suficiente dinero para hacer esta apuesta");
        return;
    }
    const resultadoDado = lanzaDadoalAzar();
    contenedorDado.classList.remove("oculto");
    contenedorDinero.classList.remove("oculto");
    resultado.textContent = `${resultadoDado}`;
    resultadoLeyenda.classList.remove("oculto");
    cantidadFinalLeyenda.classList.remove("oculto");
    contenedorPrincipal.classList.remove("ganasteFondo", "perdisteFondo");
    mensajeResultado.classList.remove("ganaste", "perdiste");
    console.log("resultado dado",resultadoDado);
    if(numeroIngresado !== resultadoDado){
        contenedorPrincipal.classList.add("perdisteFondo");
        Swal.fire({
            title: "Perdiste",
            text: "Intenta otra vez",
            imageUrl: "perdiste.png",
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: "Custom image"
            });
        mensajeResultado.classList.add("perdiste");
        
        console.log("Perdiste");
        restaApuesta(cantidadIngresada);
    }else{
        contenedorPrincipal.classList.add("ganasteFondo");
        Swal.fire({
            title: "Ganaste",
            text: "Intenta otra vez",
            imageUrl: "ganaste.png",
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: "Custom image"
            });
        mensajeResultado.classList.add("ganaste");
        console.log("Ganaste");
        sumaApuesta(cantidadIngresada);
    }
    botonLanzaDado.textContent = "Lanzar otra vez";
    cantidadFinal.textContent = `$${cantidadInicial}`;
    if(cantidadInicial === 0 || cantidadInicial === 200){
        contenedorPrincipal.classList.add("juegoTerminado");
        Swal.fire({
            title: "El juego terminó",
            imageUrl: "game-over.jpg",
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: "Custom image"
            });
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
    resultado.textContent = "";
    cantidadFinal.textContent = "$50";
    mensajeResultado.textContent = "";
    mensajeFinal.textContent = "";
    resultadoLeyenda.classList.add("oculto");
    cantidadFinalLeyenda.classList.add("oculto");
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
