import React, {useState} from 'react';
import {addAntivirus} from "../services/Service";
import {Antivirus} from "../models/Antivirus";

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
        onSubmit({id, name, producer, description, supportMultiPlatform, releaseDate : new Date(releaseDate)});
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name"/>
            <input type="text" value={producer} onChange={e => setProducer(e.target.value)} placeholder="Producer"/>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)}
                   placeholder="Description"/>
            <input type="checkbox" checked={supportMultiPlatform}
                   onChange={e => setSupportMultiPlatform(e.target.checked)}/>Multi-Platform Support
            <input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} placeholder="Release Date"/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default AddAntivirusForm;