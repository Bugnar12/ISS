import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DetailView from "../components/DetailView";
import {Antivirus} from "../models/Antivirus";
import {Link} from "react-router-dom";
import DeleteButton from "../components/controls/DeleteButton";
import '../components/controls/ReactModal.css';
import AntivirusChart from "../components/AntivirusChart";
import {getAntivirusList, getAntivirusById, deleteAntivirus} from "../api/API_Requests";
import AntivirusList2 from "../components/AntivirusList2";
import SockJS from "sockjs-client";
import {CompatClient, Message, Stomp} from "@stomp/stompjs";
import '../styling/PaginationStyle.css';
import Pagination from '../components/Pagination';

Modal.setAppElement('#root');


const AntivirusPage: React.FC = () => {
    const [selectedAntivirus, setObject] = useState<Antivirus | null>(null);
    const [antivirusList, setAntivirusList] = useState<Antivirus[]>([]);

    const [isAscending, setIsAscending] = useState<boolean>(true);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalPaginationIsOpen, setModalPaginationIsOpen] = useState(false);
    const [serverErrorModal, setServerErrorModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [stompClient, setStompClient] = useState<CompatClient | null>(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
        }
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus)

        return () => {
            window.removeEventListener('online', updateOnlineStatus)
            window.removeEventListener('offline', updateOnlineStatus)
        }
        }, []);


    useEffect(() => {
        const socketUrl = 'http://localhost:8080/ws';
        const client: CompatClient = Stomp.over(() => new SockJS(socketUrl));

        client.connect({}, () => {
            client.subscribe('/topic/antivirus', (message: Message) => {
                const receivedAntivirus = JSON.parse(message.body);
                setAntivirusList((prevList) => [...prevList, receivedAntivirus]);
            })
        })

        setStompClient(client);

        return () => {
            client.disconnect(() => {
                console.log('Disconnected');
            });
        }
    }, [])

    const sendMessage = (message: string) => {
        if (stompClient) {
            stompClient.send("/app/broadcast", {}, JSON.stringify(message));
        }
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset current page to 1 when items per page changes
    };

    const handleNextPage = () =>{
        if(currentPage < Math.ceil(antivirusList.length / itemsPerPage))
            setCurrentPage(currentPage + 1);
        else
            setModalPaginationIsOpen(true);
    }

    const handlePreviousPage = () => {
        if(currentPage > 1)
        {
            setCurrentPage(currentPage - 1);
        }
        else
            setModalPaginationIsOpen(true);
    }

    const paginatedAntivirusList = antivirusList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const refreshData = () => {
        getAntivirusList()
            .then((response) => {
                setAntivirusList(response.data);
                setServerErrorModal(false); //means the server is working OK
            })
            .catch((error) => {
                console.error("Error fetching antivirus list", error);
                setServerErrorModal(true); //we open a modal to address the unsuccessful fetching of data

            })
    }

    useEffect(() => {
        refreshData();
    }, []);

    const handleDelete = () => {
        setModalIsOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedAntivirus) {
            // Update the state before making the DELETE request

            setObject(null);

            deleteAntivirus(selectedAntivirus.id)
                .then(() => {
                    refreshData();
                })
                .catch((error) => {
                    console.error('Error deleting antivirus: ', error);
                });
        }
        setModalIsOpen(false);
    };
    const handleCancelDelete = () => {
        setModalIsOpen(false);
    };

    const handleClickEvent = (antivirus: Antivirus) => {
        getAntivirusById(antivirus.id)
            .then((response) => {
                setObject(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
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
                <div className='list-chart-wrapper'>
                    <div className="list-container">
                        <>
                            <Modal className="react-modal"
                                   isOpen={serverErrorModal}
                                   onRequestClose={() => setServerErrorModal(false)}
                                   contentLabel="Server Error"
                            >
                                <h2>Server Error</h2>
                                <p>Unable to fetch data from the server. Please try again later.</p>
                                <button onClick={refreshData}>Refresh</button>
                                <button onClick={() => setServerErrorModal(false)}>Close</button>
                            </Modal>
                            <AntivirusList2 antivirusList={paginatedAntivirusList} onAntivirusClick={handleClickEvent}
                                            selectedAntivirus={selectedAntivirus}/>
                            <Modal className='react-modal'
                                   isOpen={modalPaginationIsOpen}
                                   onRequestClose={() => setModalPaginationIsOpen(false)}
                                   contentLabel="Pagination Error">
                                <h2>Warning</h2>
                                <p>There are no more pages to show.</p>
                                <button onClick={() => setModalPaginationIsOpen(false)}>Ok</button>
                            </Modal>
                            <button className="left-button" onClick={handlePreviousPage}>Previous Page</button>
                            <button className="right-button" onClick={handleNextPage}>Next Page</button>
                        </>
                    </div>
                    <Pagination itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}   />
                    <AntivirusChart/>
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

            <Modal className='react-modal'
                isOpen={!isOnline}
                contentLabel = "Internet Connection Status"
            >
                <h2>No Internet Connection</h2>
                <p>You are currently offline. Please check your internet connection.</p>
            </Modal>
        </div>
    )
};
export default AntivirusPage;