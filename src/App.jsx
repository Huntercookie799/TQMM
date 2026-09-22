import { useState, useEffect } from 'react'
import { Flower2, Heart, Eye, EyeOff, Check, ChevronRight } from 'lucide-react'
import './index.css'

const STORAGE_KEY = "paraEli_mensajes_v1";

const mensajesPorDia = {
  0: "Domingo de descanso, pero mi cabeza sigue pensando en ti. Eres mi lugar favorito para no hacer nada.",
  1: "Lunes dificil, pero pensar en ti lo hace mas facil. Empezar la semana sabiendo que existes ya es una buena noticia.",
  2: "Martes cualquiera, momento perfecto para recordarte que me encantas muchisimo.",
  3: "A la mitad de la semana y sigo sin cansarme de pensar en ti. Eso ya dice mucho.",
  4: "Jueves: falta poquito para verte y ya lo estoy contando en horas, no en dias.",
  5: "Viernes, por fin. Y lo unico que quiero es que estes cerca para celebrarlo juntos.",
  6: "Sabado, el mejor dia para consentirte como te mereces. ¿Lista para nuestra cita?"
};

const bancoExtra = [
  "Eres de lo mejor que me ha pasado, sin exagerar.",
  "Me encantas muchisimo, incluso en tus dias de mal humor.",
  "Cada mensaje tuyo me cambia el dia, aunque sea uno solo.",
  "Contigo hasta lo aburrido se vuelve mi momento favorito.",
  "No necesito una fecha especial para decirte que me gustas mucho.",
  "Eres la razon por la que reviso el celular con una sonrisa.",
  "Quiero muchos dias normales contigo, no solo los especiales.",
  "Tu risa es de mis sonidos favoritos en el mundo.",
  "Pensar en ti se volvio mi pasatiempo favorito.",
  "Contigo todo se siente mas ligero, mas facil, mas bonito.",
  "Eres mi persona favorita para contarle hasta lo mas tonto.",
  "Me gusta como se siente todo cuando estas cerca.",
  "No hay prisa, pero contigo si quiero todo: lo simple y lo grande.",
  "Gracias por hacer que lo cotidiano se sienta especial.",
  "Si pudiera regalarte un campo de flores amarillas, lo haria hoy mismo.",
  "Eres mi excusa favorita para sonreir solo, como tonto, viendo el celular.",
  "Contigo aprendi que querer bien tambien se siente tranquilo.",
  "Me quedo con los detalles pequeños que compartimos, todos.",
  "Quiero seguir sumando dias buenos contigo.",
  "Eres, sin duda, mi mejor decision reciente."
];

function hoy() { return new Date(); }
function claveDia(fecha) {
  return fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
}

function cargarEstado() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { historial: [], extraVistos: [] };
    return JSON.parse(raw);
  } catch {
    return { historial: [], extraVistos: [] };
  }
}

function guardarEstado(estado) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  } catch {}
}

