// src/pages/AddAntivirusPage.tsx
import React, { useState } from 'react';

import { Antivirus } from '../models/Antivirus';
import AddAntivirusForm from '../components/AddAntivirusForm';
import { addAntivirus } from '../services/Service';
import {useNavigate} from "react-router-dom";

const AddAntivirusPage: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (antivirus: Antivirus) => {
        addAntivirus(antivirus);
        navigate('/');
    };

    return (
        <div>
            <AddAntivirusForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddAntivirusPage;