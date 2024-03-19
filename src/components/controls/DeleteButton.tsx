import React from 'react';
import {Antivirus} from "../models/Antivirus";
import {deleteAntivirus} from '../services/Service';

interface DeleteButtonProps{
    antivirus: Antivirus | null;
    onDelete: () => void;
}
export default RemoveButton