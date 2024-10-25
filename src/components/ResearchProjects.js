import React from 'react';
import { useAppContext } from '../AppContext'; // Assurez-vous que le chemin est correct

function ResearchProjects() {
    const { innovationPoints, setInnovationPoints, ownedModels, setOwnedModels, researchProjectDisplayConditions} = useAppContext();

    function researchAndBuyModel(modelName, requiredPoints) {
        if (innovationPoints >= requiredPoints) {
            setInnovationPoints(innovationPoints - requiredPoints);
            setOwnedModels((prevModels) => ({ ...prevModels, [modelName]: prevModels[modelName] + 1 }));
            console.log(`Modèle ${modelName} acheté !`);
        } else {
            console.log("Vous n'avez pas assez de points d'innovation pour cette recherche.");
        }
    }

                <div className="research-item">
                    Recherche Régression Linéaire
                </div>

    return (
        <div id="research-projects">
            <h3>Projets de Recherche</h3>
            <p>Points d'innovation disponibles : {innovationPoints}</p>
			{researchProjectDisplayConditions.regressionLineaire && (
				<button onClick={() => researchAndBuyModel('Régression Linéaire', 10)}>
					Rechercher Régression Linéaire (10 points d'innovation)
				</button>
            )}
			{researchProjectDisplayConditions.decisionTree && (
				<button onClick={() => researchAndBuyModel('Arbre de Décision', 20)}>
					Rechercher Arbre de Décision (20 points d'innovation)
				</button>
			)}
			{researchProjectDisplayConditions.neuralNetword && (
				<button onClick={() => researchAndBuyModel('Réseau de Neurones', 30)}>
					Rechercher Réseau de Neurones (30 points d'innovation)
				</button>				
			)}
        </div>
    );
}

export default ResearchProjects;