function App() {
  const [estado, setEstado] = useState(cargarEstado());
  const [mensajeActual, setMensajeActual] = useState(null);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  useEffect(() => {
    guardarEstado(estado);
  }, [estado]);

  const elegirMensajeExtra = (dow, key) => {
    const noVistos = bancoExtra.filter((_, idx) => !estado.extraVistos.includes(idx));
    let idx;
    let nuevosExtraVistos = [...estado.extraVistos];
    
    if (noVistos.length === 0) {
      nuevosExtraVistos = [];
      idx = Math.floor(Math.random() * bancoExtra.length);
    } else {
      const candidato = noVistos[Math.floor(Math.random() * noVistos.length)];
      idx = bancoExtra.indexOf(candidato);
    }
    
    nuevosExtraVistos.push(idx);
    
    return { 
      msg: { texto: bancoExtra[idx], dow, clave: key, tipo: "extra" },
      nuevosExtraVistos 
    };
  };

  const elegirMensajeDelDia = () => {
    const f = hoy();
    const dow = f.getDay();
    const key = claveDia(f);
    const yaVistoHoy = estado.historial.some(h => h.clave === key && h.tipo === "dia");
    
    if (!yaVistoHoy) {
      return { 
        msg: { texto: mensajesPorDia[dow], dow, clave: key, tipo: "dia" },
        nuevosExtraVistos: estado.extraVistos 
      };
    }
    
    return elegirMensajeExtra(dow, key);
  };

  const mostrarMensaje = () => {
    const { msg, nuevosExtraVistos } = elegirMensajeDelDia();
    
    setMensajeActual(msg);
    
    setEstado(prev => ({
      historial: [...prev.historial, {
        texto: msg.texto,
        dow: msg.dow,
        clave: msg.clave,
        fecha: hoy().toLocaleDateString("es-MX"),
        tipo: msg.tipo
      }],
      extraVistos: nuevosExtraVistos
    }));
  };

  const esDiaDesbloqueado = (i) => {
    const fechaDia = new Date(2026, 8, 20 + i);
    const fechaHoy = hoy();
    fechaHoy.setHours(0, 0, 0, 0);
    return fechaHoy >= fechaDia;
  };

  const mostrarMensajeAnterior = (dow) => {
    if (!esDiaDesbloqueado(dow)) return;
    setMensajeActual({
      texto: mensajesPorDia[dow],
      dow: dow,
      tipo: "dia"
    });
  };

  const etiquetasDias = ["D", "L", "M", "M", "J", "V", "S"];
  const diaHoy = hoy().getDay();
  const diasNombres = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  return (
    <>
      <div className="dreamland-bg">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
        <div className="hill hill-1"></div>
        <div className="hill hill-2"></div>
        <div className="hill hill-3"></div>
        <div className="fence fence-left"></div>
        <div className="fence fence-right"></div>
        <div className="bush bush-left"></div>
        <div className="bush bush-right"></div>
        <div className="field-flower field-flower-1"></div>
        <div className="field-flower field-flower-2"></div>
        <div className="field-flower field-flower-3"></div>
        <div className="field-flower field-flower-4"></div>
      </div>
      
      <div className="container">
        <div className="card">
        <img src="/kirby.png" className="kirby-sprite" alt="Kirby" />
        
        <div className="pixel-strip">
          <span></span><span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>

        <div className="blocks">
          <div></div><div></div><div></div><div></div><div></div>
        </div>

        <div className="title-wrap">
          <Flower2 className="title-flower" size={34} />
          <h1>
            FLORES<br/>
            AMARILLAS
          </h1>
          <Flower2 className="title-flower" size={34} />
        </div>
        <p className="intro-copy">Dicen que las flores amarillas se dan como símbolo de que el amor se queda para siempre. Cada día de esta semana tengo algo nuevo que decirte, <span className="ending"><span className="highlight">tú.</span> <Heart size={18} fill="currentColor" className="inline-heart" /></span></p>

        <div className="week">
          {etiquetasDias.map((etiqueta, i) => (
            <div 
              key={i} 
              className={`slot ${esDiaDesbloqueado(i) ? 'unlocked' : ''} ${i === diaHoy ? 'today' : ''}`}
              onClick={() => mostrarMensajeAnterior(i)}
            >
              {etiqueta}
              {esDiaDesbloqueado(i) && (
                <Check 
                  size={18} 
                  strokeWidth={4}
                  className="slot-check"
                />
              )}
            </div>
          ))}
        </div>

        <button className="btn pink" onClick={mostrarMensaje}>
          <span className="btn-content"><Heart size={22} fill="currentColor" /> PRESIONA AQUÍ <Heart size={16} fill="currentColor" /></span>
          <span className="btn-arrow"><ChevronRight size={34} strokeWidth={3.5} /></span>
        </button>
        <button className="btn blue" onClick={() => setMostrarHistorial(!mostrarHistorial)}>
          <span className="btn-content">
            {mostrarHistorial ? <EyeOff size={22} /> : <Eye size={22} />}
            {mostrarHistorial ? "OCULTAR MENSAJES" : "VER MENSAJES"}
          </span>
          <span className="btn-arrow"><ChevronRight size={34} strokeWidth={3.5} /></span>
        </button>

        {mensajeActual && (
          <div className="message-box">
            <strong>{mensajeActual.tipo === "dia" ? "MENSAJE DE HOY:" : "MENSAJE EXTRA:"}</strong>
            <p>{mensajeActual.texto}</p>
          </div>
        )}

        <div className="counter">
          <Flower2 size={22} /> MENSAJES DESCUBIERTOS: <strong>{estado.historial.length}</strong> <Flower2 size={22} />
        </div>

        {mostrarHistorial && (
          <div className="history">
            {estado.historial.length === 0 ? (
              <div className="history-item">Todavia no hay mensajes guardados. Presiona el boton de arriba.</div>
            ) : (
              [...estado.historial].reverse().map((h, index) => (
                <div key={index} className="history-item">
                  <span>{diasNombres[h.dow]} - {h.fecha}</span>
                  {h.texto}
                </div>
              ))
            )}
          </div>
        )}

        <div className="footer">
          <div className="footer-strip footer-strip-left"></div>
          <span>HECHO CON</span> 
          <Heart size={16} fill="currentColor" /> 
          <span>PARA TI</span>
          <div className="footer-strip footer-strip-right"></div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
