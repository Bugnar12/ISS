// src/pages/AddAntivirusPage.tsx
import React from 'react';

import { Antivirus } from '../models/Antivirus';
import AddAntivirusForm from '../components/AddAntivirusForm';
import {useNavigate} from "react-router-dom";

const AddAntivirusPage: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (antivirus: Antivirus) => {
        navigate('/');
    };

    return (
        <div>
            <AddAntivirusForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddAntivirusPage;