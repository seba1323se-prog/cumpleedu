// Lógica del Juego - Tarjeta Interactiva de Cumpleaños Papá Profe

const levels = [
    {
        id: 1,
        title: "Nivel 1: Suma de Cariño ➕",
        statement: "Un examen rápido para entrar en calor, Profe. Si sumamos tu infinita paciencia (50) más tu inmenso amor por la familia (50), ¿cuál es el porcentaje exacto de orgullo que sentimos por ti?",
        formula: "50 + 50 = ?",
        answers: ["100", "100%"],
        hint: "Pista del Profe: Es el número perfecto, ¡un 100 absoluto!",
        imgWriting: "assets/images/einstein_writing.png",
        imgThinking: "assets/images/einstein_thinking.png",
        imgIdea: "assets/images/einstein_idea.png",
        rewardTitle: "¡Demostración Impecable! 🎯",
        rewardMessage: "Sumando todos los días de mi vida a tu lado, me doy cuenta de lo afortunado que soy de tenerte como papá. ¡Gracias por tu paciencia, tu guía y por estar siempre ahí!"
    },
    {
        id: 2,
        title: "Nivel 2: Multiplicación de Momentos ✖️",
        statement: "Si multiplicamos tus 10/10 en paciencia por tus 10/10 como el mejor papá del mundo, ¿cuál es la nota final de tu examen?",
        formula: "10 \\times 10 = ?",
        formulaDisplay: "10 × 10 = ?",
        answers: ["100", "100/100"],
        hint: "Pista del Profe: Multiplica 10 por 10... ¡Un diez sobresaliente al cuadrado!",
        imgWriting: "assets/images/einstein_writing.png",
        imgThinking: "assets/images/einstein_thinking.png",
        imgIdea: "assets/images/einstein_idea.png",
        rewardTitle: "¡Multiplicación de Felicidad! ✨",
        rewardMessage: "Tu paciencia y tus enseñanzas no solo se suman: ¡se multiplican cada día! Gracias por enseñarme a resolver no solo ecuaciones en el papel, sino los desafíos de la vida."
    },
    {
        id: 3,
        title: "Nivel 3: La División Exacta ➗",
        statement: "Si dividimos 100% de dedicación entre 1 solo Papá Profe extraordinario... ¿cuánto amor nos entrega cada día?",
        formula: "100 \\div 1 = ?",
        formulaDisplay: "100 ÷ 1 = ?",
        answers: ["100", "100%"],
        hint: "Pista del Profe: Todo número dividido entre 1 da el mismo resultado...",
        imgWriting: "assets/images/einstein_writing.png",
        imgThinking: "assets/images/einstein_thinking.png",
        imgIdea: "assets/images/einstein_idea.png",
        rewardTitle: "¡División Exacta! 📏",
        rewardMessage: "Aunque dividas tu tiempo entre tus clases, tus alumnos, tus correcciones de exámenes y la casa... tu amor y entrega por la familia siempre se mantiene al 100%."
    },
    {
        id: 4,
        title: "Nivel 4: El Acertijo del Profe (Álgebra) 📐",
        statement: "Resuelve la incógnita 'x' en la ecuación del Papá Ideal: x + 50 = 150. ¿Cuánto vale la sabiduría y el cariño de Papá?",
        formula: "x + 50 = 150 \\implies x = ?",
        formulaDisplay: "x + 50 = 150  ⇒  x = ?",
        answers: ["100"],
        hint: "Pista del Profe: Resta 50 a ambos lados de la igualdad: 150 - 50 = ?",
        imgWriting: "assets/images/einstein_writing.png",
        imgThinking: "assets/images/einstein_thinking.png",
        imgIdea: "assets/images/einstein_idea.png",
        rewardTitle: "¡Incógnita Resuelta! 🔍",
        rewardMessage: "Encontrar la respuesta a la ecuación de la felicidad es muy fácil: ¡el resultado exacto siempre has sido tú, Papá! Tu sabiduría, paciencia y ejemplo son nuestro mayor pilar."
    },
    {
        id: 5,
        title: "Nivel 5: Desafío de Cálculo Infinito ♾️",
        statement: "El desafío final para el Gran Profesor de Matemáticas. Evalúa el siguiente límite cuando el tiempo (t) tiende al infinito: \\lim_{t \\to \\infty} (Amor por Papá)",
        formula: "\\lim_{t \\to \\infty} (Amor) = ?",
        formulaDisplay: "lim (t → ∞) Amor por ti = ?",
        answers: ["infinito", "∞", "inf", "infinity"],
        hint: "Pista del Profe: Escribe 'infinito' o el símbolo '∞'. ¡No tiene límite!",
        imgWriting: "assets/images/einstein_writing.png",
        imgThinking: "assets/images/einstein_thinking.png",
        imgIdea: "assets/images/einstein_final.png",
        rewardTitle: "¡NIVEL MAESTRO COMPLETADO! 🎓🎉",
        rewardMessage: "¡Felicidades Papá! Has resuelto todos los niveles con honores. ¡Tu ingenio y tu amor no tienen límites!"
    }
];

let currentLevelIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    initFloatingSymbols();
    loadLevel(currentLevelIndex);

    // Event listeners
    document.getElementById('answer-form').addEventListener('submit', handleAnswerSubmit);
    document.getElementById('btn-hint').addEventListener('click', showHint);
    document.getElementById('btn-next-level').addEventListener('click', closeRewardModal);
    document.getElementById('audio-toggle-btn').addEventListener('click', toggleAudio);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
});

