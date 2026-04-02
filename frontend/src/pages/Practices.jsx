import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Practices() {
    const [practices, setPractices] = useState([]);
    const [searchCliente, setSearchCliente] = useState('');
    const [filterStato, setFilterStato] = useState('');
    const [filterBanca, setFilterBanca] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [editingPratica, setEditingPratica] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/pratiche')
                const data = await response.json()
                setPractices(data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const practicesFiltrate = practices.filter((p) =>
        p.ragioneSociale.toLowerCase().includes(searchCliente.toLowerCase()) &&
        p.banca.toLowerCase().includes(filterBanca.toLowerCase()) &&
        (filterStato === '' || p.stato === filterStato)
    );

    const sortedPractices = [...practicesFiltrate].sort((a, b) => {
        if (!sortField) return 0;
        let aField = a[sortField];
        let bField = b[sortField];
        if (sortField === 'importo') {
            aField = Number(aField);
            bField = Number(bField);
        } else if (sortField === 'data_acquisizione') {
            aField = aField ? new Date(aField) : new Date(0);
            bField = bField ? new Date(bField) : new Date(0);
        } else if (typeof aField === 'string') {
            aField = aField.toLowerCase();
            bField = bField.toLowerCase();
        }
        if (aField < bField) return sortOrder === 'asc' ? -1 : 1;
        if (aField > bField) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const totaleImporti = sortedPractices.reduce((sum, p) => {
        return sum + Number(p.importo);
    }, 0);

    const handleEdit = (pratica) => {
        setEditingPratica(pratica);
        navigate('/edit-practice', { state: { pratica } });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Sei sicuro di voler eliminare questa pratica?')) return;
        try {
            const response = await fetch(`http://localhost:5000/pratiche/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setPractices(practices.filter(p => p.id !== id));
                showSuccessToast('Pratica eliminata con successo');
            } else {
                console.error('Errore eliminazione pratica');
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

    const getStatoBadge = (stato) => {
        const map = {
            'In lavorazione': 'bg-warning text-dark',
            'Erogata': 'bg-success',
            'Fatturata': 'bg-primary',
            'Deliberata': 'bg-secondary',
        };
        return <span className={`badge ${map[stato] || 'bg-secondary'}`}>{stato}</span>;
    };

    const getSortIcon = (field) => {
        if (sortField !== field) return ' ⇅'; // icona neutra
        return sortOrder === 'asc' ? ' ▲' : ' ▼';
    };

    // console.log(sortedPractices);

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('it-IT');
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

            <div className="bg-white border-bottom border-2 border-p mb-3 mb-md-5">
                <h1 className="text-center text-a pt-2 pb-2">Pratiche</h1>
            </div>

            <div className="container">
                <div className="d-flex gap-3 mb-5 justify-content-center flex-wrap">
                    <input
                        type="text"
                        placeholder="Cerca cliente..."
                        value={searchCliente}
                        onChange={(e) => setSearchCliente(e.target.value)}
                        className="form-control w-auto"
                    />
                    <select
                        className="form-select w-auto"
                        value={filterStato}
                        onChange={(e) => setFilterStato(e.target.value)}
                    >
                        <option value="">Tutti gli stati</option>
                        <option value="In lavorazione">In lavorazione</option>
                        <option value="Erogata">Erogata</option>
                        <option value="Fatturata">Fatturata</option>
                        <option value="Deliberata">Deliberata</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Cerca banca..."
                        value={filterBanca}
                        onChange={(e) => setFilterBanca(e.target.value)}
                        className="form-control w-auto"
                    />
                    <button
                        className="p-2 rounded-3 bg-a border-p text-white fw-bold px-2"
                        onClick={() => {
                            setSearchCliente('');
                            setFilterStato('');
                            setFilterBanca('');
                            setSortField('');
                            setSortOrder('asc');
                        }}
                    >
                        🧹 Reset filtri e ordinamento
                    </button>
                </div>

                <table className="table table-hover table-bordered text-center align-middle responsive-table">
                    <thead className="table-dark">
                        <tr>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('ragioneSociale')}>
                                Cliente{getSortIcon('ragioneSociale')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('banca')}>
                                Banca{getSortIcon('banca')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('importo')}>
                                Importo{getSortIcon('importo')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('tipologia')}>
                                Tipologia{getSortIcon('tipologia')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('stato')}>
                                Stato{getSortIcon('stato')}
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('data_acquisizione')}>
                                Acquisizione{getSortIcon('data_acquisizione')}
                            </th>
                            <th>Azioni</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedPractices.map((practice) => (
                            <tr key={practice.id}>
                                <td data-label="Cliente" className="fw-bold">{practice.ragioneSociale}</td>
                                <td data-label="Banca">{practice.banca}</td>
                                <td data-label="Importo">
                                    € {Number(practice.importo).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td data-label="Tipologia">{practice.tipologia}</td>
                                <td data-label="Stato">{getStatoBadge(practice.stato)}</td>
                                <td data-label="Acquisizione">
                                    {formatDate(practice.data_acquisizione)}
                                </td>
                                <td data-label="Azioni">
                                    <div className="d-flex justify-content-center gap-2">
                                        <button onClick={() => handleEdit(practice)} className="btn btn-sm btn-primary">✏️</button>
                                        <button onClick={() => handleDelete(practice.id)} className="btn btn-sm btn-danger">🗑</button>
                                        <button onClick={() => navigate(`/pratiche/${practice.id}`)} className="btn btn-sm btn-secondary">📂</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr className="table-dark">
                            <td colSpan="2" className="fw-bold text-end responsive-tfoot-label">Totale:</td>
                            <td className="fw-bold responsive-tfoot-value">
                                € {totaleImporti.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td colSpan="4" className="responsive-tfoot-empty"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}