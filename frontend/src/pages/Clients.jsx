import { useMemo } from "react";
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Clients() {
    const [clienti, setClienti] = useState([])
    const [search, setSearch] = useState("");
    const [editingCliente, setEditingCliente] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/clienti')
                const data = await response.json()
                setClienti(data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const clientiFiltrati = useMemo(() => {
        return clienti.filter(c =>
            c.ragioneSociale.toLowerCase().includes(search.toLowerCase()) ||
            c.partitaIva.includes(search) ||
            c.sedeLegale.toLowerCase().includes(search.toLowerCase())
        );
    }, [clienti, search]);

    const handleEdit = (cliente) => {
        setEditingCliente(cliente);
        navigate('/edit-client', { state: { cliente } });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Sei sicuro di voler eliminare questo cliente?')) return;
        try {
            const response = await fetch(`http://localhost:5000/clienti/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setClienti(clienti.filter(c => c.id !== id));
                showSuccessToast('Cliente eliminato con successo');
            } else {
                console.error('Errore eliminazione cliente');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const showSuccessToast = (message) => {
        setSuccessMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <>
            <div
                className="toast-container position-fixed end-0 p-2"
                style={{ zIndex: 9999, top: '80px' }}
            >
                {showToast && (
                    <div className="toast align-items-center text-bg-success border-0 show" role="alert">
                        <div className="toast-body" style={{ fontSize: '0.9rem' }}>
                            {successMessage}
                        </div>
                    </div>
                )}
            </div>

            <h1 className="text-center pt-5">Clienti</h1>

            <input
                type="text"
                placeholder="Cerca cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="my-input mx-auto my-4 form-control d-block"
            />

            <div className="container">
                <table className="table table-hover table-bordered text-center align-middle responsive-table">
                    <thead className="table-dark">
                        <tr>
                            <th>Ragione Sociale</th>
                            <th>P.IVA</th>
                            <th>ATECO</th>
                            <th>Sede Legale</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientiFiltrati.length === 0 ? (
                            <tr>
                                <td colSpan="5">Nessun cliente trovato</td>
                            </tr>
                        ) : (
                            clientiFiltrati.map((c) => (
                                <tr key={c.id}>
                                    <td data-label="Ragione Sociale" className="fw-bold">{c.ragioneSociale}</td>
                                    <td data-label="P.IVA">{c.partitaIva}</td>
                                    <td data-label="ATECO">{c.ateco}</td>
                                    <td data-label="Sede Legale">{c.sedeLegale}</td>
                                    <td data-label="Azioni">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button onClick={() => handleEdit(c)} className="btn btn-sm btn-primary">✏️</button>
                                            <button onClick={() => handleDelete(c.id)} className="btn btn-sm btn-danger">🗑</button>
                                            <button className="btn btn-sm btn-secondary">📂</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}