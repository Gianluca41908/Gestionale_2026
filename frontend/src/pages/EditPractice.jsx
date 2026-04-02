import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';

export default function EditPractice() {
    const navigate = useNavigate();
    const location = useLocation();
    const editingPratica = location.state?.pratica;

    const [formData, setFormData] = useState({});
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
                navigate('/pratiche');
            } else {
                console.error('Errore modifica pratica');
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

                const cliente = data.find(c => c.ragioneSociale === editingPratica.ragioneSociale);

                setFormData({
                    cliente_id: cliente ? cliente.id : '',
                    banca: editingPratica.banca || '',
                    importo: editingPratica.importo || '',
                    tipologia: editingPratica.tipologia || '',
                    stato: editingPratica.stato || '',
                    data_acquisizione: editingPratica.data_acquisizione || '',
                    data_delibera: editingPratica.data_delibera || '',
                    data_erogazione: editingPratica.data_erogazione || '',
                    data_fattura: editingPratica.data_fattura || '',
                    numero_fattura: editingPratica.numero_fattura || ''
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
                    <div className="col-11 col-md-7">
                        <form onSubmit={handleSubmit}>
                            <div className="row">

                                {/* COLONNA SINISTRA */}
                                <div className="col-12 col-md-6">

                                    {/* Cliente */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Cliente</label>
                                        <Select
                                            options={clienti.map(c => ({ value: c.id, label: c.ragioneSociale }))}
                                            value={
                                                clienti.find(c => c.id === formData.cliente_id)
                                                    ? {
                                                        value: formData.cliente_id,
                                                        label: clienti.find(c => c.id === formData.cliente_id).ragioneSociale
                                                    }
                                                    : null
                                            }
                                            onChange={(selectedOption) => {
                                                setFormData({
                                                    ...formData,
                                                    cliente_id: selectedOption ? selectedOption.value : ''
                                                });
                                            }}
                                            placeholder="Seleziona cliente..."
                                            isClearable
                                        />
                                    </div>

                                    {/* Banca */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Banca</label>
                                        <input type="text" className="form-control" name="banca"
                                            value={formData.banca || ''} onChange={handleChange} />
                                    </div>

                                    {/* Importo */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Importo</label>
                                        <input type="number" className="form-control" name="importo"
                                            value={formData.importo || ''} onChange={handleChange} />
                                    </div>

                                    {/* Tipologia */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Tipologia</label>
                                        <input type="text" className="form-control" name="tipologia"
                                            value={formData.tipologia || ''} onChange={handleChange} />
                                    </div>

                                    {/* Stato */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Stato</label>
                                        <select name="stato" value={formData.stato || ''} onChange={handleChange} className="form-select">
                                            <option value="">Seleziona stato</option>
                                            <option value="In lavorazione">In lavorazione</option>
                                            <option value="Erogata">Erogata</option>
                                            <option value="Fatturata">Fatturata</option>
                                            <option value="Deliberata">Deliberata</option>
                                        </select>
                                    </div>
                                </div>

                                {/* COLONNA DESTRA */}
                                <div className="col-12 col-md-6">

                                    {/* DATE opzionali */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Data Acquisizione</label>
                                        <input type="date" className="form-control" name="data_acquisizione"
                                            value={formData.data_acquisizione || ''} onChange={handleChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Data Delibera</label>
                                        <input type="date" className="form-control" name="data_delibera"
                                            value={formData.data_delibera || ''} onChange={handleChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Data Erogazione</label>
                                        <input type="date" className="form-control" name="data_erogazione"
                                            value={formData.data_erogazione || ''} onChange={handleChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Data Fattura</label>
                                        <input type="date" className="form-control" name="data_fattura"
                                            value={formData.data_fattura || ''} onChange={handleChange} />
                                    </div>

                                    {/* Numero fattura */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Numero Fattura</label>
                                        <input type="text" className="form-control" name="numero_fattura"
                                            value={formData.numero_fattura || ''} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            {/* Bottone centrato */}
                            <div className="text-center mt-3">
                                <button type="submit" className="p-2 rounded-3 bg-a border-p text-white fw-bold px-5 mb-5">
                                    Modifica Pratica
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}