let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 45;
let timerInicial = 45;
let tiempoRegresivoid = null; 

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,];
numeros = numeros.sort(()=>{return Math.random() - 0.5});
console.log(numeros);

function contarTiempo(){
    tiempoRegresivoid= setInterval (()=>{
        timer --;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoid);
            bloqueartarjetas();
            alert("¡Se acabó el tiempo! Perdiste");
        }
    },1000);
}

function bloqueartarjetas(){
    for(let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src= "./Assets/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}


function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas)

    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src= "./Assets/${primerResultado}.png" alt="">`;

        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas ==2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src= "./Assets/${segundoResultado}.png" alt="">`;

        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} `;

        if(primerResultado == segundoResultado){
            tarjetasDestapadas = 0;

            aciertos ++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos === 8){
                clearInterval(tiempoRegresivoid);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😎`;
                mostrarTiempo.innerHTML = `Genial 🤯 Solo demoraste ${timerInicial - timer}     Segundos`; 
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 👹⚔️`;
                alert("¡Felicitaciones! ¡Has ganado!");
            }
        }else{
            setTimeout(()=>{
                tarjeta1.innerHTML= "";
                tarjeta2.innerHTML = "";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;

                if (movimientos - aciertos === 3) {
                    bloqueartarjetas();
                    alert("¡Has fallado 3 veces! Has perdido");
                }
            }, 800);
        }
    }
}
function destaparTodasLasCartas() {
    for (let i = 0; i <= 15; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = `<img src="./Assets/${numeros[i]}.png" alt="">`;
        tarjeta.disabled = true;
    }

    // Mostrar alerta de derrota
    if (aciertos < 8 && movimientos >= 3) {
        setTimeout(() => {
            alert("¡No lograste completar el juego en 3 aciertos! Perdiste");
        }, 500);
    }

    if (aciertos === 8) {
        setTimeout(() => {
            alert("¡Felicitaciones! ¡Has ganado!");
        }, 500);
    }
}

