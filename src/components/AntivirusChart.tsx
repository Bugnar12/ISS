import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { antivirusList } from "./AntivirusList";

const sizing = {
    margin: { left: 5 },
    width: 400,
    height: 350,
};

export default function AntivirusChart() {
    const data = antivirusList.map(antivirus => {
        return {
            label: antivirus.name,
            value: antivirus.releaseDate.getFullYear() > 2015 ? 1 : 0
        }
    });

    return (
        <div className="chart-container" style={{ width: 400, height: 400, }}>
            <PieChart
                series={[
                    {
                        outerRadius: 90,
                        data,
                    },
                ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]:{
                    fill: 'white',
                    fonSize: 14,
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