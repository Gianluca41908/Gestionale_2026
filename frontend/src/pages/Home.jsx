import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

import { Pie } from 'react-chartjs-2';
import Card from "../components/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
    const [practices, setPractices] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/pratiche');
                const data = await res.json();
                setPractices(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const totale = practices.reduce((sum, p) => sum + Number(p.importo), 0);

    const totalePerStato = practices.reduce((acc, p) => {
        const stato = p.stato;

        if (!acc[stato]) acc[stato] = 0;

        acc[stato] += Number(p.importo);

        return acc;
    }, {});

    const totInlavorazione = totalePerStato['In lavorazione'];
    const totErogate = totalePerStato['Erogata'];
    const totFatturata = totalePerStato['Fatturata'];
    const totDeliberata = totalePerStato['Deliberata'];

    const dataChart = {
        labels: ['In lavorazione', 'Erogata', 'Fatturata', 'Deliberata'],
        datasets: [
            {
                label: 'Totale €',
                data: [
                    totalePerStato['In lavorazione'] || 0,
                    totalePerStato['Erogata'] || 0,
                    totalePerStato['Fatturata'] || 0,
                    totalePerStato['Deliberata'] || 0,
                ],
                backgroundColor: [
                    'yellow', // warning
                    'green', // success
                    'blue', // primary
                    'orange', // secondary
                ],
                borderWidth: 1,
            },
        ],
    };

    const optionsChart = {
        plugins: {
            legend: {
                labels: {
                    color: "black", // scritte bianche
                    font: {
                        size: 16 // dimensione più grande
                    }
                }
            }
        }
    };


    return (
        <div className=" min-vh-100">
            <div className="bg-white border-bottom border-2 border-p mb-4 mb-md-5">
                <h1 className="text-center text-a pt-2 pb-2">Dashboard</h1>
            </div>
            <div className="container mt-1 mt-md-5 mb-5">
                <div className="row justify-content-evenly gy-3">
                    <div className="col-12 col-md-6 rounded-5 d-flex justify-content-center align-items-center">
                        <div className="row gy-3">
                            {/* In lavorazione */}
                            <div className="col-md-6">
                                <Card title={'Pratiche In lavorazione'} amount={totInlavorazione} perc={totInlavorazione / totale * 100} icon={'bi-file-text'} color={'yellow'} />
                            </div>

                            {/* Erogata */}
                            <div className="col-md-6">
                                <Card title={'Pratiche Erogate'} amount={totErogate} perc={totErogate / totale * 100} icon={'bi-cash-coin'} color={'green'} />
                            </div>

                            {/* Fatturata */}
                            <div className="col-md-6">
                                <Card title={'Pratiche Fatturate'} amount={totFatturata} perc={totFatturata / totale * 100} icon={'bi-currency-dollar'} color={'blue'} />
                            </div>

                            {/* Deliberata */}
                            <div className="col-md-6">
                                <Card title={'Pratiche Deliberate'} amount={totDeliberata} perc={totDeliberata / totale * 100} icon={'bi-bank'} color={'orange'} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 ">
                        <div className="border border-2 rounded-5 border-p p-3 bg-white">
                            {/* <h5 className="text-center mb-4">Distribuzione pratiche</h5> */}
                            <Pie data={dataChart} options={optionsChart} />
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}