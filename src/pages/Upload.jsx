import React, { useState } from 'react';

const Upload = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Detiene el envío tradicional del formulario
        
        const precioFloat = parseFloat(precio);

        if (!nombre || !precioFloat || !imagen) {
            alert('Completa todos los campos.');
            return;
        }

        let juegos = JSON.parse(localStorage.getItem('juegosSubidos')) || [];
        juegos.push({ nombre, precio: precioFloat, imagen });
        localStorage.setItem('juegosSubidos', JSON.stringify(juegos));
        
        alert('¡Juego subido exitosamente! Ahora aparecerá en la página de inicio.');
        
        // Limpiar el formulario
        setNombre('');
        setPrecio('');
        setImagen('');
    };

    return (
        <main className="container my-5 d-flex flex-column align-items-center"> {/* CLASES AÑADIDAS: d-flex flex-column align-items-center */}
            <h2 className="mb-4 text-center">Sube tu juego indie</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="mb-3">
                    <label htmlFor="nombreJuego" className="form-label">Nombre del juego</label>
                    <input type="text" className="form-control" id="nombreJuego" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="precioJuego" className="form-label">Precio (USD)</label>
                    <input type="number" className="form-control" id="precioJuego" min="0" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="imagenJuego" className="form-label">URL de la imagen</label>
                    <input type="url" className="form-control" id="imagenJuego" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Subir juego</button>
            </form>
        </main>
    );
};

export default Upload;