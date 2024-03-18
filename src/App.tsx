import React from 'react';
import AntivirusPage from "./pages/AntivirusPage";
import AddAntivirusPage from "./pages/AddAntivirusPage";
import antivirus from './antivirus.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Link} from "react-router-dom";

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
                                <AntivirusPage />
                                <Link to="/add" className="link-style">Add Antivirus</Link>
                            </>
                        } />
                        <Route path="/add" element={
                            <>
                                <AddAntivirusPage />
                                <div className="link-container">
                                    <Link to="/">Master-Detail</Link>
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