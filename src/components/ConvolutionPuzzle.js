import React, { useState } from 'react';

const ConvolutionPuzzle = () => {
    const [userFilter, setUserFilter] = useState(Array(9).fill(0)); // Pour un filtre 3x3

    const filters = [
        [1, 1, 1, 1, -8, 1, 1, 1, 1], // Exemple de filtre de détection de contours
        [0, -1, 0, -1, 5, -1, 0, -1, 0], // Exemple de filtre de netteté
        // Ajoutez d'autres filtres ici
    ];

    const filterDescriptions = [
        "Développez un filtre pour détecter les arêtes.", // Description pour le filtre de détection d'arêtes
        "Créez un filtre pour améliorer la netteté.", // Description pour le filtre de netteté
        // Ajoutez d'autres descriptions ici
    ];

    // Valeurs possibles pour le filtre
    const filterValues = [1, 0, -1, -8];

    const getNextValue = (currentValue) => {
        // Retourne la prochaine valeur dans la liste des valeurs
        const currentIndex = filterValues.indexOf(currentValue);
        const nextIndex = (currentIndex + 1) % filterValues.length; // Cycle entre les valeurs
        return filterValues[nextIndex];
    };

    const handleCellClick = (index) => {
        const newFilter = [...userFilter];
        newFilter[index] = getNextValue(newFilter[index]); // Changer la valeur de la cellule
        setUserFilter(newFilter);
    };

    const checkSolution = () => {
        const correctFilter = filters[0]; // Utilisez un filtre comme solution
        if (JSON.stringify(userFilter) === JSON.stringify(correctFilter)) {
            alert("Félicitations ! Vous avez créé le bon filtre !");
        } else {
            alert("Ce n'est pas le bon filtre. Essayez encore !");
        }
    };

    return (
        <div className="convolution-puzzle">
            <h3 className="convolution-puzzle__header">Développez un filtre de convolution</h3>
            <p className="convolution-puzzle__instruction">{filterDescriptions[0]}</p> {/* Ajout de la consigne */}
            <div className="user-filter convolution-puzzle__grid">
                {userFilter.map((value, index) => (
                    <div
                        key={index}
                        className="filter-cell convolution-puzzle__item"
                        onClick={() => handleCellClick(index)} // Rendre la cellule cliquable
                        style={{
                            backgroundColor: value === 1 ? '#cce5ff' : value === 0 ? '#fff' : value === -1 ? '#f8d7da' : '#ffeeba',
                            border: '1px solid #ccc',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '40px', // Ajuster la taille des cellules
                            height: '40px', // Ajuster la taille des cellules
                            cursor: 'pointer',
                        }}
                    >
                        {value}
                    </div>
                ))}
            </div>

            <button onClick={checkSolution} className="convolution-puzzle__check-button">
                Vérifier le filtre
            </button>
        </div>
    );
};

export default ConvolutionPuzzle;
