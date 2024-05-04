import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Antivirus} from "../models/Antivirus";
import {getAntivirusById} from "../api/API_Requests";
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
            getAntivirusById(antivirusID)
                .then((response) => {
                    setAntivirus(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data: ', error);
                    navigate('/');
                });
        } else {
            navigate('/');
        }
    }, [antivirusIDString, navigate]);

    return(
        <div>
            <UpdateAntivirusForm antivirus={antivirus}/>
        </div>
    )
}

export default UpdateAntivirusPage;