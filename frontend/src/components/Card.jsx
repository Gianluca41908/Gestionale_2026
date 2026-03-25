export default function Card({ title, amount, perc, icon, color }) {
    return (
        <div className="card my-card" style={{borderColor: `${color}`}}>
            <div className="card-body d-flex justify-content-evenly">
                <div className="text-container">
                    <h3>€ {(amount || 0).toLocaleString('it-IT', { minimumFractionDigits: 2 })}</h3>
                    <h5 className="card-title">{title}</h5>
                    <h5>{perc.toFixed(2)}%</h5>
                </div>
                <div className="icon-container d-flex justify-content-center align-items-center w-25" style={{borderColor: `${color}`}}>
                    <i className={`bi ${icon} fs-2 fw-bold`} />
                </div>
            </div>
        </div>
    )
}