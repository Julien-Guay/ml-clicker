// AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [dataCollected, setDataCollected] = useState(0);
    const [dollars, setDollars] = useState(50); // Montant initial en dollars
    const [innovationPoints, setInnovationPoints] = useState(0); // Points d'innovation initiaux
    const [ownedModels, setOwnedModels] = useState({
        'Régression Linéaire': 0,
        'Arbre de Décision': 0,
        'Réseau de Neurones': 0,
    });
    const [researchProjects, setResearchProjects] = useState([]); // Pour stocker les projets de recherche effectués

	const collectData = () => {
        setDataCollected(dataCollected + 1); // Collecte de 1 donnée
    };
	
	const researchProjectDisplayConditions = {
        regressionLineaire: innovationPoints >= 10,
        decisionTree: innovationPoints >= 20,
        neuralNetword: innovationPoints >= 30,
    };

    return (
        <AppContext.Provider
            value={{
				dataCollected,
				setDataCollected,
                dollars,
                setDollars,
                innovationPoints,
                setInnovationPoints,
                ownedModels,
                setOwnedModels,
                researchProjects,
                setResearchProjects,
				collectData,
				researchProjectDisplayConditions
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
