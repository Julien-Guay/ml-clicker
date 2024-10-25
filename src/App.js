import React from 'react';
import { AppProvider } from './AppContext'; // Assurez-vous que le chemin est correct
import Dashboard from './components/Dashboard';
import Models from './components/Models';
import ResearchProjects from './components/ResearchProjects';
import Quiz from './components/Quiz';
import ResourcesContainer from './components/ResourcesContainer';
import EventLog from './components/EventLog';
import ConvolutionPuzzle from './components/ConvolutionPuzzle';

function App() {
    return (
        <AppProvider> {/* Ajout du AppProvider ici */}
            <div>
                <h1>ML-clicker</h1>
                <div id="dashboard-container">
                    <Dashboard />
                    <Quiz />
                    <ResearchProjects />
                </div>
                <div id="models-resources-container">
                    <ResourcesContainer />
                    <Models />
                </div>
                <Quiz />
				<ConvolutionPuzzle />
                <EventLog />
            </div>
        </AppProvider>
    );
}

export default App;
