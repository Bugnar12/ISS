import {Antivirus} from "../../models/Antivirus";

interface UpdateButtonProps{
    antivirus: Antivirus | null;
    onUpdate: () => void;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({antivirus, onUpdate}) => {
    const handleUpdate = () =>
    {
        if(antivirus) {
            onUpdate();
        }
    };

    return(
        <button onClick={handleUpdate} className="styled-button">
            Update Antivirus
        </button>
    )
}

export default UpdateButton