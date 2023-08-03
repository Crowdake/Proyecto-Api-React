import React, { Component, setState } from 'react';
import HomeCarousel from './components/homecarousel';
import { variables } from './Variables';
import { Card } from 'react-bootstrap';

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

    render() {
        const {
            carros,

        } = this.state;
        return (
            <div className='mb-3'>
                <HomeCarousel />
                <h3 className='m-5'>Nuestros autos más recientes</h3>
                <div className='d-flex flex-row gap-4'>
                    {carros.map(carro =>
                        <Card key={carro.iD_Carro} style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title>{carro.modelo}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">${carro.precio_Base}</Card.Subtitle>
                          <Card.Text>
                            {carro.anio}
                          </Card.Text>
                          <Card.Link href="#">{carro.iD_Carro}</Card.Link>
                          <Card.Link href="#">{carro.iD_Marca}</Card.Link>
                        </Card.Body>
                      </Card>
                        )}
                </div>
            </div>
        )
    }
}