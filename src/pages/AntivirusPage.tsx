import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import AntivirusList2 from "../components/AntivirusList2";
import DetailView from "../components/DetailView";
import {Antivirus} from "../models/Antivirus";
import {Link} from "react-router-dom";
import DeleteButton from "../components/controls/DeleteButton";
import '../components/controls/ReactModal.css';
import {deleteAntivirus, updateAntivirus, getAntivirusList} from "../services/Service";
import UpdateButton from "../components/controls/UpdateButton";

//Modal.setAppElement('#root'); // This line is needed for accessibility reasons

const AntivirusPage: React.FC = () => {
    const [selectedAntivirus, setObject] = useState<Antivirus | null>(null);
    const [antivirusList, setAntivirusList] = useState<Antivirus[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setAntivirusList(getAntivirusList());
    }, []);

    const handleDelete = () => {
        setModalIsOpen(true);
    };

    const handleConfirmDelete = () => {
        //delete + filter to see which id has the antivirus selected + set the object to null
        if (selectedAntivirus) {
            deleteAntivirus(selectedAntivirus);
            setAntivirusList(antivirusList.filter(antivirus => antivirus !== selectedAntivirus));
            setObject(null);
        }
        setModalIsOpen(false);
    };

    const handleCancelDelete = () => {
        setModalIsOpen(false);
    };

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
                    <div className ="styled-button">
                        <Link to={`/update/${selectedAntivirus?.id}`} className={"style-link"}>Update Antivirus</Link>
                    </div>
                </div>
                <div className="list-container">
                    <AntivirusList2 antivirusList={antivirusList} onAntivirusClick={handleClickEvent}
                                    selectedAntivirus={selectedAntivirus}/>
                </div>
            </div>
            <div className="detail-container">
                <DetailView antivirus={selectedAntivirus}/>
            </div>
            <Modal className="react-modal"
                   isOpen={modalIsOpen}
                   onRequestClose={handleCancelDelete}
                   contentLabel="Delete Confirmation"
            >
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this antivirus?</p>
                <button onClick={handleConfirmDelete}>Yes</button>
                <button onClick={handleCancelDelete}>No</button>
            </Modal>
        </div>
    )
};
export default AntivirusPage;