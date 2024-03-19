import AntivirusList2 from "../components/AntivirusList2";
import DetailView from "../components/DetailView";
import {antivirusList as initialAntivirusList} from "../components/AntivirusList";
import {Antivirus} from "../models/Antivirus";
import React, {useState} from "react";
import AlertButton from "../components/controls/AddButton";
import AddAntivirusForm from "../components/AddAntivirusForm";
import {addAntivirus} from "../services/Service";
import {Link} from "react-router-dom";
import AddButton from "../components/controls/AddButton";
import DeleteButton from "../components/controls/DeleteButton";

const AntivirusPage: React.FC = () => {
    const [selectedAntivirus, setObject] = useState<Antivirus | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [antivirusList, setAntivirusList] = useState(initialAntivirusList)

    const handleClickAdd = (antivirus : Antivirus) => {
        setShowForm(true);
        setAntivirusList([...antivirusList, antivirus]);
    };

    const handleDelete = () =>
    {
        setAntivirusList(antivirusList.filter(antivirus => antivirus !== selectedAntivirus));
        setObject(null);
    }

    const handleClickEvent = (antivirus: Antivirus) => {
        if (selectedAntivirus && selectedAntivirus.id === antivirus.id) {
            setObject(null);
        } else {
            setObject(antivirus);
        }
    };

    return(
        <div className="antivirus-page">
            <div className="button-list-container">
                <div className = "style-multiple-buttons">
                    <div className="styled-button">
                        <Link to="/add" className="style-link">Add Antivirus</Link>
                    </div>
                    <DeleteButton antivirus={selectedAntivirus} onDelete={handleDelete} />
                </div>
                <div className="list-container">
                    <AntivirusList2 antivirusList={antivirusList} onAntivirusClick={handleClickEvent}
                                    selectedAntivirus={selectedAntivirus}/>
                </div>
            </div>
            <div className="detail-container">
                <DetailView antivirus={selectedAntivirus}/>
            </div>
        </div>
    )
};
export default AntivirusPage;