import React from 'react';
import {Antivirus} from "../models/Antivirus";

interface AntivirusListProps2 {
    antivirusList: Antivirus[];
    onAntivirusClick: (antivirus: Antivirus) => void;
    selectedAntivirus : Antivirus | null;
}

const AntivirusList2: React.FC<AntivirusListProps2> = ({antivirusList, onAntivirusClick, selectedAntivirus}) => {
    return (
        <ul className='style-list'>
            {antivirusList.map((antivirus) => (
                <li key={antivirus.id}
                    onClick={() => onAntivirusClick(antivirus)} className={selectedAntivirus && selectedAntivirus.id === antivirus.id ? 'selected-item' : ''}>{antivirus.name}</li>
            ))}
        </ul>
    );
};

export default AntivirusList2;