import { Antivirus } from "../models/Antivirus";
import React, {useEffect, useState} from "react";

interface Props{
    onClick: (selectedAntivirus: Antivirus) => void;
    antivirus: Antivirus | null;
}

const UpdateAntivirusForm: React.FC<Props>= ({onClick, antivirus}) => {
    const [name, setName] = useState('');
    const [producer, setProducer] = useState('');
    const [description, setDescription] = useState('');
    const [supportMultiPlatform, setSupportMultiPlatform] = useState(false);
    const [releaseDate, setReleaseDate] = useState('');

    useEffect(() => {
        if(antivirus) {
            setName(antivirus.name);
            setProducer(antivirus.producer);
            setDescription(antivirus.description);
            setSupportMultiPlatform(antivirus.supportMultiPlatform);
            setReleaseDate(antivirus.releaseDate.toISOString().split('T')[0]);
        }
    }, [antivirus]);

    const handleUpdate = (event: React.FormEvent) => {
        event.preventDefault();
        if(antivirus)
        {
            const updatedAntivirus = new Antivirus(
                antivirus.id,
                name,
                producer,
                description,
                supportMultiPlatform,
                new Date(releaseDate)
            );
            onClick(updatedAntivirus);
        }
    };

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <label>Antivirus name:</label>
                <input type="text" className="add-input-style" value={name} onChange={e => setName(e.target.value)} placeholder="Name"/>
                <label>Producer</label>
                <input type="text" className="add-input-style" value={producer} onChange={e => setProducer(e.target.value)} placeholder="Producer"/>
                <input type="text" className="add-input-style" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"/>
                <input type="checkbox" className="add-input-style" checked={supportMultiPlatform} onChange={e => setSupportMultiPlatform(e.target.checked)}/>Multi-Platform Support
                <input type="date" className="add-input-style" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} placeholder="Release Date"/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}
export default UpdateAntivirusForm;