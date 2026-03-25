import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Select from 'react-select';

export default function AddPractice() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cliente_id: '',
        banca: '',
        importo: '',
        tipologia: '',
        stato: ''
    });
    const [clienti, setClienti] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await fetch('http://localhost:5000/clienti');
                const data = await res.json();
                setClienti(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchClients();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/pratiche', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()
        console.log(data)
        setFormData({
            cliente_id: '',
            banca: '',
            importo: '',
            tipologia: '',
            stato: ''
        })

        navigate('/pratiche');
    }

    return (
        <>
            <h1 className="text-center pt-5">Crea pratica</h1>
            <div className="container-fluid mt-5">
                <div className="row w-100 justify-content-center">
                    <div className="col-11 col-md-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Cliente</label>
                                <Select
                                    options={clienti.map(c => ({ value: c.id, label: c.ragioneSociale }))}
                                    value={clienti.find(c => c.id === formData.cliente_id) ? {
                                        value: formData.cliente_id,
                                        label: clienti.find(c => c.id === formData.cliente_id).ragioneSociale
                                    } : null}
                                    onChange={(selectedOption) => {
                                        setFormData({
                                            ...formData,
                                            cliente_id: selectedOption ? selectedOption.value : ''
                                        })
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
                                    // value={ragioneSociale}
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
                            <button type="submit" className="btn btn-success bg-a px-5 fw-bold text-dark">Crea Pratica</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}