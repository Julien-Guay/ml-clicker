import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext'; // Assurez-vous que le chemin est correct

function ResourcesContainer() {
    const { dollars, setDollars, collectData } = useAppContext();
    const [clickWorkers, setClickWorkers] = useState(0);
    const [workerCost, setWorkerCost] = useState(10); // Coût initial d'un travailleur

    const buyClickWorker = () => {
        if (dollars >= workerCost) {
            setDollars(dollars - workerCost);
            setClickWorkers(clickWorkers + 1);
            setWorkerCost(Math.floor(workerCost * 1.5)); // Augmenter le coût à chaque achat
        } else {
            console.log("Pas assez de dollars pour acheter un travailleur !");
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            collectData(clickWorkers); // Produire des données basées sur le nombre de travailleurs
        }, 1000); // Met à jour toutes les secondes

        return () => clearInterval(intervalId); // Nettoie l'intervalle au démontage du composant
    }, [clickWorkers, collectData]);

    return (
        <div id="resources-container">
            <h2>Ressources Humaines</h2>
            <div className="workers-grid">
                <div className="worker-card">
                    <h4>Travailleurs du clic</h4>
                    <p>Nombre : {clickWorkers}</p>
                    <p>Coût : {workerCost} $</p>
                    <button onClick={buyClickWorker} 
                        style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Acheter un Travailleur
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResourcesContainer;
