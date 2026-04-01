import { NavLink } from "react-router-dom";


export default function Header({ open, setOpen }) {
    const isMobile = window.innerWidth < 768;

    return (
        <>
            {/* Bottone toggle */}
            <button
                className="btn btn-dark bg-p text-a"
                style={{ position: 'fixed', top: '20px', left: open ? '180px' : '12px', zIndex: 9999 }}
                onClick={() => setOpen(!open)}
            >
                {open ? "🡸" : "🡺"}
            </button>

            {/* Sidebar */}
            <div
                className={`sidebar bg-a text-p p-3 border-end  ${!open ? "d-none" : ""} d-md-block`}
                style={{
                    width: open ? '250px' : '70px',
                }}
            >
                {/* Logo */}
                <div className={`mb-5 border-bottom border-2 border-p pb-2 mt-5 ${!open ? "text-center" : ""}`}>
                    <NavLink to="/" className="text-decoration-none text-white fw-bold fs-4">
                        {open ? "CreditFlow" : "CF"}
                    </NavLink>
                </div>

                {/* Menu */}
                <ul className="list-unstyled d-flex flex-column gap-3 fs-5 fw-bold">

                    <li className={`mb-3 sidebarBorder rounded-3 p-1 ${open ? '' : 'd-flex justify-content-center'}`}>
                        <NavLink to="/clienti" className={`text-decoration-none text-p `}>
                            {open ? <><i className="bi bi-people-fill text-primary"></i> Clienti</> : <i className="bi bi-people-fill text-primary"></i>}
                        </NavLink>
                    </li>

                    <li className={`mb-3 sidebarBorder rounded-3 p-1 ${open ? '' : 'd-flex justify-content-center'}`}>
                        <NavLink to="/pratiche" className="text-decoration-none text-p">
                            {open ? <><i className="bi bi-folder-fill text-warning"></i> Pratiche</> : <i className="bi bi-folder-fill text-warning"></i>}
                        </NavLink>
                    </li>

                    <li className={`mb-3 sidebarBorder rounded-3 p-1 ${open ? '' : 'd-flex justify-content-center'}`}>
                        <NavLink to="/add-client" className="text-decoration-none text-p">
                            {open ? <><i className="bi bi-person-fill-add text-primary"></i> Crea Cliente</> : <i className="bi bi-person-fill-add text-primary"></i>}
                        </NavLink>
                    </li>

                    <li className={`mb-3 sidebarBorder rounded-3 p-1 ${open ? '' : 'd-flex justify-content-center'}`}>
                        <NavLink to="/add-practice" className="text-decoration-none text-p">
                            {open ? <><i className="bi bi-folder-plus text-warning"></i> Crea Pratica</> : <i className="bi bi-folder-plus text-warning"></i>}
                        </NavLink>
                    </li>

                </ul>
            </div>

            {/* Overlay mobile */}
            {isMobile && open && (
                <div
                    className="overlay"
                    onClick={() => setOpen(false)}
                ></div>
            )}
        </>
    );
}