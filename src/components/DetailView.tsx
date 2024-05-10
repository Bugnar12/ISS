// components/DetailView.tsx
import React from 'react';
import { Antivirus } from '../models/Antivirus';
import { CustomerList } from './CustomerList';
import { Link } from 'react-router-dom'; // Import the Link component

interface DetailViewProps {
    antivirus: Antivirus | null;
}



const DetailView: React.FC<DetailViewProps> = ({ antivirus }) => {
    if (!antivirus) return null;

    const releaseDate = new Date(antivirus.releaseDate);

    return (
        <div className='detail-view'>
            <h2>{antivirus.name}</h2>
            <p className='antivirus-entity'>Producer: {antivirus.producer}</p>
            <p className='antivirus-entity'>Description: {antivirus.description}</p>
            <p className='antivirus-entity'>Multi-platform support: {antivirus.supportMultiPlatform + ''}</p> {/*adding empty string to convert boolean to string implicitly*/}
            <p className='antivirus-entity'>Release date: {releaseDate.toDateString()}</p>
            <Link to={`/antivirus/${antivirus.id}/customers`}>View Customers</Link>
        </div>
    );
};

export default DetailView;
