import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { getAntivirusList } from '../api/API_Requests';
import {Antivirus} from "../models/Antivirus";

const sizing = {
    margin: { left: 5 },
    width: 400,
    height: 350,
};

interface AntivirusData {
    label: string;
    value: number;
}

export default function AntivirusChart() {
    const [antivirusData, setAntivirusData] = useState<AntivirusData[]>([]);

    useEffect(() => {
        getAntivirusList().then(data => {
            if (Array.isArray(data)) {
                const mappedData = data.map((antivirus : Antivirus) => {
                    return {
                        label: antivirus.name,
                        value: new Date(antivirus.releaseDate).getFullYear() > 2015 ? 1 : 0
                    };
                });
                setAntivirusData(mappedData);
            }
        });
    }, []);

    return (
        <div className="chart-container" style={{ width: 400, height: 400, }}>
            <PieChart
                series={[
                    {
                        outerRadius: 90,
                        data: antivirusData,
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]:{
                        fill: 'white',
                        fontSize: 14,
                    },
                }}
                slotProps={{
                    legend: {
                        //hide the legend
                        hidden: true,
                    },
                }}
                {...sizing}
            />
        </div>
    );
}