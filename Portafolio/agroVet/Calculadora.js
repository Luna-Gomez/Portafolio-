function calcularComida() {
    let peso = document.getElementById("peso").value;

    if (peso === "" || peso <= 0) {
        document.getElementById("resultado").innerText = "Ingresa un peso válido";
        return;
    }

    // Regla simple: 30 gramos por cada kg de peso
    let comida = peso * 30;

    document.getElementById("resultado").innerText =
        "Debe comer aproximadamente " + comida + " gramos de comida al día.";
}