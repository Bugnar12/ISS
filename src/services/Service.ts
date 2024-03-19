import {Antivirus} from '../models/Antivirus'
import {antivirusList} from '../components/AntivirusList'

//this array will be used to store the data

/**
 * Adds a new antivirus to the antivirusList array.
 *
 * @param {Antivirus} antivirus - The antivirus object to be added to the list.
 * The function first calculates the maximum id from the existing antivirus objects in the list,
 * increments it by one and assigns it to the new antivirus object.
 */
export function addAntivirus(antivirus: Antivirus)
{
    const addedID = Math.max(...antivirusList.map(e => e.id), 0) + 1;
    antivirus.id = addedID;
    antivirusList.push(antivirus);
    console.log(addedID);
}


/*Deletes an antivirus from the in-memory array.
*Search for the id and splice the list where the id is found
* @param {Antivirus} antivirus
* effect: an item is deleted from the list if it is actually found in there
* */
export function deleteAntivirus(antivirus: Antivirus)
{
    const index = antivirusList.findIndex(e => e.id === antivirus.id);
    if(index !== -1)
    {
        antivirusList.splice(index, 1);
    }
}