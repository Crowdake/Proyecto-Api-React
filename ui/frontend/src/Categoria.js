import React, { Component } from 'react';
import { variables } from './Variables.js';
import axios from 'axios';

export class Categoria extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categorias: [],
            modalTitle: "",
            iD_Categoria: 0,
            nombre_Categoria: "",
            descripcion_Categoria: "",
            searchQuery: "",
        }
    }


    searchCategoria = async () => {
        const { searchQuery } = this.state;
    
        if (searchQuery.trim() === "") {
            this.refreshList();
        } else {
            // Hacer la solicitud GET a la API para buscar la refacción por ID
            axios
                .get(`http://localhost:5249/api/Categoria/${searchQuery}`)
                .then((response) => {
                    const categoria = response.data;
    
                    if (categoria) {
                        this.setState({
                            categorias: [categoria], // Mostrar solo la refacción encontrada en la lista
                        });
                    } else {
                        alert("Categoría no encontrada");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("Algo falló en la búsqueda");
                });
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchQuery !== this.state.searchQuery && this.state.searchQuery.trim() === "") {
            this.refreshList();
        }
    }

    async refreshList() {


        await fetch(variables.API_URL + 'Categoria')
            .then(response => response.json())
            .then(data => {
                this.setState({ categorias: data });
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

    changeSearchQuery = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    changeCategoria = (e) => {
        this.setState({ iD_Categoria: e.target.value });
    }
    changeNombre = (e) => {
        this.setState({ nombre_Categoria: e.target.value });
    }
    changeDescripcion = (e) => {
        this.setState({ descripcion_Categoria: e.target.value });
    }


    addClick() {
        this.setState({
            modalTitle: "Agregar Categoria",
            iD_Categoria: 0,
            nombre_Categoria: "",
            descripcion_Categoria: "",
        });
    }
    editClick(categoria) {
        this.setState({
            modalTitle: "Editar Categoría",
            iD_Categoria: categoria.iD_Categoria,
            nombre_Categoria: categoria.nombre_Categoria,
            descripcion_Categoria: categoria.descripcion_Categoria,

        });
    }

    createClick() {
        fetch(variables.API_URL + 'Categoria', {
            method: 'POST',
            headers: {
                'Accept': 'application/json', // Update the Accept header to accept JSON response
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                iD_Categoria: this.state.iD_Categoria,
                nombre_Categoria: this.state.nombre_Categoria,
                descripcion_Categoria: this.state.descripcion_Categoria,
            })
        })
            .then(response => response.json()) // Parse the response as JSON
            .then(result => {
                if (result) {
                    alert("Categoria agregada con éxito");
                    // Clear input fields after successful addition
                    this.setState({
                        iD_Categoria: 0,
                        nombre_Categoria: "",
                        descripcion_Categoria: "",
                    });
                    // Update the list by fetching the updated data from the backend
                    this.refreshList();
                } else {
                    alert("Error al agregar categoria");
                }
            })
            .catch(error => {
                console.log(error);
                alert('Algo falló');
            });
    }


    updateClick() {
        fetch(variables.API_URL + 'Categoria/' + this.state.iD_Categoria, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json', // Update the Accept header to accept JSON response
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                iD_Categoria: this.state.iD_Categoria,
                nombre_Categoria: this.state.nombre_Categoria,
                descripcion_Categoria: this.state.descripcion_Categoria,

            })
        })
            .then(response => response.json()) // Parse the response as JSON
            .then(result => {
                if (result) {
                    alert("Categoria actualizada con éxito");
                    // Update the list by fetching the updated data from the backend
                    this.refreshList();
                } else {
                    alert("Error al actualizar categoria");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteClick(id) {
        if (window.confirm('¿Seguro de eliminar?')) {
            fetch(variables.API_URL + 'Categoria/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json', // Update the Accept header to accept JSON response
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json()) // Parse the response as JSON
                .then(result => {
                    if (result) {
                        alert("Eliminado con éxito"); // Show success message
                    } else {
                        alert("Error al eliminar"); // Show failure message
                    }
                    this.refreshList();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        const {
            categorias,
            modalTitle,
            iD_Categoria,
            nombre_Categoria,
            descripcion_Categoria,
            searchQuery,
        } = this.state;

        return (
            <div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Buscar Categoría</span>
                    <input
                        type="text"
                        className="form-control"
                        value={searchQuery}
                        onChange={this.changeSearchQuery}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={() => this.searchCategoria()}
                    >
                        Buscar
                    </button>
                </div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Agregar Categoria
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Nombre
                            </th>
                            <th>
                                Descripción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map(categoria =>
                            <tr key={categoria.iD_Categoria}>
                                <td>{categoria.iD_Categoria}</td>
                                <td>{categoria.nombre_Categoria}</td>
                                <td>{categoria.descripcion_Categoria}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(categoria)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(categoria.iD_Categoria)}>
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
                                                value={nombre_Categoria}
                                                onChange={this.changeNombre} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Descripcion</span>
                                            <input type="text" className="form-control"
                                                value={descripcion_Categoria}
                                                onChange={this.changeDescripcion} />
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

                                {iD_Categoria === 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Crear</button>
                                    : null}

                                {iD_Categoria !== 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Actualizar</button>
                                    : null}
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        )
    }
}