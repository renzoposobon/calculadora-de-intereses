import React, { useState } from 'react';
import './App.css';

function App() {
  const [inversionInicial, setInversionInicial] = useState(0);
  const [tasaInteresMensual, setTasaInteresMensual] = useState(0);
  const [retiroMensual, setRetiroMensual] = useState(0);
  const [numMeses, setNumMeses] = useState(0);
  const [tablaResultados, setTablaResultados] = useState([]);

  const calcularPlazoFijo = (inversionInicial, tasaInteres, retiroMensual, numMeses) => {
    let saldo = inversionInicial;
    const tabla = [];
  
    for (let mes = 1; mes <= numMeses; mes++) {
      const interes = saldo * (tasaInteres / 100);
      saldo += interes - retiroMensual;
      tabla.push([mes, saldo.toFixed(2), interes.toFixed(2)]);
    }
  
    return tabla;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const tabla = calcularPlazoFijo(inversionInicial, tasaInteresMensual, retiroMensual, numMeses);
    setTablaResultados(tabla);
  }

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit} className='form'>
        <label htmlFor="inversionInicial">Inversión inicial:</label>
        <input
          type="text"
          id="inversionInicial"
          value={inversionInicial}
          onChange={(e) => setInversionInicial(parseFloat(e.target.value))}
        />
        <label htmlFor="tasaInteres">Tasa de interés mensual:</label>
        <input
          type="text"
          id="tasaInteres"
          value={tasaInteresMensual}
          onChange={(e) => setTasaInteresMensual(parseFloat(e.target.value))}
        />
        <label htmlFor="retiroMensual">Cuota mensual a pagar:</label>
        <input
          type="text"
          id="retiroMensual"
          value={retiroMensual}
          onChange={(e) => setRetiroMensual(parseFloat(e.target.value))}
        />
        <label htmlFor="numMeses">Cantidad de meses:</label>
        <input
          type="text"
          id="numMeses"
          value={numMeses}
          onChange={(e) => setNumMeses(parseInt(e.target.value))}
        />
        <button type="submit">Calcular</button>
      </form>

      {tablaResultados.length > 0 && (
        <div className='form'>
          <h2>Resultados:</h2>
          <table>
            <thead>
              <tr>
                <th>Mes</th>
                <th>Saldo Total</th>
                <th>Interés Ganado</th>
              </tr>
            </thead>
            <tbody>
              {tablaResultados.map(([mes, saldo, interes]) => (
                <tr key={mes}>
                  <td>{mes}</td>
                  <td>${parseFloat(saldo).toFixed(2)}</td>
                  <td>${parseFloat(interes).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default App;