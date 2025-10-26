import React, { useState, useEffect } from 'react';
import { initialJuegosFijos } from '../data/juegos'; // Importamos la matriz fija

// Se asume que no creaste un archivo separado para la matriz initialJuegosFijos
// Si ya lo creaste y se llama 'juegos.js' en la carpeta 'data', esta importación es correcta.

const Buscador = () => {
    // Estado para almacenar todos los juegos (fijos + subidos)
    const [todosLosJuegos, setTodosLosJuegos] = useState([]);
    // Estado para la palabra clave de búsqueda
    const [query, setQuery] = useState('');
    // Estado para los juegos que se muestran después de la búsqueda
    const [resultados, setResultados] = useState([]);

    // 1. useEffect: Cargar todos los juegos al iniciar
    useEffect(() => {
        const juegosSubidos = JSON.parse(localStorage.getItem('juegosSubidos') || '[]');
        const juegos = [...initialJuegosFijos, ...juegosSubidos];
        setTodosLosJuegos(juegos);
        setResultados(juegos); // Inicialmente, muestra todos los juegos
    }, []);

    // 2. useEffect: Filtrar juegos cada vez que 'query' o 'todosLosJuegos' cambian
    useEffect(() => {
        if (query.length === 0) {
            setResultados(todosLosJuegos);
            return;
        }

        const filtered = todosLosJuegos.filter(juego =>
            juego.nombre.toLowerCase().includes(query.toLowerCase())
        );
        setResultados(filtered);
    }, [query, todosLosJuegos]);

    // Componente para la Tarjeta de Juego (Mejora: reusar esta tarjeta)
    const GameCard = ({ juego }) => (
        <div className="col-md-4 mb-3">
            <div className="card h-100">
                {/* Nota: Usamos juego.imagen si existe, sino, una imagen por defecto */}
                <img src={juego.imagen || '/static/img/default.jpg'} className="card-img-top" alt={juego.nombre} />
                <div className="card-body">
                    <h5 className="card-title">{juego.nombre}</h5>
                    <p className="card-text">Precio: ${juego.precio ? juego.precio.toFixed(2) : 'N/A'}</p>
                    {/* Se puede añadir un botón de "Agregar al Carrito" aquí si es necesario */}
                </div>
            </div>
        </div>
    );

    return (
        <div className="container pt-5 mt-3">
            <h2>Buscar Juegos</h2>
            
            <input 
                type="text" 
                id="searchInput" 
                className="form-control" 
                placeholder="Buscar por nombre..."
                value={query} // Vincula el valor del input al estado 'query'
                onChange={(e) => setQuery(e.target.value)} // Actualiza el estado al escribir
            />
            
            <div id="results" className="row mt-4">
                {resultados.length > 0 ? (
                    // Mapea los resultados filtrados
                    resultados.map((juego, index) => (
                        <GameCard key={index} juego={juego} />
                    ))
                ) : (
                    // Muestra un mensaje si no hay resultados
                    <p>No se encontraron juegos que coincidan con "{query}".</p>
                )}
            </div>
        </div>
    );
};

export default Buscador;