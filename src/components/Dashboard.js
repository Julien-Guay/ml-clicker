import React from 'react';
import { useAppContext } from '../AppContext'; // Assurez-vous que le chemin est correct

function Dashboard() {
    const {
        dataCollected,
        dollars,
        innovationPoints,
        collectData, // Récupération de la fonction collectData
    } = useAppContext(); // Utilisation du hook

    return (
        <div id="dashboard">
            <h2>Tableau de Bord</h2>
            <div className="indicator">Données collectées: <span id="data-collected">{dataCollected}</span></div>
            <div className="indicator">Points d'Innovation: <span id="innovation-points">{innovationPoints}</span></div>
            <div className="indicator">Dollars: <span id="dollars">{dollars}</span></div>
            <button className="small-button" onClick={collectData}>Collecter des Données</button> {/* Ajout du bouton */}
        </div>
    );
}

export default Dashboard;