// Generar símbolos matemáticos flotantes en el fondo
function initFloatingSymbols() {
    const container = document.getElementById('math-bg-symbols');
    container.innerHTML = '';
    const symbols = ['π', '∑', '∫', '∞', '√', 'α', 'β', 'f(x)', '∆', '∈', 'θ', 'λ', 'Q.E.D.'];
    
    for (let i = 0; i < 30; i++) {
        const span = document.createElement('span');
        span.className = 'floating-symbol';
        span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.left = `${Math.random() * 92}vw`;
        span.style.top = `${Math.random() * 88 + 5}vh`;
        span.style.animationDelay = `${(Math.random() * -20).toFixed(2)}s`;
        span.style.animationDuration = `${(Math.random() * 10 + 15).toFixed(2)}s`;
        span.style.fontSize = `${(Math.random() * 1.2 + 1).toFixed(2)}rem`;
        container.appendChild(span);
    }
}

// Cargar Nivel Actual
function loadLevel(index) {
    const lvl = levels[index];

    // Actualizar Progreso
    const percent = ((index) / levels.length) * 100;
    document.getElementById('progress-bar-fill').style.width = `${percent}%`;
    document.getElementById('progress-text').innerText = `Nivel ${index + 1} de ${levels.length}`;

    // Actualizar Campos del Nivel
    document.getElementById('level-tag').innerText = lvl.title;
    document.getElementById('problem-statement').innerText = lvl.statement;
    document.getElementById('math-formula-box').innerText = lvl.formulaDisplay || lvl.formula;
    document.getElementById('user-answer').value = '';
    document.getElementById('feedback-box').className = 'feedback-box';
    document.getElementById('feedback-box').innerText = '';

    // Actualizar Imagen e Interacción del Profe
    setProfeImage(lvl.imgWriting, "¡Profe listo a la pizarra! Resuelve el ejercicio.");

    // Focus en el input
    setTimeout(() => {
        document.getElementById('user-answer').focus();
    }, 100);
}

function setProfeImage(src, dialogue) {
    const img = document.getElementById('profe-img');
    img.src = src;
    document.getElementById('profe-dialog').innerText = dialogue;
}

// Mostrar Pista
function showHint() {
    const lvl = levels[currentLevelIndex];
    setProfeImage(lvl.imgThinking, "El Profe está consultando sus libros de matemáticas...");
    sounds.playHint();

    const feedback = document.getElementById('feedback-box');
    feedback.className = 'feedback-box hint';
    feedback.innerText = lvl.hint;
}

// Validar Respuesta
function handleAnswerSubmit(e) {
    e.preventDefault();
    sounds.init();

    const rawInput = document.getElementById('user-answer').value.trim().toLowerCase();
    const lvl = levels[currentLevelIndex];

    if (!rawInput) {
        showError("Por favor ingresa un resultado para que el Profe lo evalúe.");
        return;
    }

    const isCorrect = lvl.answers.some(ans => rawInput === ans.toLowerCase() || rawInput.replace('%', '') === ans.toLowerCase());

    if (isCorrect) {
        // Respuesta Correcta
        sounds.playCorrect();
        if (typeof confettiEngine !== 'undefined') {
            confettiEngine.triggerBurst();
        }

        if (currentLevelIndex === levels.length - 1) {
            // Último nivel -> Gran Final
            showGrandFinale();
        } else {
            // Mostrar Modal de Premio
            showRewardModal(lvl);
        }
    } else {
        // Respuesta Incorrecta
        sounds.playWrong();
        setProfeImage(lvl.imgThinking, "¡Mmm, el Profe dice que revisemos el cálculo de nuevo!");
        showError("¡Casi! Revisa el cálculo o pide una pista al Profe.");
    }
}

function showError(msg) {
    const feedback = document.getElementById('feedback-box');
    feedback.className = 'feedback-box error';
    feedback.innerText = msg;
}

// Mostrar Modal con el Premio y Mensaje Bonito
function showRewardModal(lvl) {
    document.getElementById('modal-title').innerText = lvl.rewardTitle;
    document.getElementById('reward-message-text').innerText = lvl.rewardMessage;
    document.getElementById('modal-profe-img').src = lvl.imgIdea;

    const modal = document.getElementById('reward-modal');
    modal.classList.add('active');
}

// Cerrar Modal e ir al siguiente nivel
function closeRewardModal() {
    const modal = document.getElementById('reward-modal');
    modal.classList.remove('active');

    currentLevelIndex++;
    if (currentLevelIndex < levels.length) {
        loadLevel(currentLevelIndex);
    }
}

// Mostrar Gran Final Homenaje
function showGrandFinale() {
    document.getElementById('game-play-area').style.display = 'none';
    document.getElementById('progress-section').style.display = 'none';

    const finalScreen = document.getElementById('final-screen');
    finalScreen.classList.add('active');

    // Confeti Continuo y Música de Feliz Cumpleaños
    if (typeof confettiEngine !== 'undefined') {
        confettiEngine.triggerContinuousRain(8000);
    }
    sounds.playBirthdaySong();

    // Actualizar progreso al 100%
    document.getElementById('progress-bar-fill').style.width = '100%';
}

// Reiniciar Juego
function restartGame() {
    currentLevelIndex = 0;
    document.getElementById('final-screen').classList.remove('active');
    document.getElementById('game-play-area').style.display = 'grid';
    document.getElementById('progress-section').style.display = 'flex';
    loadLevel(0);
}

// Toggle de Sonido
function toggleAudio() {
    const isMuted = sounds.toggleMute();
    const btn = document.getElementById('audio-toggle-btn');
    btn.innerHTML = isMuted ? '🔇 Sonido: OFF' : '🔊 Sonido: ON';
}
