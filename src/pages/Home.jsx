import React, { useState, useEffect } from 'react';
import { initialJuegosFijos } from '../data/juegos'; // Importa la matriz de datos

const Home = () => {
    const [juegos, setJuegos] = useState(initialJuegosFijos);

    // Cargar juegos subidos y combinarlos al montar el componente (simula tu script)
    useEffect(() => {
        const juegosSubidos = JSON.parse(localStorage.getItem('juegosSubidos')) || [];
        const todosLosJuegos = [...initialJuegosFijos, ...juegosSubidos];
        setJuegos(todosLosJuegos);
    }, []);

    // La lógica de "Agregar al carrito"
    const agregarAlCarrito = (juego) => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        // Clonamos el objeto para no tener referencias mutables si se necesita
        carrito.push({...juego}); 
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`${juego.nombre} agregado al carrito`);
    };

    // Componente interno para el Carrusel
    const Carousel = () => (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        {/* Asume que banner1.jpg está en /public/static/img/ */}
                        <img src="/static/img/banner1.jpg" className="d-block w-100" alt={`Slide ${index + 1}`} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>¡Bienvenido a la mejor plataforma de videojuegos del mundo!</h5>
                            <p>Ten un vistazo de nuestros mejores juegos indie</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Controles y botones del carrusel, adaptados a JSX */}
        </div>
    );

    return (
        <main>
            <Carousel />
            <hr />
            <div style={{ backgroundColor: 'rgba(125, 179, 226, 0.9)' }}>
                <h1 id="tituloHome" style={{ textAlign: 'center' }}>Bienvenido</h1>
            </div>

            <div className="container text-center my-5">
                <h1 style={{ color: 'rgb(0, 0, 0)' }}>Juegos Indie que podrian gustarte:</h1>
                <p style={{ color: 'rgb(0, 0, 0)' }} className="lead">Explora nuestra selección de juegos indie únicos y emocionantes</p>
            </div>

            <div className="container">
                <div id="galeria-juegos" className="row row-cols-1 row-cols-md-3 g-4">
                    {juegos.map((juego, index) => (
                        <div className="col" key={index}>
                            <div className="card h-100 shadow-sm">
                                <img src={juego.imagen} className="card-img-top" alt={juego.nombre} />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{juego.nombre}</h5>
                                    <p className="card-text">${juego.precio.toFixed(2)}</p>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => agregarAlCarrito(juego)}
                                    >
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Home;