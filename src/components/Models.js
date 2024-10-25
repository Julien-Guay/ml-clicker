import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';
import OptimizationModal from './OptimizationModal';

function Models() {
    const { ownedModels, dollars, setDollars } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [currentModel, setCurrentModel] = useState(null);
    const [modelRMSE, setModelRMSE] = useState({});

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

        for (const modelName in ownedModels) {
            const quantity = ownedModels[modelName];
            const modelCost = models.find(model => model.name === modelName)?.cost || 0;
            totalEarnings += quantity * modelCost;
        }

        setDollars(prevDollars => prevDollars + totalEarnings);
    };

    useEffect(() => {
        const intervalId = setInterval(calculateDollars, 1000);
        return () => clearInterval(intervalId);
    }, [ownedModels]);

    const handleShowModal = (model) => {
        setCurrentModel(model);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentModel(null);
    };

    const handleValidateRMSE = (rmse) => {
        if (currentModel) {
            setModelRMSE(prevRMSE => ({
                ...prevRMSE,
                [currentModel.name]: rmse,
            }));
        }
        handleCloseModal();
    };

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
                        <button 
                            onClick={() => handleShowModal(model)} 
                            style={{ marginTop: '10px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Optimiser
                        </button>
                        {modelRMSE[model.name] !== undefined && (
                            <p>RMSE Validé : {modelRMSE[model.name].toFixed(2)}</p>
                        )}
                    </div>
                ))}
            </div>
            {showModal && currentModel && (
                <OptimizationModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    modelName={currentModel.name}
                    onValidate={handleValidateRMSE}
                />
            )}
        </div>
    );
}

export default Models;
