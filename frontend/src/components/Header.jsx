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

                    {/* HOME */}
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-decoration-none text-p ${isActive ? 'active-link' : ''}`
                        }
                    >
                        {({ isActive }) => (
                            <li className={`mb-3 sidebarBorder rounded-3 p-1 ${open ? '' : 'd-flex justify-content-center'} ${isActive ? 'bg-p text-a border-s' : 'text-s'}`}>
                                {open
                                    ? <><i className="bi bi-house-fill"></i> Home</>
                                    : <i className="bi bi-house-fill"></i>
                                }
                            </li>
                        )}
                    </NavLink>

                    {/* CLIENTI */}
                    <NavLink
                        to="/clienti"
                        className={({ isActive }) =>
                            `text-decoration-none text-p ${isActive ? 'active-link' : ''}`
                        }
                    >
                        {({ isActive }) => (
                            <li className={`mb-3 sidebarBorder rounded-3 p-1 ${open ? '' : 'd-flex justify-content-center'} ${isActive ? 'bg-p text-a border-s' : 'text-s'}`}>
                                {open
                                    ? <><i className="bi bi-people-fill"></i> Clienti</>
                                    : <i className="bi bi-people-fill"></i>
                                }
                            </li>
                        )}
                    </NavLink>

                    {/* PRATICHE */}
                    <NavLink
                        to="/pratiche"
                        className={({ isActive }) =>
                            `text-decoration-none text-p ${isActive ? 'active-link' : ''}`
                        }
                    >
                        {({ isActive }) => (
                            <li className={`mb-3 sidebarBorder rounded-3 p-1 ${open ? '' : 'd-flex justify-content-center'} ${isActive ? 'bg-p text-a border-s' : 'text-s'}`}>
                                {open
                                    ? <><i className="bi bi-folder-fill"></i> Pratiche</>
                                    : <i className="bi bi-folder-fill"></i>
                                }
                            </li>
                        )}
                    </NavLink>

                    {/* CREA CLIENTE */}
                    <NavLink
                        to="/add-client"
                        className={({ isActive }) =>
                            `text-decoration-none text-p ${isActive ? 'active-link' : ''}`
                        }
                    >
                        {({ isActive }) => (
                            <li className={`mb-3 sidebarBorder rounded-3 p-1 ${open ? '' : 'd-flex justify-content-center'} ${isActive ? 'bg-p text-a border-s' : 'text-s'}`}>
                                {open
                                    ? <><i className="bi bi-person-fill-add"></i> Crea Cliente</>
                                    : <i className="bi bi-person-fill-add"></i>
                                }
                            </li>
                        )}
                    </NavLink>

                    {/* CREA PRATICA */}
                    <NavLink
                        to="/add-practice"
                        className={({ isActive }) =>
                            `text-decoration-none text-p ${isActive ? 'active-link' : ''}`
                        }
                    >
                        {({ isActive }) => (
                            <li className={`mb-3 sidebarBorder rounded-3 p-1 ${open ? '' : 'd-flex justify-content-center'} ${isActive ? 'bg-p text-a border-s' : 'text-s'}`}>
                                {open
                                    ? <><i className="bi bi-folder-plus"></i> Crea Pratica</>
                                    : <i className="bi bi-folder-plus"></i>
                                }
                            </li>
                        )}
                    </NavLink>

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