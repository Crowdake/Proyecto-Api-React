import React, { Component } from "react";
import { variables } from "./Variables.js";
import axios from "axios";

export class Carros extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carros: [],
            marcas: [],
            modalTitle: "",
            iD_Carro: 0,
            iD_Marca: 0,
            modelo: "",
            anio: 0,
            precio_Base: 0,
        };
    }
    searchCarro = async () => {
        const { searchQuery } = this.state;

        if (searchQuery.trim() === "") {
            this.refreshList();
        } else {
            // Hacer la solicitud GET a la API para buscar la refacción por ID
            axios
                .get(`http://localhost:5249/api/Carros/${searchQuery}`)
                .then((response) => {
                    const carro = response.data;

                    if (carro) {
                        this.setState({
                            carros: [carro], // Mostrar solo la refacción encontrada en la lista
                        });
                    } else {
                        alert("Carros no encontrada");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Algo falló en la búsqueda");
                });
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.searchQuery !== this.state.searchQuery &&
            this.state.searchQuery.trim() === ""
        ) {
            this.refreshList();
        }
    }
    async refreshList() {
        await fetch(variables.API_URL + "Carros")
            .then((response) => response.json())
            .then((data) => {
                this.setState({ carros: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeSearchQuery = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    changeCarro = (e) => {
        this.setState({ iD_Carro: e.target.value });
    };
    changeMarca = (e) => {
        this.setState({ iD_Marca: e.target.value });
    };
    changeModelo = (e) => {
        this.setState({ modelo: e.target.value });
    };
    changeAnio = (e) => {
        this.setState({ anio: e.target.value });
    };
    changePrecio_Base = (e) => {
        this.setState({ precio_Base: e.target.value });
    };

    addClick() {
        this.setState({
            modalTitle: "Add Carros",
            iD_Carro: 0,
            iD_Marca: 0,
            modelo: "",
            anio: 0,
            precio_Base: 0,
        });
    }
    editClick(carro) {
        this.setState({
            modalTitle: "Editar Carros",
            iD_Carro: carro.iD_Carro,
            iD_Marca: carro.iD_Marca,
            modelo: carro.modelo,
            anio: carro.anio,
            precio_Base: carro.precio_Base,
        });
    }

    createClick() {
        fetch(variables.API_URL + "Carros", {
            method: "POST",
            headers: {
                Accept: "application/json", // Update the Accept header to accept JSON response
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                iD_Carro: this.state.iD_Carro,
                iD_Marca: this.state.iD_Marca,
                modelo: this.state.modelo,
                anio: this.state.anio,
                precio_Base: this.state.precio_Base,
            }),
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((result) => {
                if (result) {
                    alert("Carros agregada con éxito");
                    // Clear input fields after successful addition
                    this.setState({
                        iD_Carro: 0,
                        iD_Marca: 0,
                        modelo: "",
                        anio: 0,
                        precio_Base: 0,
                    });
                    // Update the list by fetching the updated data from the backend
                    this.refreshList();
                } else {
                    alert("Error al agregar el Carros");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Algo falló");
            });
    }

    updateClick() {
        fetch(variables.API_URL + "Carros/" + this.state.iD_Carro, {
            method: "PUT",
            headers: {
                Accept: "application/json", // Update the Accept header to accept JSON response
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                iD_Carro: this.state.iD_Carro,
                iD_Marca: this.state.iD_Marca,
                modelo: this.state.modelo,
                anio: this.state.anio,
                precio_Base: this.state.precio_Base,
            }),
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((result) => {
                if (result) {
                    alert("Carros actualizada con éxito");
                    // Update the list by fetching the updated data from the backend
                    this.refreshList();
                } else {
                    alert("Error al actualizar carro");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    deleteClick(id) {
        if (window.confirm("¿Seguro de eliminar?")) {
            fetch(variables.API_URL + "Carros/" + id, {
                method: "DELETE",
                headers: {
                    Accept: "application/json", // Update the Accept header to accept JSON response
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json()) // Parse the response as JSON
                .then((result) => {
                    if (result) {
                        alert("Eliminado con éxito"); // Show success message
                    } else {
                        alert("Error al eliminar"); // Show failure message
                    }
                    this.refreshList();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    render() {
        const {
            carros,
            modalTitle,
            iD_Carro,
            iD_Marca,
            modelo,
            anio,
            precio_Base,
            searchQuery,
        } = this.state;

        return (
            <div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Buscar Carros</span>
                    <input
                        type="text"
                        className="form-control"
                        value={searchQuery}
                        onChange={this.changeSearchQuery}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={() => this.searchCarro()}
                    >
                        Buscar
                    </button>
                </div>
                <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}
                >
                    Add Carros
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Modelo</th>
                            <th>Año</th>
                            <th>Marca</th>
                            <th>Precio base</th>

                        </tr>
                    </thead>
                    <tbody>
                        {carros.map((carro) => (
                            <tr key={carro.iD_Carro}>
                                <td>{carro.iD_Carro}</td>
                                <td>{carro.modelo}</td>
                                <td>{carro.anio}</td>
                                <td>{carro.iD_Marca}</td>
                                <td>{carro.precio_Base}</td>

                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(carro)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil-square"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                            />
                                        </svg>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(carro.iD_Carro)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Modelo</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={modelo}
                                                onChange={this.changeModelo}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Año</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={anio}
                                                onChange={this.changeAnio}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Id Marca</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={iD_Marca}
                                                onChange={this.changeMarca}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Precio_Base</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={precio_Base}
                                                onChange={this.changePrecio_Base}
                                            />
                                        </div>

                                    </div>


                                </div>

                            {iD_Carro === 0 ?
                                <button
                                type="button"
                                className="btn btn-primary float-start"
                                onClick={() => this.createClick()}
                                >
                                    Create
                                </button>
                                : null}

                            {iD_Carro !== 0 ?
                                <button
                                type="button"
                                className="btn btn-primary float-start"
                                onClick={() => this.updateClick()}
                                >
                                    Update
                                </button>
                                : null}

                                </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}