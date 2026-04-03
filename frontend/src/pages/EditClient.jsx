import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export default function EditClient() {
    const navigate = useNavigate();
    const location = useLocation();
    const editingCliente = location.state?.cliente;
    const [formData, setFormData] = useState(editingCliente);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url =  `http://localhost:5000/clienti/${editingCliente.id}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('/clienti'); // torna alla lista
            } else {
                console.error('Errore salvataggio cliente');
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

    return (
        <>
            <h1 className="text-center pt-5">Modifica Cliente</h1>
            <div className="container-fluid mt-5">
                <div className="row w-100 justify-content-center">
                    <div className="col-11 col-md-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="ragioneSociale" className="form-label">Ragione Sociale</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ragioneSociale"
                                    aria-describedby="ragioneSociale"
                                    name="ragioneSociale"
                                    value={formData.ragioneSociale}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="partitaIva" className="form-label">Partita Iva</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="partitaIva"
                                    aria-describedby="partitaIva"
                                    name="partitaIva"
                                    value={formData.partitaIva}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ateco" className="form-label">Ateco</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ateco"
                                    aria-describedby="ateco"
                                    name="ateco"
                                    value={formData.ateco}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sedeLegale" className="form-label">Sede Legale</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="sedeLegale"
                                    aria-describedby="sedeLegale"
                                    name="sedeLegale"
                                    value={formData.sedeLegale}
                                    onChange={handleChange} />
                            </div>
                            <button type="submit" className="mybtn">Modifica Cliente</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}