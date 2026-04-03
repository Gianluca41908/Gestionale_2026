import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PracticeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [practice, setPractice] = useState(null);

    useEffect(() => {
        const fetchPractice = async () => {
            try {
                const res = await fetch(`http://localhost:5000/pratiche/${id}`);
                const data = await res.json();
                setPractice(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPractice();
    }, [id]);

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('it-IT');
    };

    if (!practice) return <p className="text-center mt-5">Caricamento...</p>;

    return (
        <>
            <div className="bg-white border-bottom border-2 border-p mb-3 mb-md-5">
                <h1 className="text-center text-a pt-2 pb-2">Dettaglio Pratica {practice.id}</h1>
            </div>

            <div className="container-fluid">
                <div className="card p-4 shadow">
                    <p><strong>Cliente:</strong> {practice.ragioneSociale}</p>
                    <p><strong>Banca:</strong> {practice.banca}</p>
                    <p><strong>Importo:</strong> € {Number(practice.importo).toLocaleString('it-IT')}</p>
                    <p><strong>Tipologia:</strong> {practice.tipologia}</p>
                    <p><strong>Stato:</strong> {practice.stato}</p>

                    <hr />

                    <p><strong>Data acquisizione:</strong> {formatDate(practice.data_acquisizione)}</p>
                    <p><strong>Data delibera:</strong> {formatDate(practice.data_delibera)}</p>
                    <p><strong>Data erogazione:</strong> {formatDate(practice.data_erogazione)}</p>
                    <p><strong>Data fattura:</strong> {formatDate(practice.data_fattura)}</p>
                    <p><strong>Numero fattura:</strong> {practice.numero_fattura || '-'}</p>

                    <div className="mt-4 d-flex gap-2">
                        <button
                            className="btn btn-warning px-5"
                            onClick={() => navigate(`/edit-practice`, { state: { pratica: practice } })}
                        >
                            Modifica
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() => navigate('/pratiche')}
                        >
                            Torna indietro
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}