let dataCollected = 100;
let modelAccuracy = 50;
let innovationPoints = 0;
let score = 0;
let workers = 0;
let workerCost = 50;
let scrapingAlgorithms = 0; // Compteur pour les algorithmes de scraping
let models = []; // Stocke les modèles créés

function collectData() {
    const collected = Math.floor(Math.random() * 50) + 1;
    dataCollected += collected;
    logEvent(`Collecté ${collected} données.`);
    updateIndicators();
    checkAlgorithms(); // Vérifie si des algos peuvent être débloqués
}

function researchAndBuyModel(modelName, innovationCost, moneyCost, revenue) {
    // Vérifie si le joueur a suffisamment de points d'innovation
    if (innovationPoints >= innovationCost) {
        innovationPoints -= innovationCost; // Déduit le coût en points d'innovation
        logEvent(`${modelName} a été recherché et acheté !`);

        // Ajoute le modèle avec un compteur à 1
        const existingModel = models.find(model => model.name === modelName);
        if (existingModel) {
            existingModel.count += 1; // Incrémente le compteur si le modèle existe déjà
        } else {
            models.push({ name: modelName, count: 1, revenue: revenue }); // Nouveau modèle
        }

        renderModels(); // Met à jour l'affichage des modèles

        // Cache le bouton après recherche
        document.getElementById(`${modelName.toLowerCase().replace(/ /g, '-')}-btn-container`).style.display = "none";
        updateIndicators(); // Met à jour les indicateurs
    } else {
        logEvent("Pas assez de points d'innovation pour acheter ce modèle !");
    }
}

function addModel(type) {
    const existingModel = models.find(model => model.name === type);
    if (existingModel) {
        existingModel.count += 1; // Incrémente le nombre de modèles existants
    } else {
        const model = { name: type, count: 1, revenue: 5 }; // Nouveau modèle créé
        models.push(model);
    }
    renderModels(); // Mettre à jour l'affichage des modèles
}

function hideResearchButton(type) {
    const buttonContainerId = type === 'Régression Linéaire' ? 'linear-model-btn-container' :
                              type === 'Arbre de Décision' ? 'decision-tree-btn-container' :
                              'neural-network-btn-container';
    document.getElementById(buttonContainerId).style.display = 'none';
}

function generateRevenue() {
    models.forEach(model => {
        score += model.count * model.revenue; // Ajouter des revenus en fonction du nombre de modèles
    });
    updateIndicators();
}

function trainModel(modelIndex) {
    const model = models[modelIndex];
    model.count += 1; // Incrémente le nombre de ce modèle
    logEvent(`${model.name} entraîné !`);
    updateIndicators();
}

function improveModel(modelIndex) {
    if (innovationPoints >= 10) {
        models[modelIndex].revenue += 2; // Améliorer le revenu du modèle
        innovationPoints -= 10;
        score += 5; // Gagner des points de score
        logEvent(`${models[modelIndex].name} amélioré !`);
    } else {
        logEvent("Pas assez de points d'innovation !");
    }
    updateIndicators();
}

function buyWorker() {
    if (score >= workerCost) {
        score -= workerCost;
        workers += 1;
        logEvent("Un travailleur a été engagé !");
        startDataCollection();
        addModel('Travailleur du Clic'); // Ajouter un travailleur comme modèle
    } else {
        logEvent("Pas assez de points pour engager un travailleur !");
    }
    updateIndicators();
}

function startDataCollection() {
    setInterval(() => {
        const collected = Math.floor(Math.random() * 10) + 1;
        dataCollected += collected;
        logEvent(`Collecté ${collected} données par un travailleur.`);
        updateIndicators();
    }, 5000); // Collecte toutes les 5 secondes
}

function updateIndicators() {
    document.getElementById("data-collected").innerText = dataCollected;
    document.getElementById("model-accuracy").innerText = modelAccuracy + "%";
    document.getElementById("innovation-points").innerText = innovationPoints; // Affiche les points d'innovation
    document.getElementById("score").innerText = `$${score}`;
    document.getElementById("workers").innerText = workers.length; // Ajuste pour les travailleurs

    // Vérifie les algos et les modèles disponibles
    checkAlgorithms();
}

function checkAlgorithms() {
    document.querySelectorAll(".algorithm-button-container").forEach(container => {
        container.style.display = "none"; // Cacher tous les boutons par défaut
    });

    if (dataCollected >= 10) {
        document.getElementById("linear-model-btn-container").style.display = "block";
    }
    if (dataCollected >= 20) {
        document.getElementById("decision-tree-btn-container").style.display = "block";
    }
    if (dataCollected >= 30) {
        document.getElementById("neural-network-btn-container").style.display = "block";
    }
}

