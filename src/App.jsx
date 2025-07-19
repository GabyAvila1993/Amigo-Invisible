import { useState } from "react";
import emailjs from 'emailjs-com';
import { sortear } from './logic/sorteo.js';
import './App.css';


const SERVICE_ID = 'service_9ixh24e';
const TEMPLATE_ID = 'template_0kf2zoh';
const PUBLIC_KEY = '-vQ1NZ8tKo8a57U6f';

emailjs.init(PUBLIC_KEY);

function App() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [participantes, setParticipantes] = useState([]);
  const [resultado, setResultado] = useState(null);

  const agregarParticipantes = () => {
    if (nombre.trim() && email.trim()) {
      setParticipantes([...participantes, { nombre, email }]);
      setNombre('');
      setEmail('');
    }
  };

  const iniciarSorteo = async () => {
    if (participantes.length < 2) {
      alert('Debe haber al menos 2 participantes');
      return;
    }

    const nombres = participantes.map(p => p.nombre);
    const resultadoSorteo = sortear(nombres);
    if (!resultadoSorteo) {
      alert('No se pudo realizar el sorteo.');
      return;
    }

    setResultado(resultadoSorteo);
    await enviarCorreos(participantes, resultadoSorteo);
  };

  const reinicia = () => {
    setParticipantes([]);
    setResultado(null);
  };

  return (
    <div className="app-conteiner">
      <h1>Amigo Invisible</h1>
      
      <div className="form-section">
        <div className="formulario">
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        
        <div className="buttons-container">
          <button className="boton" onClick={agregarParticipantes}>Agregar</button>
          <button className="boton" onClick={iniciarSorteo}>Iniciar Sorteo</button>
          <button className="boton" onClick={reinicia}>Reiniciar</button>
        </div>
      </div>
      
      <div className="lista">
        <h2>Participantes</h2>
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {participantes.map((p, i) => (
              <tr key={i}>
                <td>{p.nombre}</td>
                <td>{p.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;


const enviarCorreos = async (participantes, resultadoSorteo) => {
  for (const { nombre, email } of participantes) {
    const regalaA = resultadoSorteo[nombre];

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        nombre,
        regalarA: regalaA,
        email,
      }, PUBLIC_KEY);
    } catch (error) {
      console.error(`Error enviando a ${nombre}:`, error?.text || error?.message || error);
    }


  }

  alert('🎉 Correos enviados con éxito.');
};
