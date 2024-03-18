import React from 'react';
import AntivirusListClass from './components/AntivirusList';
import AntivirusPage from "./pages/AntivirusPage";
import cursor from './cursor.png';
import antivirus from './antivirus.png';

function App() {
  return (
    <div className="App">
        <title>Aplicatie</title>
        <div className='main-page'>
            <div className='style-header-icon'>
                <p className="styleHeader">Antivirus Master-Detail</p>
                <img src={antivirus} alt="antivirus"></img>
            </div>
            <AntivirusPage/>
        </div>
    </div>
  );
}

export default App;
