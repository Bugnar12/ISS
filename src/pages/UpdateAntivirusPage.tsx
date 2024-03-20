import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Antivirus} from "../models/Antivirus";
import {updateAntivirus, getAntivirusList} from "../services/Service";
import UpdateAntivirusForm from "../components/UpdateAntivirusForm";

interface RouteParams {
    [key: string]: string;
}

const UpdateAntivirusPage: React.FC = () => {
    const navigate = useNavigate();
    const { antivirusIDString } = useParams<RouteParams>();
    const [antivirus, setAntivirus] = useState<Antivirus | null>(null);

    useEffect(() => {
        if (antivirusIDString) {
            const antivirusID = parseInt(antivirusIDString);
            const antivirusToUpdate = getAntivirusList().find(antivirus => antivirus.id === antivirusID);
            setAntivirus(antivirusToUpdate ? antivirusToUpdate : null);
        } else {
            // Handle the case when antivirusIDString is undefined
            // For example, you can redirect the user or show an error message
            navigate('/');
        }
    }, [antivirusIDString, navigate]);

    const handleUpdate = (antivirus: Antivirus) => {
        updateAntivirus(antivirus);
        navigate('/');
    };

    return(
        <div>
            <UpdateAntivirusForm onClick={handleUpdate} antivirus={antivirus}/>
        </div>
    )
}

export default UpdateAntivirusPage;