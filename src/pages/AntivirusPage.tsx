import AntivirusList2 from "../components/AntivirusList2";
import DetailView from "../components/DetailView";
import {antivirusList as initialAntivirusList} from "../components/AntivirusList";
import {Antivirus} from "../models/Antivirus";
import React, {useState} from "react";
import AlertButton from "../components/controls/AddButton";
import AddAntivirusForm from "../components/AddAntivirusForm";
import {addAntivirus} from "../services/Service";

const AntivirusPage: React.FC = () => {
    const [selectedAntivirus, setObject] = useState<Antivirus | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [antivirusList, setAntivirusList] = useState(initialAntivirusList)

    const handleClickAdd = (antivirus : Antivirus) => {
        setShowForm(true);
        setAntivirusList([...antivirusList, antivirus]);
    };

    const handleClickEvent = (antivirus: Antivirus) => {
        if (selectedAntivirus && selectedAntivirus.id === antivirus.id) {
            setObject(null);
        } else {
            setObject(antivirus);
        }
    };

    return(
        <>
            <div className="antivirus-page">
                <div className="list-container">
                    <AntivirusList2 antivirusList={antivirusList} onAntivirusClick={handleClickEvent}
                                    selectedAntivirus={selectedAntivirus}/>
                </div>
                <div className="detail-container">
                    <DetailView antivirus={selectedAntivirus}/>
                </div>
            </div>
            <div>
                <AlertButton onClick={() => setShowForm(true)}>Add Antivirus</AlertButton>
            </div>
        </>
    )
};
export default AntivirusPage;