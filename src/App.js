// src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  const calcularIMC = (event) => {
    event.preventDefault();

    let alturaEmMetros = altura.replace(",", ".");
    let alturaMetros = parseFloat(alturaEmMetros);

    if (alturaMetros < 3) {
      alturaMetros *= 100; 
    }

    const pesoKg = parseFloat(peso);

    if (!alturaMetros || !pesoKg || alturaMetros <= 0 || pesoKg <= 0) {
      setErro("Por favor, insira valores válidos para altura e peso.");
      setResultado(null);
      return;
    }

    if (pesoKg < 20 || pesoKg > 300) {
      setErro("O peso deve estar entre 20kg e 300kg.");
      setResultado(null);
      return;
    }

    setErro(""); 

    const imc = pesoKg / (alturaMetros / 100) ** 2;


    let classificacao = "";
    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc >= 18.5 && imc < 24.9) classificacao = "Peso normal";
    else if (imc >= 25 && imc < 29.9) classificacao = "Sobrepeso";
    else classificacao = "Obesidade";

    setResultado({ imc: imc.toFixed(2), classificacao });
  };

  return (
    <div className="App">
      <h1>Calculadora de IMC</h1>
      <form onSubmit={calcularIMC}>
        <div className="input-group">
          <label>Altura (m):</label>
          <input
            type="text"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Ex: 1,70"
            required
            className={erro ? "input-error" : ""}
          />
        </div>
        <div className="input-group">
          <label>Peso (kg):</label>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Ex: 70"
            required
            className={erro ? "input-error" : ""}
          />
        </div>
        <button type="submit">Calcular IMC</button>
      </form>

      <div className={`erro-container ${erro ? "show" : ""}`}>
        {erro && <p className="erro">{erro}</p>}
      </div>

      {resultado && (
        <div className="resultado animate__animated animate__fadeIn">
          <h2>Resultado</h2>
          <p>IMC: {resultado.imc}</p>
          <p>Classificação: {resultado.classificacao}</p>
        </div>
      )}
    </div>
  );
}

export default App;
