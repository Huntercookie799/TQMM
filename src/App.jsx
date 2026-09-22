import { useState, useEffect } from 'react'
import { Flower2, Heart, Eye, EyeOff, Check, ChevronRight, X } from 'lucide-react'
import './index.css'

const STORAGE_KEY = "paraEli_mensajes_v1";

const mensajesPorDia = {
  0: "Nunca he sido el mejor escribiendo, pero contigo me dan ganas de intentarlo de todo corazón. El día que te conocí no imaginé que nuestros caminos iban a cruzarse así, ni que terminarías significando tanto para mí.\n\nNo quiero borrar nada de mi pasado ni fingir que todo empezó de cero; solo quiero decirte que contigo he sentido algo muy real. Te has vuelto mi lugar seguro: donde puedo estar tranquilo, divertirme, hablar sin miedo y sentir que puedo ser yo.",
  1: "A veces me cuesta demostrar cariño, incluso con mi familia, y tú lo sabes mejor que nadie. Pero desde que estás en mi vida he querido aprender a hacerlo mejor, no por obligación, sino porque me nace cuidar lo que siento.\n\nMe has ayudado a ver partes de mí que antes evitaba mirar. Me inspiras a hablar con más honestidad, a intentar sanar cosas pequeñas y grandes, y a no rendirme cuando demostrar amor se me hace difícil.",
  2: "Admiro muchísimo tu forma de ser. Admiro cómo miras a las personas, cómo eres sincera con tus sentimientos y cómo decides ser buena incluso cuando eso requiere esfuerzo.\n\nNo eres especial solo por lo que haces por los demás; eres especial porque eliges hacerlo con intención. Verte esforzarte, tener sueños, equivocarte, levantarte y seguir intentando me inspira de verdad. Me dan ganas de mejorar, de retomar cosas que dejé y de volver a sentirme vivo en mis propios hobbies.",
  3: "Hay algo que me da miedo admitir, pero también me parece bonito: desde que te conocí empecé a preocuparme más por mi salud. Antes la dejaba para después, como si mi cuerpo no importara tanto.\n\nPero ahora pienso en el futuro y me da miedo no estar bien para vivirlo contigo. Ese miedo no es fácil de soltar, pero también me recuerda cuánto te aprecio. Me hace querer cuidarme, estar sano y construir días buenos a tu lado.",
  4: "Me gusta pensar en todo lo que hemos vivido: las citas, las risas, los juegos, las conversaciones largas y esos momentos simples que quizá para otros serían normales, pero para mí se volvieron recuerdos importantes.\n\nDespués de más de 160 días, llegar a ser novios se siente como una forma bonita de decir: sí, aquí quiero estar. No por impulso, no por costumbre, sino porque cada día te fui queriendo más hasta que se volvió imposible no notarlo.",
  5: "Te quiero, te adoro y te aprecio más de lo que a veces sé explicar. Me gusta tu compañía, pero también me gusta la persona que soy cuando estoy contigo: más honesto, más suave, más dispuesto a intentarlo.\n\nGracias por ser ese lugar donde puedo descansar sin dejar de crecer. Gracias por quererme incluso cuando no tengo las palabras perfectas. Si algo quiero demostrarte, es que lo que siento por ti no es pequeño ni pasajero.",
  6: "Si pudiera resumir todo, diría que llegaste a mi vida sin que yo esperara nada y terminaste convirtiéndote en alguien que quiero cuidar con todo mi corazón.\n\nNo prometo ser perfecto, porque no lo soy. Pero sí prometo seguir intentando: quererte mejor, escucharte más, cuidar mi salud, cuidar nuestra relación y construir contigo muchos días normales, bonitos y sinceros. Gracias por cruzarte conmigo de esta forma."
};

