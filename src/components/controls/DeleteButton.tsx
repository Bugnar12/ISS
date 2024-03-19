import React from 'react';
import {Antivirus} from "../../models/Antivirus";
import {deleteAntivirus} from "../../services/Service";

interface DeleteButtonProps{
    antivirus: Antivirus | null;
    onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({antivirus, onDelete}) => {
    const handleDelete = () =>
    {
        if(antivirus) {
            deleteAntivirus(antivirus);
            onDelete();
        }
    };

    return(
        <button onClick={handleDelete} className="styled-button">
            Delete Antivirus
        </button>
    )
}


export default DeleteButton