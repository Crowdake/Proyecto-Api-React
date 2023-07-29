import React, { Component } from 'react';
import { variables } from './Variables.js';
import axios from 'axios';

export class Refaccion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categorias: [],
            refacciones: [],
            carros: [],
            modalTitle: "",
            iD_Refaccion: 0,
            iD_Carro: 0,
            iD_Categoria: 0,
            nombre_Refaccion: "",
            descripcion_Refaccion: "",
            stock: 0,
            precio: 0,
        }
    }


    async refreshList () {
        

        await fetch(variables.API_URL+'Refaccion')
        .then(response=>response.json())
        .then(data=>{
            this.setState({refacciones:data});
        });
        // fetch(variables.API_URL+'Marca')
        // .then(response=>response.json())
        // .then(data=>{
        //     this.setState({marcas:data});
        // });

        // fetch(variables.API_URL+'Carro')
        // .then(response=>response.json())
        // .then(data=>{
        //     this.setState({carros:data});
        // });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeCarro = (e) => {
        this.setState({ iD_Carro: e.target.value });
    }
    changeCategoria = (e) => {
        this.setState({ iD_Categoria: e.target.value });
    }
    changeNombre = (e) => {
        this.setState({ nombre_Refaccion: e.target.value });
    }
    changeDescripcion = (e) => {
        this.setState({ descripcion_Refaccion: e.target.value });
    }
    changeStock = (e) => {
        this.setState({ stock: e.target.value });
    }
    changePrecio = (e) => {
        this.setState({ precio: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Refaccion",
            iD_Refaccion: 0,
            iD_Carro: 0,
            iD_Categoria: 0,
            nombre_Refaccion: "",
            descripcion_Refaccion: "",
            stock: 0,
            precio: 0,
        });
    }
    editClick(refaccion) {
        this.setState({
            modalTitle: "Editar Refacción",
            iD_Refaccion: refaccion.iD_Refaccion,
            iD_Carro: refaccion.iD_Carro,
            iD_Categoria: refaccion.iD_Categoria,
            nombre_Refaccion: refaccion.nombre_Refaccion,
            descripcion_Refaccion: refaccion.descripcion_Refaccion,
            stock: refaccion.stock,
            precio: refaccion.precio
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Refaccion', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                iD_Refaccion: this.state.iD_Refaccion,
                iD_Carro: this.state.iD_Carro,
                iD_Categoria: this.state.iD_Categoria,
                nombre_Refaccion: this.state.nombre_Refaccion,
                descripcion_Refaccion: this.state.descripcion_Refaccion,
                stock: this.state.stock,
                precio: this.state.precio,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch(variables.API_URL + 'Refaccion/'+this.state.iD_Refaccion, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                iD_Refaccion: this.state.iD_Refaccion,
                iD_Carro: this.state.iD_Carro,
                iD_Categoria: this.state.iD_Categoria,
                nombre_Refaccion: this.state.nombre_Refaccion,
                descripcion_Refaccion: this.state.descripcion_Refaccion,
                stock: this.state.stock,
                precio: this.state.precio,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                console.log(error);
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'Refaccion/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                })
        }
    }

    render() {
        const {
            refacciones,
            modalTitle,
            iD_Refaccion,
            iD_Carro,
            iD_Categoria,
            nombre_Refaccion,
            descripcion_Refaccion,
            precio,
            stock,
        } = this.state;

        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Refaccion
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                iD_Refaccion
                            </th>
                            <th>
                                iD_Carro
                            </th>
                            <th>
                                iD_Categoria
                            </th>
                            <th>
                                DOJ
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {refacciones.map(refaccion =>
                            <tr key={refaccion.iD_Refaccion}>
                                <td>{refaccion.iD_Refaccion}</td>
                                <td>{refaccion.iD_Carro}</td>
                                <td>{refaccion.iD_Categoria}</td>
                                <td>{refaccion.nombre_Refaccion}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(refaccion)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(refaccion.iD_Refaccion)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Nombre</span>
                                            <input type="text" className="form-control"
                                                value={nombre_Refaccion}
                                                onChange={this.changeNombre} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Descripcion</span>
                                            <input type="text" className="form-control"
                                                value={descripcion_Refaccion}
                                                onChange={this.changeDescripcion} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Id Carro</span>
                                            <input type="text" className="form-control"
                                                value={iD_Carro}
                                                onChange={this.changeCarro} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Id Categoria</span>
                                            <input type="text" className="form-control"
                                                value={iD_Categoria}
                                                onChange={this.changeCategoria} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Stock</span>
                                            <input type="text" className="form-control"
                                                value={stock}
                                                onChange={this.changeStock} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Precio</span>
                                            <input type="text" className="form-control"
                                                value={precio}
                                                onChange={this.changePrecio} />
                                        </div>

                                        {/* <div className="input-group mb-3">
            <span className="input-group-text">iD_Categoria</span>
            <select className="form-select"
            onChange={this.changeDepartment}
            value={iD_Categoria}>
                {marcas.map(dep=><option key={dep.DepartmentId}>
                    {dep.DepartmentName}
                </option>)}
            </select>
        </div> */}

                                        


                                    </div>

                                </div>

                                {iD_Refaccion === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {iD_Refaccion !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        )
    }
}