const bancoExtra = [
  "No esperaba que fueras a volverte tan importante para mí. Llegaste como llegan las cosas bonitas: sin hacer ruido, sin pedir permiso, y poco a poco te convertiste en alguien que mi corazón reconoce como hogar.",
  "Contigo aprendí que querer también puede sentirse tranquilo. No todo tiene que ser caos o miedo; a veces amar es poder respirar, reír, jugar y sentir que no tengo que fingir ser alguien distinto.",
  "Admiro la manera en que eres sincera con lo que sientes. A veces eso requiere más valentía de la que parece, y verte hacerlo me enseña que también puedo ser más honesto con lo mío.",
  "Gracias por inspirarme a cuidarme. Antes mi salud no me importaba tanto como debería, pero ahora quiero estar bien, quiero tener energía, quiero llegar a muchos futuros posibles contigo.",
  "Me gusta que hayamos construido esto con tiempo. Más de 160 días no son solo una cantidad: son recuerdos, citas, juegos, risas, nervios, detalles y una historia que fue creciendo hasta volverse nuestra.",
  "Sé que no siempre soy bueno demostrando cariño, pero contigo quiero aprender. Quiero que mis actos hablen cuando mis palabras se queden cortas, y que nunca dudes de lo mucho que te quiero.",
  "Eres una inspiración para mí porque no solo sueñas: también te esfuerzas. Ver esa parte tuya me mueve a retomar cosas que dejé, a intentar de nuevo y a creer que puedo mejorar.",
  "Hay momentos contigo que parecen pequeños, pero se quedan conmigo todo el día. Una risa, un mensaje, una partida, una cita, una mirada; contigo lo cotidiano se vuelve especial sin tener que forzarlo.",
  "Me haces querer ser una versión más sana de mí, no por presión, sino porque a tu lado empecé a imaginar un futuro que sí quiero cuidar. Eso significa muchísimo.",
  "Si alguna vez no sé decirlo bonito, quiero que igual lo sepas: te adoro. Te quiero con ternura, con miedo a veces, con ilusión muchas más, y con muchas ganas de seguir construyendo algo sincero contigo.",
  "Gracias por ser mi lugar seguro. No porque tengas que cargar conmigo, sino porque tu forma de querer me hace sentir cómodo, visto y acompañado.",
  "Me gusta pensar que nuestros caminos se cruzaron sin que yo supiera todo lo que venía. Ahora miro hacia atrás y entiendo que cada cita, cada juego y cada conversación nos fue acercando a esto.",
  "Cada vez que jugamos juntos o platicamos de cualquier cosa, me doy cuenta de que mi parte favorita del día siempre termina siendo en la que estás tú.",
  "No necesito borrar mi pasado para saber que lo que he encontrado contigo es de lo más real y bonito que me ha pasado.",
  "Me gusta la tranquilidad que me transmites. Contigo no hay prisa, no hay ansiedad, solo ganas de compartir la vida de la manera más honesta posible.",
  "A veces me quedo pensando en cómo nos fuimos conociendo. Todo empezó despacio y, casi sin darme cuenta, te volviste mi persona favorita.",
  "Me da miedo a veces pensar en el futuro, pero cuando imagino que tú estás en él, el miedo se convierte en ganas de cuidarme y estar sano para vivirlo contigo.",
  "Me encanta que podamos ser nosotros mismos. Que no tenga que pretender ser alguien más y que me aceptes con las cosas que aún me cuesta expresar.",
  "Verte hacer tus cosas, luchar por lo tuyo y ser tan auténtica me motiva más de lo que te imaginas. Eres un ejemplo muy bonito para mí.",
  "Los 160 días que pasaron antes de ser novios me enseñaron que lo mejor se construye con paciencia. No fue un impulso, fue la certeza de que te quiero de verdad.",
  "A veces me descubro sonriendo solo por acordarme de algo que dijiste o de alguna cita que tuvimos. Te has vuelto mi pensamiento recurrente favorito.",
  "Contigo aprendí que el amor no tiene que ser ruidoso ni complicado. Puede ser un ratito de juegos, un mensaje en la mañana y saber que ahí estás.",
  "Quiero seguir coleccionando momentos simples contigo. Esos son los que más se me quedan grabados en la mente y en el corazón.",
  "Saber que te tengo en mi vida hace que hasta los lunes o los días difíciles se sientan un poco más ligeros. Gracias por ser esa luz, Eli.",
  "Me gusta que tengamos nuestro propio mundo. Nuestras bromas, nuestras pláticas y todo eso que nos hace ser nosotros.",
  "Puede que me cueste decir las cosas a veces, pero espero que mis acciones, mis ganas de cuidarme y mi esfuerzo te demuestren cuánto me importas.",
  "Llegaste a mi vida en el momento exacto. Ni antes ni después. Justo a tiempo para enseñarme que podía volver a sentir algo tan sincero y real.",
  "No me importa si el plan es salir o simplemente quedarnos haciendo nada; mi único requisito para pasarla increíble es que estés tú.",
  "Aún me sorprende cómo lograste que me abriera y te contara cosas que ni yo mismo quería ver. Eres mi refugio más bonito.",
  "Si pudiera pedir un deseo, pediría tener la energía y la salud necesarias para acompañarte en todos esos sueños por los que tanto te esfuerzas."
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
  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    guardarEstado(estado);
  }, [estado]);

  useEffect(() => {
    if (!sheet) return undefined;

    const cerrarConEscape = (event) => {
      if (event.key === "Escape") setSheet(null);
    };

    document.addEventListener("keydown", cerrarConEscape);
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [sheet]);

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
    setSheet("message");
    
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
    setSheet("message");
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
        <button className="btn blue" onClick={() => setSheet(sheet === "history" ? null : "history")}>
          <span className="btn-content">
            {sheet === "history" ? <EyeOff size={22} /> : <Eye size={22} />}
            {sheet === "history" ? "OCULTAR MENSAJES" : "VER MENSAJES"}
          </span>
          <span className="btn-arrow"><ChevronRight size={34} strokeWidth={3.5} /></span>
        </button>

        <div className="counter">
          <Flower2 size={22} /> MENSAJES DESCUBIERTOS: <strong>{estado.historial.length}</strong> <Flower2 size={22} />
        </div>

        <div className="footer">
          <div className="footer-strip footer-strip-left"></div>
          <span>HECHO CON</span> 
          <Heart size={16} fill="currentColor" /> 
          <span>PARA TI</span>
          <div className="footer-strip footer-strip-right"></div>
        </div>
      </div>
    </div>

    {sheet && (
      <div className="sheet-overlay" onClick={() => setSheet(null)}>
        <section
          className={`bottom-sheet ${sheet === "history" ? "history-sheet" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-title"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="sheet-handle" aria-hidden="true"></div>
          <button className="sheet-close" onClick={() => setSheet(null)} aria-label="Cerrar">
            <X size={22} strokeWidth={3} />
          </button>

          {sheet === "message" && mensajeActual && (
            <>
              <div className="sheet-kicker">
                <Flower2 size={22} />
                <span>{mensajeActual.tipo === "dia" ? "MENSAJE DE HOY" : "MENSAJE EXTRA"}</span>
                <Flower2 size={22} />
              </div>
              <h2 id="sheet-title">Para ti</h2>
              <div className="sheet-message">
                {mensajeActual.texto.split("\n\n").map((parrafo, index) => (
                  <p key={index}>{parrafo}</p>
                ))}
              </div>
            </>
          )}

          {sheet === "history" && (
            <>
              <div className="sheet-kicker">
                <Flower2 size={22} />
                <span>MENSAJES GUARDADOS</span>
                <Flower2 size={22} />
              </div>
              <h2 id="sheet-title">Tus mensajes</h2>
              <div className="history-list">
                {estado.historial.length === 0 ? (
                  <div className="history-item empty">Todavia no hay mensajes guardados. Presiona el boton rosa.</div>
                ) : (
                  [...estado.historial].reverse().map((h, index) => (
                    <div key={index} className="history-item">
                      <span>{diasNombres[h.dow]} - {h.fecha}</span>
                      {h.texto}
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </section>
      </div>
    )}
    </>
  )
}

export default App
