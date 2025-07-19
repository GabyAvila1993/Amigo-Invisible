export function sortear(participantes) {
  const nombres = [...participantes];
  const receptores = [...participantes];

  let intentos = 0;
  while (intentos < 1000) {
    const copiaReceptores = [...receptores];
    const asignaciones = {};
    let exitoso = true;

    for (let persona of nombres) {
      const posibles = copiaReceptores.filter(nombre => nombre !== persona);

      if (posibles.length === 0) {
        exitoso = false;
        break;
      }

      const elegido = posibles[Math.floor(Math.random() * posibles.length)];
      asignaciones[persona] = elegido;
      copiaReceptores.splice(copiaReceptores.indexOf(elegido), 1);
    }

    if (exitoso) return asignaciones;
    intentos++;
  }

  return null;
}
