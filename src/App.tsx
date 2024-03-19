import React from 'react';
import AntivirusPage from "./pages/AntivirusPage";
import AddAntivirusPage from "./pages/AddAntivirusPage";
import antivirus from './antivirus.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Link} from "react-router-dom";
import '../src/components/controls/StyleButton.css';

function App() {
    return (
        <Router>
            <div className="App">
                <title>Aplicatie</title>
                <div className='main-page'>
                    <div className='style-header-icon'>
                        <p className="styleHeader">Antivirus Master-Detail</p>
                        <img src={antivirus} alt="antivirus"></img>
                    </div>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <div className="button-list">
                                    <AntivirusPage/>
                                </div>
                            </>
                        }/>
                        <Route path="/add" element={
                            <>
                                <AddAntivirusPage/>
                                <div>
                                    <Link to="/" className="styled-button">Master-Detail</Link>
                                </div>
                            </>
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;