import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import AntivirusList2 from "../components/AntivirusList2";
import DetailView from "../components/DetailView";
import {Antivirus} from "../models/Antivirus";
import {Link} from "react-router-dom";
import DeleteButton from "../components/controls/DeleteButton";
import '../components/controls/ReactModal.css';
import {deleteAntivirus, getAntivirusListPaging, getAntivirusList} from "../services/Service";
import AntivirusChart from "../components/AntivirusChart";
import "../components/ChartStyle.css"
import axios from "axios";


//Modal.setAppElement('#root'); // This line is needed for accessibility reasons

const AntivirusPage: React.FC = () => {
    const [selectedAntivirus, setObject] = useState<Antivirus | null>(null);
    const [antivirusList, setAntivirusList] = useState<Antivirus[]>([]);
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleNextPage = () =>{
        if(currentPage < Math.ceil(antivirusList.length / itemsPerPage))
            setCurrentPage(currentPage + 1);
    }

    const handlePreviousPage = () => {
        if(currentPage > 1)
        {
            setCurrentPage(currentPage - 1);
        }
    }

    const paginatedAntivirusList = antivirusList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    useEffect(() => {
        const antivirusesList = getAntivirusList();
        setAntivirusList(antivirusesList);

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

    const handleSort = () =>{
        setIsAscending(!isAscending);
        antivirusList.sort((a, b) => {
          if(isAscending)
          {
              return a.name.localeCompare(b.name);
          }
          else
              return b.name.localeCompare(a.name);
        })
    }


    return(
        <div className="antivirus-page">
            <div className="button-list-container">
                <div className="style-multiple-buttons">
                    <div className="styled-button">
                        <Link to="/add" className="style-link">Add Antivirus</Link>
                    </div>
                    <DeleteButton antivirus={selectedAntivirus} onDelete={handleDelete}/>
                    <div className="styled-button">
                        <Link to={`/update/${selectedAntivirus?.id}`} className={"style-link"}>Update Antivirus</Link>
                    </div>
                    <div>
                        <button onClick={handleSort} className="styled-button">Sorting</button>
                    </div>
                </div>
                <div className="list-container">
                    <AntivirusList2 antivirusList={paginatedAntivirusList} onAntivirusClick={handleClickEvent}
                                    selectedAntivirus={selectedAntivirus}/>
                    <button onClick={handlePreviousPage}>Previous Page</button>
                    <button onClick={handleNextPage}>Next Page</button>
                </div>
            </div>
            <div className="wrapper-detail-chart">
                <div className="detail-container">
                    <DetailView antivirus={selectedAntivirus}/>
                </div>
                <div className="box">
                    <div>
                        <b>Release date after 12-31-2015: </b>
                    </div>
                    <AntivirusChart/>
                </div>
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