function logEvent(message) {
    const logDiv = document.getElementById("event-log");
    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.innerText = message;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight; // Faire défiler vers le bas
}

function renderModels() {
    const modelsDiv = document.getElementById("models");
    modelsDiv.innerHTML = ""; // Vider le contenu précédent
    models.forEach((model, index) => {
        const modelPanel = document.createElement("div");
        modelPanel.className = "model-panel";
        modelPanel.innerHTML = `
            <strong>${model.name}</strong><br>
            Nombre: ${model.count}<br>
            Revenu: ${model.revenue} par modèle<br>
            <button onclick="trainModel(${index})">Entraîner le Modèle</button>
            <button onclick="improveModel(${index})">Améliorer le Modèle</button>
        `;
        modelsDiv.appendChild(modelPanel);
    });
}

function renderWorkers() {
    const workersList = document.getElementById("workers-list");
    workersList.innerHTML = ""; // Vider le contenu précédent
    for (let i = 0; i < workers; i++) {
        const workerPanel = document.createElement("div");
        workerPanel.className = "worker-panel";
        workerPanel.innerHTML = `
            <strong>Travailleur ${i + 1}</strong><br>
            <p>Collecte de données : 1 par seconde</p>
        `;
        workersList.appendChild(workerPanel);
    }
}

function renderScrapingAlgos() {
    const scrapingAlgosList = document.getElementById("scraping-algos-list");
    scrapingAlgosList.innerHTML = ""; // Vider le contenu précédent
    for (let i = 0; i < scrapingAlgorithms; i++) {
        const algoPanel = document.createElement("div");
        algoPanel.className = "scraping-algo-panel";
        algoPanel.innerHTML = `
            <strong>Algo de Scraping ${i + 1}</strong><br>
            <p>Collecte automatique de données</p>
        `;
        scrapingAlgosList.appendChild(algoPanel);
    }
}

function buyScrapingAlgorithm() {
    if (innovationPoints >= 200) {
        innovationPoints -= 200;
        scrapingAlgorithms += 1;
        logEvent("Un algorithme de scraping a été acheté !");
        renderScrapingAlgos(); // Mettre à jour l'affichage des algorithmes
    } else {
        logEvent("Pas assez de points d'innovation !");
    }
    updateIndicators();
}

// Appeler generateRevenue toutes les 10 secondes
setInterval(generateRevenue, 10000);

const questions = {
    maths: [
        { question: "5 + 3 ?", answer: "8", difficulty: 1 },
        { question: "12 - 4 ?", answer: "8", difficulty: 1 },
        { question: "3 * 3 ?", answer: "9", difficulty: 1 },
    ],
    programming: [
        {
            question: `Écris un programme en JavaScript pour calculer le double d'un entier. Réponse attendue : (function(x) { return x * 2; })(5)`,
            answer: `(function(x) { return x * 2; })(5)`,
            difficulty: 3
        },
        {
            question: `Écris un programme en JavaScript pour additionner deux nombres. Réponse attendue : (function(a, b) { return a + b; })(3, 4)`,
            answer: `(function(a, b) { return a + b; })(3, 4)`,
            difficulty: 2
        }
    ]
};

let currentQuestion = null;

function startQuiz() {
    const category = document.getElementById("category-select").value;
    const randomIndex = Math.floor(Math.random() * questions[category].length);
    currentQuestion = questions[category][randomIndex];
    
    document.getElementById("question-text").innerText = currentQuestion.question;
    document.getElementById("quiz-question").style.display = "block";
    document.getElementById("quiz-result").innerText = "";
}

function submitAnswer() {
    const userAnswer = document.getElementById("answer-input").value;
    const resultDiv = document.getElementById("quiz-result");
    
    try {
        // Évaluer le code soumis par l'utilisateur
        const isCorrect = eval(userAnswer) === eval(currentQuestion.answer);
        
        if (isCorrect) {
            innovationPoints += currentQuestion.difficulty * 5; // Gagne des points d'innovation selon la difficulté
            resultDiv.innerText = "Bonne réponse !";
        } else {
            resultDiv.innerText = "Mauvaise réponse.";
        }
    } catch (error) {
        resultDiv.innerText = "Erreur dans le code soumis.";
    }
    
    updateIndicators(); // Met à jour les indicateurs
    document.getElementById("quiz-question").style.display = "none"; // Cache la question
}


