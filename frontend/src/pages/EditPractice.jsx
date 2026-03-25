import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';


export default function EditPractice() {
    const navigate = useNavigate();
    const location = useLocation();
    const editingPratica = location.state?.pratica;
    const [formData, setFormData] = useState(editingPratica);
    const [clienti, setClienti] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:5000/pratiche/${editingPratica.id}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('/pratiche'); // torna alla lista
            } else {
                console.error('Errore modifica cliente');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    

    useEffect(() => {
    const fetchClients = async () => {
        try {
            const res = await fetch('http://localhost:5000/clienti');
            const data = await res.json();
            setClienti(data);

            // qui possiamo trovare il cliente_id corretto
            const cliente = data.find(c => c.ragioneSociale === editingPratica.ragioneSociale);

            setFormData({
                cliente_id: cliente ? cliente.id : '',
                ragioneSociale: editingPratica.ragioneSociale,
                banca: editingPratica.banca,
                importo: editingPratica.importo,
                tipologia: editingPratica.tipologia,
                stato: editingPratica.stato
            });

        } catch (err) {
            console.error(err);
        }
    }
    fetchClients();
}, [editingPratica]);

    return (
        <>
            <h1 className="text-center pt-5">Modifica pratica</h1>
            <div className="container-fluid mt-5">
                <div className="row w-100 justify-content-center">
                    <div className="col-11 col-md-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Cliente</label>
                                <Select
                                    options={clienti.map(c => ({ value: c.id, label: c.ragioneSociale }))}
                                    value={
                                        clienti.find(c => c.ragioneSociale === editingPratica.ragioneSociale)
                                            ? {
                                                value: clienti.find(c => c.ragioneSociale === editingPratica.ragioneSociale).id,
                                                label: editingPratica.ragioneSociale
                                            }
                                            : null
                                    }
                                    onChange={(selectedOption) => {
                                        setFormData({
                                            ...formData,
                                            cliente_id: selectedOption ? selectedOption.value : '',
                                            ragioneSociale: selectedOption ? selectedOption.label : ''
                                        });
                                    }}
                                    placeholder="Seleziona cliente..."
                                    isClearable
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="banca" className="form-label fw-bold">Banca</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="banca"
                                    aria-describedby="banca"
                                    name="banca"
                                    value={formData.banca}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="importo" className="form-label fw-bold">Importo</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="importo"
                                    aria-describedby="importo"
                                    name="importo"
                                    value={formData.importo}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tipologia" className="form-label fw-bold">Tipologia</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tipologia"
                                    aria-describedby="tipologia"
                                    name="tipologia"
                                    value={formData.tipologia}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stato" className="form-label fw-bold">Stato</label>
                                <select
                                    name="stato"
                                    value={formData.stato}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="">Seleziona stato</option>
                                    <option value="In lavorazione">In lavorazione</option>
                                    <option value="Erogata">Erogata</option>
                                    <option value="Fatturata">Fatturata</option>
                                    <option value="Deliberata">Deliberata</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success bg-a px-5 fw-bold text-dark">Modifica Pratica</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}