import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ loggedIn }) => {
    const location = useLocation();
    
    // Rutas para usuarios logeados
    const loggedInRoutes = [
        { path: '/home', name: 'Inicio' },
        { path: '/buscador', name: 'Buscar juegos!' },
        { path: '/foro', name: 'Foro' },
        { path: '/carrito', name: 'Carrito' },
        { path: '/perfil', name: 'Perfil' },
        { path: '/upload', name: 'Sube tu juego!' },
        { path: '/logout', name: 'Cerrar sesión' },
    ];
    
    // Rutas para usuarios no logeados (Login/Signup)
    const loggedOutRoutes = [
        { path: '/', name: 'Login' },
        { path: '/signup', name: 'Registrate' },
    ];
    
    // Si estás logeado, usa las rutas completas, si no, usa Login/Signup
    const navItems = loggedIn ? loggedInRoutes : loggedOutRoutes;

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={loggedIn ? '/home' : '/'}>
                        <img src="/static/img/logo.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-top" />
                        IndieHub
                    </Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {navItems.map((item) => (
                                <li className="nav-item" key={item.path}>
                                    <Link 
                                        className={`nav-link ${location.pathname === item.path ? 'active' : ''}`} 
                                        to={item.path}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;