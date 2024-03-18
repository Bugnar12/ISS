import {Antivirus} from "../models/Antivirus";
import React from "react";
import '../App.css'
import {Component} from "react";

export const antivirusList : Antivirus[] = [
    new Antivirus(1, 'Kaspersky', 'Kaspersky Lab', 'Kaspersky is a well-known antivirus software', true, new Date('2020-01-01')),
    new Antivirus(2, 'Bitdefender', 'Bitdefender', 'Bitdefender is a romanian antivirus.', true, new Date('2001-11-06')),
    new Antivirus(3, 'Avast', 'Avast Software', 'Avast is a czech antivirus software', true, new Date('2010-10-10')),
    new Antivirus(4, 'Norton', 'NortonLifeLock', 'Norton is an antivirus software', true, new Date('2000-01-01')),
    new Antivirus(5, 'McAfee', 'McAfee', 'McAfee is an antivirus software', true, new Date('2000-01-01')),
    new Antivirus(6, 'ESET', 'ESET', 'ESET is an antivirus software', true, new Date('2000-01-01')),
    new Antivirus(7, 'SuperAntiSpyware', 'SuperAntiSpyware', 'SuperAntiSpyware is an antivirus software', false, new Date('2000-01-01')),
]
export default class AntivirusListClass extends Component{
    render()
    {
        const listItems = antivirusList.map((antivirus) =>
            <div key={antivirus.id}>
                <li className='antivirus-name'>{antivirus.name}</li>
            </div>
        );

        return (
            <div id = "designAntivirus">
                <ul>{listItems}</ul>
            </div>
        )
    }
}