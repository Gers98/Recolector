let currentQuestion = 0;
let currentPerson = 0;
let responses = [];
let numPersonas = 0;
let generalInfo = [];

const questions = [
    "Nombre:",
    "¿Quién le invitó?:",
    "Observaciones:",
    "Número de teléfono:"
];

function setGeneralInfo() {
    const fecha = document.getElementById('fecha').value;
    const servicio = document.getElementById('servicio').value;

    if (fecha.length !== 8 || isNaN(fecha)) {
        alert("Por favor ingrese una fecha válida en formato DDMMYYYY.");
        return;
    }
    if (!servicio) {
        alert("Por favor ingrese el tipo de servicio.");
        return;
    }

    generalInfo = [formatDate(fecha), servicio];

    document.getElementById('general-info').classList.add('hidden');
    document.getElementById('num-personas').classList.remove('hidden');
}

function setNumPersonas() {
    numPersonas = parseInt(document.getElementById('numPersonas').value);
    if (numPersonas <= 0 || isNaN(numPersonas)) {
        alert("El número debe ser mayor a 0");
        return;
    }

    responses = Array(numPersonas).fill().map(() => Array(questions.length).fill(""));

    showLobby();
}

function showLobby() {
    document.getElementById('num-personas').classList.add('hidden');
    const lobby = document.getElementById('lobby');
    lobby.innerHTML = '<h2>Lobby</h2>';
    for (let i = 0; i < numPersonas; i++) {
        lobby.innerHTML += `<button onclick="startInterview(${i})">Persona ${i+1}</button><br>`;
    }
    lobby.innerHTML += '<button onclick="generateTexts()">Generar Texto</button>';
    lobby.classList.remove('hidden');
}

function startInterview(personIndex) {
    currentPerson = personIndex;
    currentQuestion = 0;
    document.getElementById('lobby').classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    document.getElementById('interview').classList.remove('hidden');
    document.getElementById('question').innerText = questions[currentQuestion];
    document.getElementById('answer').value = responses[currentPerson][currentQuestion];
}

function prevQuestion() {
    if (currentQuestion > 0) {
        responses[currentPerson][currentQuestion] = document.getElementById('answer').value;
        currentQuestion--;
        showQuestion();
    }
}

function nextQuestion() {
    responses[currentPerson][currentQuestion] = document.getElementById('answer').value;
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishInterview();
    }
}

function finishInterview() {
    responses[currentPerson][currentQuestion] = document.getElementById('answer').value;
    document.getElementById('interview').classList.add('hidden');
    showLobby();
}

function generateTexts() {
    let result = `Fecha: ${generalInfo[0]}\nTipo de servicio: ${generalInfo[1]}\n\n`;
    responses.forEach((response, index) => {
        
        response.forEach((answer, i) => {
            result += `${questions[i]} ${answer}\n`;
        });
        result += "\n";
    });

    // Mostrar el área de texto con el resultado
    const resultTextArea = document.getElementById('result-text');
    resultTextArea.value = result;
    document.getElementById('result-container').classList.remove('hidden');
}

function formatDate(dateStr) {
    return `${dateStr.slice(0, 2)}/${dateStr.slice(2, 4)}/${dateStr.slice(4)}`;
}
