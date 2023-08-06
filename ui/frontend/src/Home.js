import React, { Component } from 'react';
import HomeCarousel from './components/homecarousel';
import { variables } from './Variables';
import { Card, Button } from 'react-bootstrap';


export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            carros: [],
            iD_Carro: 0,
            iD_Marca: 0,
            iD_Categoria: 0,
            modelo: "",
            anio: 0,
            precio_Base: 0,
            hoveredCard: null,
        }
    }

    async refreshList() {
        await fetch(variables.API_URL + 'Carros')
            .then(response => response.json())
            .then(data => {
                this.setState({ carros: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    handleMouseEnter = (iD_Carro) => {
        this.setState({ hoveredCard: iD_Carro });
    }

    handleMouseLeave = () => {
        this.setState({ hoveredCard: null });
    }

    render() {
        const { carros, hoveredCard } = this.state;

        return (
            <div className='mb-3'>
                <HomeCarousel />
                <h3 className='m-5'>Nuestros autos más recientes</h3>
                <div className='d-flex flex-row gap-4'>
                    {carros.map(carro => (
                        <Card
                            key={carro.iD_Carro}
                            style={{
                                width: '18rem',
                                border: 'none',
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                backgroundColor: hoveredCard === carro.iD_Carro ? '#f3daaa' : '#ffffff',
                                transform: hoveredCard === carro.iD_Carro ? 'scale(1.05)' : 'scale(1)',
                                transition: 'transform 0.3s, background-color 0.3s',
                            }}
                            onMouseEnter={() => this.handleMouseEnter(carro.iD_Carro)}
                            onMouseLeave={this.handleMouseLeave}
                        >
                            <Card.Body>
                                <Card.Title
                                    style={{
                                        fontSize: '1.8rem',
                                        fontWeight: 'bold',
                                        marginBottom: '0.5rem',
                                        color: '#080d0d',
                                    }}
                                >
                                    {carro.modelo}
                                </Card.Title>
                                <Card.Subtitle
                                    className="mb-2 text-muted"
                                    style={{
                                        fontSize: '1.2rem',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    ${carro.precio_Base}
                                    
                                </Card.Subtitle>
                                <Card.Text
                                    style={{
                                        fontSize: '1.2rem',
                                        marginBottom: '0.5rem',
                                        color: '#080d0d',
                                    }}
                                >
                                    Año: {carro.anio}
                                </Card.Text>
                                <Card.Text
                                    style={{
                                        fontSize: '1.2rem',
                                        marginBottom: '1rem',
                                        color: '#080d0d',
                                    }}
                                >
                                    Marca: {carro.iD_Marca}
                                </Card.Text>
                                <Card.Text
                                    style={{
                                        fontSize: '1.2rem',
                                        marginBottom: '1rem',
                                        color: '#080d0d',
                                    }}
                                >
                                    Categoría: {carro.iD_Categoria}
                                </Card.Text>
                                <Button
                                    variant="color1"
                                    style={{
                                        backgroundColor: '#b4a68e',
                                        color: '#080d0d',
                                    }}
                                >
                                    
                                    Añadir a favoritos
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }
}
