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