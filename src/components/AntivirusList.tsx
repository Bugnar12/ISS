import {Antivirus} from "../models/Antivirus";
import React from "react";
import '../App.css'
import {Component} from "react";

export const antivirusList : Antivirus[] = [
    {id: 1, name: 'Kaspersky', producer: 'Kaspersky Lab', description: 'Kaspersky is a well-known antivirus software'
        , supportMultiPlatform: true, releaseDate: new Date('2020-01-01')},
    {id: 2, name: 'Bitdefender', producer: 'Bitdefender', description: 'Bitdefender is a romanian antivirus.',
        supportMultiPlatform: true, releaseDate: new Date('2001-11-06')},
    {id: 3, name: 'Avast Antivirus', producer: 'Avast Software', description: 'Avast Antivirus is a family of cross-platform internet security applications developed by Avast for Microsoft Windows, macOS, Android and iOS.',
        supportMultiPlatform: true, releaseDate: new Date('1988-05-01')},
    {id: 4, name: 'Norton Antivirus', producer: 'NortonLifeLock', description: 'Norton AntiVirus is an anti-virus or anti-malware software product, developed and distributed by Symantec Corporation since 1991 as part of its Norton family of computer security products.',
        supportMultiPlatform: true, releaseDate: new Date('1990-01-01')},
    {id: 5, name: 'McAfee', producer: 'McAfee', description: 'McAfee, LLC is an American global computer security software company headquartered in Santa Clara, California and claims to be the world\'s largest dedicated security technology company.',
        supportMultiPlatform: true, releaseDate: new Date('1987-09-01')},
    {id: 6, name: 'ESET NOD32', producer: 'ESET', description: 'ESET NOD32 Antivirus, commonly known as NOD32, is an antivirus software package made by the Slovak company ESET.',
        supportMultiPlatform: true, releaseDate: new Date('1992-01-01')},
    {id: 7, name: 'SuperAntiSpyware', producer: 'SuperAntiSpyware', description: 'SuperAntiSpyware is a software application which can detect and remove spyware, adware, trojan horses, rogue security software, computer worms, rootkits, parasites and other potentially harmful software applications.',
        supportMultiPlatform: false, releaseDate: new Date('2004-01-01')},
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