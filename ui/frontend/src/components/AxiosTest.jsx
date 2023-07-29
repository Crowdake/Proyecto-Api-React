import { useEffect, useState } from "react";
import axios from 'axios';

const AxiosTest = () => {
    const [refacciones, setRefacciones] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7284/api/Refaccion')
            .then(res => {
                setRefacciones(res.data); // Assuming the API returns an array of refacciones
                console.log(res);
            })
            .catch(error => {
                console.error("Error fetching refacciones:", error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Refacciones</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        {/* Add more columns if needed */}
                    </tr>
                </thead>
                <tbody>
                    {refacciones.map(refaccion => (
                        <tr key={refaccion.ID_Refaccion}>
                            <td>{refaccion.ID_Refaccion}</td>
                            <td>{refaccion.Nombre_Refaccion}</td>
                            <td>{refaccion.Descripcion_Refaccion}</td>
                            {/* Add more cells if needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AxiosTest;