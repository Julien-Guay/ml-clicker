import React, { useEffect, useState } from 'react';

const OptimizationModal = ({ show, handleClose, modelName, onValidate }) => {
    const [slope, setSlope] = useState(1);
    const [intercept, setIntercept] = useState(0);
    const [points, setPoints] = useState([]);
    const [rmse, setRmse] = useState(0);

    // Génération des points aléatoires avec une pente et un intercept différents
    const generateRandomPoints = () => {
        const generatedPoints = [];
        const trueSlope = Math.random() * 6 - 3; // Pente réelle aléatoire entre -3 et 3
        const trueIntercept = Math.random() * 200 - 100; // Intercept réel aléatoire entre -100 et 100

        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 200 - 100; // Générer un x aléatoire entre -100 et 100
            const y = trueSlope * x + trueIntercept + (Math.random() * 20 - 10); // y = m_true * x + b_true + erreur gaussienne
            generatedPoints.push({ x, y });
        }
        return generatedPoints;
    };

    // Calcul de l'erreur quadratique moyenne
    const calculateRMSE = (points, slope, intercept) => {
        const sumSquaredErrors = points.reduce((sum, point) => {
            const predictedY = slope * point.x + intercept;
            const error = point.y - predictedY;
            return sum + error * error;
        }, 0);
        return Math.sqrt(sumSquaredErrors / points.length);
    };

    // Fonction pour dessiner les points et la droite
    const drawPoints = () => {
        const canvas = document.getElementById('pointsCanvas');
        if (!canvas) return; // Vérifier que le canevas existe

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Le contexte du canevas n\'a pas pu être obtenu.');
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dessiner les axes
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(0, 200); // Axe X
        ctx.lineTo(400, 200);
        ctx.moveTo(200, 0); // Axe Y
        ctx.lineTo(200, 400);
        ctx.stroke();

        // Dessiner les étiquettes
        ctx.fillStyle = 'black';
        ctx.fillText('-100', 10, 210);
        ctx.fillText('100', 390, 210);
        ctx.fillText('100', 210, 10);
        ctx.fillText('-100', 210, 390);

        // Dessiner les points
        points.forEach(point => {
            ctx.fillStyle = 'blue';
            ctx.beginPath();
            // Ajuster pour que le centre du canvas soit (200, 200)
            ctx.arc(200 + point.x, 200 - point.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        // Dessiner la droite affine sur tout le canvas
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        const yStart = slope * -100 + intercept;
        const yEnd = slope * 100 + intercept;
        ctx.moveTo(0, 200 - yStart);
        ctx.lineTo(400, 200 - yEnd);
        ctx.stroke();
    };

    // Générer les points lors de l'affichage de la modale
    useEffect(() => {
        if (show) {
            const generatedPoints = generateRandomPoints();
            setPoints(generatedPoints);
            setRmse(calculateRMSE(generatedPoints, slope, intercept)); // Calculer RMSE après génération
            drawPoints(); // Dessiner les points initialement
        }
    }, [show]);

    // Mettre à jour le dessin à chaque changement de pente ou intercept
    useEffect(() => {
        if (points.length > 0) {
            setRmse(calculateRMSE(points, slope, intercept)); // Mettre à jour RMSE sans régénérer les points
            drawPoints(); // Redessiner les points et la droite
        }
    }, [slope, intercept]);

    // Gérer le bouton de validation
    const handleValidate = () => {
        if (onValidate) {
            onValidate(rmse); // Appeler la fonction de validation avec le RMSE
        }
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <h2>Optimisation de la Régression Linéaire pour {modelName}</h2>
                <canvas id="pointsCanvas" width="400" height="400" style={{ border: '1px solid black' }}></canvas>
                <div className="controls">
                    <label>
                        Pente :
                        <input
                            type="range"
                            min="-5"
                            max="5"
                            value={slope}
                            step="0.1"
                            onChange={(e) => setSlope(parseFloat(e.target.value))}
                        />
                    </label>
                    <label>
                        Intercept :
                        <input
                            type="range"
                            min="-200"
                            max="200"
                            value={intercept}
                            step="1"
                            onChange={(e) => setIntercept(parseFloat(e.target.value))}
                        />
                    </label>
                </div>
                <div className="results">
                    <p>Pente : {slope.toFixed(2)}</p>
                    <p>Intercept : {intercept.toFixed(2)}</p>
                    <p>Erreur Quadratique Moyenne (RMSE) : {rmse.toFixed(2)}</p>
                </div>
                <button onClick={handleValidate}>Valider</button>
            </div>
        </div>
    );
};

export default OptimizationModal;
