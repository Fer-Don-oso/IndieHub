// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Carrito from './pages/Carrito';
import Perfil from './pages/Perfil';
import Upload from './pages/Upload';
import Logout from './pages/Logout';
import Buscador from './pages/Buscador';
import Foro from './pages/Foro';

// Componente para proteger rutas
const ProtectedRoute = ({ element: Element, ...rest }) => {
    const loggedUser = localStorage.getItem('loggedUser');
    // Si no hay usuario logeado, redirige a la página de inicio de sesión ('/')
    return loggedUser ? <Element {...rest} /> : <Navigate to="/" replace />;
};

const App = () => {
    // Inicializa el estado de login basado en localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('loggedUser'));
    return (
        <Router>
            {/* Renderiza el Navbar, pasando el estado de login */}
            <Navbar loggedIn={isLoggedIn} />
            
            <Routes>
                {/* Rutas de autenticación (no protegidas) */}
                <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Rutas protegidas (Requieren que el usuario esté logeado) */}
                <Route path="/home" element={<ProtectedRoute element={Home} />} />
                <Route path="/carrito" element={<ProtectedRoute element={Carrito} />} />
                <Route path="/perfil" element={<ProtectedRoute element={Perfil} />} />
                <Route path="/upload" element={<ProtectedRoute element={Upload} />} />
                <Route path="/logout" element={<ProtectedRoute element={Logout} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/buscador" element={<ProtectedRoute element={Buscador} />} />
                <Route path="/foro" element={<ProtectedRoute element={Foro} />} />

                {/* Si la ruta no existe */}
                <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
            </Routes>
        </Router>
    );
};

export default App;