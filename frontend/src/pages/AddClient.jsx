import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AddClient() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ragioneSociale: '',
        partitaIva: '',
        ateco: '',
        sedeLegale: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/clienti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()
        console.log(data)
        setFormData({
            ragioneSociale: '',
            partitaIva: '',
            ateco: '',
            sedeLegale: ''
        })

        navigate('/clienti');
    }

    return (
        <>
            <div className="bg-white border-bottom border-2 border-p mb-3 mb-md-5">
                <h1 className="text-center text-a pt-2 pb-2">Crea Cliente</h1>
            </div>
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
                                    // value={ragioneSociale}
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
                                    onChange={handleChange} />
                            </div>
                            <button type="submit" className="mybtn">Crea Cliente</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}