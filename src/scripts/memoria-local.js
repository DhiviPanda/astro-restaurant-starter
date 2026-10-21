/**
 * Memoria local reutilizable.
 * localStorage, sin red, sin cuentas, consentimiento explícito.
 * Culebra Lab. MIT.
 */

export function crearMemoria({
  ns = 'app',
  ventanaVisitaMs = 3 * 60 * 60 * 1000, // 3h = misma visita
  maxVisitas = 20,
  minParaFavorito = 2,                   // menos de 2 no es "de siempre"
  clavesExtra = [],                      // se borran con olvidarTodo()
} = {}) {

  const K_HISTORIAL = `${ns}:v1:historial`;
  const K_ACTIVA = `${ns}:v1:memoria-activa`;
  const EVENTO = `${ns}:memoria-cambio`;

  /* ---------- almacenamiento tolerante a fallos ---------- */

  let soporte = null;
  function disponible() {
    if (soporte !== null) return soporte;
    try {
      const t = `${ns}:test`;
      localStorage.setItem(t, '1');
      localStorage.removeItem(t);
      soporte = true;
    } catch {
      soporte = false; // Safari privado, cuota llena, cookies bloqueadas
    }
    return soporte;
  }

  const vacio = () => ({ v: 1, visitas: [] });

  function leer() {
    if (!disponible()) return vacio();
    try {
      const data = JSON.parse(localStorage.getItem(K_HISTORIAL) || 'null');
      if (!data || data.v !== 1 || !Array.isArray(data.visitas)) return vacio();
      return data;
    } catch {
      return vacio();
    }
  }

  function escribir(data) {
    if (!disponible()) return;
    try {
      localStorage.setItem(K_HISTORIAL, JSON.stringify(data));
    } catch {
      /* cuota llena: se ignora, la web sigue funcionando */
    }
    avisar();
  }

  function avisar() {
    document.dispatchEvent(new CustomEvent(EVENTO));
  }

  /* ---------- consentimiento ---------- */

  function activa() {
    return disponible() && localStorage.getItem(K_ACTIVA) === '1';
  }

  function activar(valor = true) {
    if (!disponible()) return;
    if (valor) {
      localStorage.setItem(K_ACTIVA, '1');
    } else {
      localStorage.removeItem(K_ACTIVA);
      localStorage.removeItem(K_HISTORIAL); // apagar es olvidar
    }
    avisar();
  }

  /* ---------- registro ---------- */

  function registrar(id) {
    if (!id || !activa()) return;
    const data = leer();
    const ahora = Date.now();
    const ultima = data.visitas[0];

    if (ultima && ahora - ultima.fin < ventanaVisitaMs) {
      if (!ultima.items.includes(id)) ultima.items.push(id);
      ultima.fin = ahora;
    } else {
      data.visitas.unshift({ inicio: ahora, fin: ahora, items: [id] });
    }

    data.visitas = data.visitas.slice(0, maxVisitas);
    escribir(data);
  }

  function olvidar(id) {
    if (!activa()) return;
    const data = leer();
    data.visitas.forEach(v => { v.items = v.items.filter(x => x !== id); });
    data.visitas = data.visitas.filter(v => v.items.length > 0);
    escribir(data);
  }

  /* ---------- lectura ---------- */

  const visitas = () => leer().visitas;
  const numeroVisitas = () => leer().visitas.length;

  function marcadoAhora(id) {
    const ultima = leer().visitas[0];
    if (!ultima) return false;
    if (Date.now() - ultima.fin >= ventanaVisitaMs) return false;
    return ultima.items.includes(id);
  }

  /** Más repetido primero, desempate por más reciente. */
  function top(limite = 3) {
    const conteo = new Map();
    leer().visitas.forEach((visita, indice) => {
      visita.items.forEach(id => {
        const prev = conteo.get(id) || { id, veces: 0, recencia: Infinity };
        prev.veces += 1;
        prev.recencia = Math.min(prev.recencia, indice); // 0 = más reciente
        conteo.set(id, prev);
      });
    });
    return [...conteo.values()]
      .sort((a, b) => b.veces - a.veces || a.recencia - b.recencia)
      .slice(0, limite);
  }

  function favorito() {
    const mejor = top(1)[0];
    return mejor && mejor.veces >= minParaFavorito ? mejor : null;
  }

  /* ---------- borrado total ---------- */

  function olvidarTodo() {
    if (!disponible()) return;
    [K_HISTORIAL, K_ACTIVA, ...clavesExtra].forEach(k => localStorage.removeItem(k));
    avisar();
  }

  /** Mueve una clave antigua al namespace nuevo. Se ejecuta una vez. */
  function migrarClave(claveVieja, claveNueva) {
    if (!disponible() || !claveVieja) return;
    try {
      const valor = localStorage.getItem(claveVieja);
      if (valor === null) return;
      if (localStorage.getItem(claveNueva) === null) {
        localStorage.setItem(claveNueva, valor);
      }
      localStorage.removeItem(claveVieja);
    } catch { /* nada que hacer */ }
  }

  return {
    disponible, activa, activar,
    registrar, olvidar, marcadoAhora,
    visitas, numeroVisitas, top, favorito,
    olvidarTodo, migrarClave,
    EVENTO,
    claves: { historial: K_HISTORIAL, activa: K_ACTIVA },
  };
}