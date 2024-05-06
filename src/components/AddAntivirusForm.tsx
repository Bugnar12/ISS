import React, {useState} from 'react';

import {Antivirus} from "../models/Antivirus";
import {addAntivirus} from "../api/API_Requests";
import "../components/controls/StyleInput.css";

interface Props{
    onSubmit: (antivirus: Antivirus) => void;
}

const AddAntivirusForm: React.FC<Props>= ({onSubmit}) => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [producer, setProducer] = useState('');
    const [description, setDescription] = useState('');
    const [supportMultiPlatform, setSupportMultiPlatform] = useState(false);
    const [releaseDate, setReleaseDate] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !producer || !description || !releaseDate) {
            alert('Please fill out all fields');
            return;
        }
        const newId = Date.now();
        const newAntivirus = new Antivirus(newId, name, producer, description, supportMultiPlatform, new Date(releaseDate));
        console.log(newAntivirus);

        const antivirusPlainObject = {
            id: newId,
            name: name,
            producer: producer,
            description: description,
            supportMultiPlatform: supportMultiPlatform,
            releaseDate: new Date(releaseDate)
        }

        addAntivirus(antivirusPlainObject)
            .then(antivirus => {
                onSubmit(newAntivirus);
            })
            .catch(error => {
                console.error('Error adding antivirus: ', error);
            });
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" className="add-input-style" value={name} onChange={e => setName(e.target.value)} placeholder="Name"/>
                <input type="text" className="add-input-style" value={producer} onChange={e => setProducer(e.target.value)} placeholder="Producer"/>
                <input type="text" className="add-input-style" value={description} onChange={e => setDescription(e.target.value)}
                       placeholder="Description"/>
                <input type="checkbox" className="add-input-style" checked={supportMultiPlatform}
                       onChange={e => setSupportMultiPlatform(e.target.checked)}/>Multi-Platform Support
                <input type="date" className="add-input-style" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} placeholder="Release Date"/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddAntivirusForm;