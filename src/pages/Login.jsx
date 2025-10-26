import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    // Hooks para capturar los valores del formulario
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [recuperarCorreo, setRecuperarCorreo] = useState('');
    const navigate = useNavigate();

    const datosUsuario = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.correo === correo && u.password === password);

        if (user) {
            localStorage.setItem('loggedUser', JSON.stringify(user));
            setIsLoggedIn(true); // Actualiza el estado global de login en App.jsx
            alert('¡Bienvenido, ' + user.nombre + '!');
            navigate('/home'); // Redirige a la página principal
        } else {
            alert('Correo o contraseña incorrectos.');
        }
    };

    const recuperarContrasena = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.correo === recuperarCorreo);

        if (user) {
            alert('Tu contraseña es: ' + user.password);
            // En React, el modal se cerraría con lógica de estado, aquí confiamos en el data-bs-dismiss
        } else {
            alert('Correo no registrado.');
        }
        setRecuperarCorreo('');
    };

    return (
        <main>
            <h1 className="titulos" style={{ backgroundColor: 'rgba(237, 244, 250, 0.7)', textAlign: 'center' }}>Bienvenido</h1>
    
            <div className="container d-flex justify-content-center"> {/* CENTRA EL CONTENIDO */}
                <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', marginTop: '30px' }}>
            
                    {/* Campo Correo */}
                    <div className="mb-3">
                        <label htmlFor="login-correo" className="form-label">Correo electrónico</label>
                        <input 
                            type="email" 
                            id="login-correo" 
                            className="form-control" 
                            placeholder="Ingresa tu correo" 
                            value={correo} 
                            onChange={(e) => setCorreo(e.target.value)} 
                        />
                    </div>
            
            {/* Campo Contraseña */}
                    <div className="mb-3">
                        <label htmlFor="login-password" className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            id="login-password" 
                            className="form-control" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <button type="button" onClick={datosUsuario} className="btn btn-success w-100 mb-2">
                        Enviar
                    </button>
            
                    <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#recuperarModal">
                        Recuperar contraseña
                    </button>
                </div>
            </div>
</main>
    );
};

export default Login;