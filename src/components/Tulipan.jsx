// Un tulipán en coordenadas locales: la base del tallo en (0,0) y la flor
// creciendo hacia y negativo. Quien lo usa decide dónde plantarlo.

export const PETALO = 'M0,0 C-9,-8 -11.5,-24 -6,-35 C-3.5,-39.5 3.5,-39.5 6,-35 C11.5,-24 9,-8 0,0 Z'
export const PETALO_CENTRO = 'M0,0 C-8.5,-9 -11,-27 -5.5,-39 C-3,-43.5 3,-43.5 5.5,-39 C11,-27 8.5,-9 0,0 Z'
const HOJA = 'M0,0 C-13,-11 -20,-33 -17,-54 C-8,-41 -2,-20 0,0 Z'

export default function Tulipan({
  alto = 150,
  escala = 1,
  inclinacion = 0,
  retraso = 0,
  abierto = 15,
  inclinado = false,
  onTocar,
}) {
  return (
    <g transform={`rotate(${inclinacion}) scale(${escala})`}>
      <g
        className={`tulipan${inclinado ? ' esta-inclinado' : ''}`}
        style={{ '--d': `${retraso}s`, '--caida': `${alto}px` }}
        onPointerDown={onTocar}
      >
        <path
          className="tallo"
          d={`M0,0 C3,${-alto * 0.34} -3,${-alto * 0.68} 0,${-alto}`}
          fill="none"
        />

        <g className="hoja" transform={`translate(0,${-alto * 0.3})`}>
          <path d={HOJA} />
        </g>
        <g
          className="hoja hoja--tarde"
          transform={`translate(0,${-alto * 0.48}) scale(-0.82,0.82)`}
        >
          <path d={HOJA} />
        </g>

        <g className="flor" transform={`translate(0,${-alto})`}>
          <g transform={`rotate(${-abierto})`}>
            <path className="petalo petalo--fuera" d={PETALO} />
          </g>
          <g transform={`rotate(${abierto})`}>
            <path className="petalo petalo--fuera" d={PETALO} />
          </g>
          <path className="petalo petalo--centro" d={PETALO_CENTRO} />
          <path className="petalo-suelto" d={PETALO} />
        </g>
      </g>
    </g>
  )
}
