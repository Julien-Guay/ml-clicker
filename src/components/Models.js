import React, { useEffect } from 'react';
import { useAppContext } from '../AppContext';

function Models() {
    const { ownedModels, dollars, setDollars } = useAppContext();
    
    const models = [
        { name: 'Régression Linéaire', cost: 10 },
        { name: 'Arbre de Décision', cost: 20 },
        { name: 'Réseau de Neurones', cost: 30 },
    ];

    const handleTrainModel = (modelName, cost) => {
        if (ownedModels[modelName] > 0 && dollars >= cost) {
            setDollars(dollars - cost);
            console.log(`Entraînement du modèle ${modelName} !`);
        } else {
            console.log("Pas assez de dollars ou vous ne possédez pas ce modèle !");
        }
    };

    const calculateDollars = () => {
        let totalEarnings = 0;

        // Parcourir les modèles possédés et calculer les gains
        for (const modelName in ownedModels) {
            const quantity = ownedModels[modelName];
            const modelCost = models.find(model => model.name === modelName)?.cost || 0;
            totalEarnings += quantity * modelCost; // Par exemple, 1 dollar par modèle possédé
        }

        setDollars(prevDollars => prevDollars + totalEarnings); // Ajoute les gains aux dollars existants
    };

    useEffect(() => {
        const intervalId = setInterval(calculateDollars, 1000); // Met à jour toutes les 5 secondes

        return () => clearInterval(intervalId); // Nettoie l'intervalle au démontage du composant
    }, [ownedModels]);

    return (
        <div id="models">
            <h3 style={{ textAlign: 'center' }}>Modèles Disponibles</h3>
            <div className="models-grid">
                {models.map(model => (
                    <div className="model-card" key={model.name}>
                        <h4>{model.name}</h4>
                        <p>Coût d'entraînement: {model.cost} $</p>
                        <p>Modèles possédés: {ownedModels[model.name]}</p>
                        <button onClick={() => handleTrainModel(model.name, model.cost)}>
                            Entraîner Modèle
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Models;
