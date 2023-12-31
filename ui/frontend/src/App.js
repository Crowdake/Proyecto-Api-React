import './App.css';

import {Refaccion} from './Refaccion';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import { Carros } from './Carros';
import { Categoria } from './Categoria';
import { Marca } from './Marca';
import { Servicio } from './Servicio';
import { Home } from './Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Refaccionaria UPA
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Inicio
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/refaccion">
              Refacciones
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/carro">
              Carros
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/categoria">
              Categorías
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/marca">
              Marcas
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/servicio">
              Servicios
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/refaccion' component={Refaccion}/>
        <Route path='/carro' component={Carros}/>
        <Route path='/categoria' component={Categoria}/>
        <Route path='/marca' component={Marca}/>
        <Route path='/servicio' component={Servicio}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
