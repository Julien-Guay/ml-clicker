import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext'; // Assurez-vous que le chemin est correct

function Dashboard() {
    const {
        dataCollected,
        dollars,
        innovationPoints,
        collectData, // Récupération de la fonction collectData
        setInnovationPoints // Assurez-vous d'avoir cette fonction pour mettre à jour les points d'innovation
    } = useAppContext(); // Utilisation du hook

    const [isInnovating, setIsInnovating] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(0);

    const handleInnovate = () => {
        if (!isInnovating) {
            setInnovationPoints(prevPoints => prevPoints + 2); // Ajoute 2 points d'innovation
            setIsInnovating(true); // Démarre le processus d'innovation
            setSecondsRemaining(10); // Définit le temps de countdown à 10 secondes

            // Démarre un timer de countdown de 10 secondes
            const intervalId = setInterval(() => {
                setSecondsRemaining(prevSeconds => {
                    if (prevSeconds <= 1) {
                        clearInterval(intervalId); // Nettoie l'intervalle une fois terminé
                        setIsInnovating(false); // Réinitialise l'état d'innovation
                        return 0;
                    }
                    return prevSeconds - 1; // Décrémente le temps restant
                });
            }, 1000);
        }
    };

    return (
        <div id="dashboard">
            <h2>Tableau de Bord</h2>
            <div className="indicator">Données collectées: <span id="data-collected">{dataCollected}</span></div>
            <div className="indicator">Points d'Innovation: <span id="innovation-points">{innovationPoints}</span></div>
            <div className="indicator">Dollars: <span id="dollars">{dollars}</span></div>
            <button className="small-button" onClick={collectData}>Collecter des Données</button> {/* Ajout du bouton */}
            <button 
                className="small-button" 
                onClick={handleInnovate} 
                disabled={isInnovating} // Désactive le bouton si en train d'innover
                style={{ marginTop: '10px', backgroundColor: isInnovating ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: isInnovating ? 'not-allowed' : 'pointer' }}
            >
                {isInnovating ? `Innovating (${secondsRemaining})` : 'Innovate'}
            </button>
        </div>
    );
}

export default Dashboard;
