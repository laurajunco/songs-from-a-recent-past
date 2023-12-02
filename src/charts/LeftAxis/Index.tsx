import { ScaleLinear } from 'd3-scale'
import { format } from 'd3'
import { ChartAttrs } from '../../utils/interfaces'
import './styles.css'

interface AxisProps {
  scale: ScaleLinear<number, number, never>
  attrs: ChartAttrs
  label: string
}

const LeftAxis = ({ scale, attrs, label }: AxisProps) => {
  const f = format(',')
  const calcW = attrs.width - attrs.margin.right - attrs.margin.left
  const calcH = attrs.height - attrs.margin.bottom - attrs.margin.top
  return (
    <g className="axis y-axis" transform={`translate(0, 0)`}>
      <line x1={0} y1={0} x2={0} y2={attrs.height - attrs.margin.bottom}></line>
      <text className="label" y={-attrs.margin.left} x={-(calcH / 2)}>
        {label}
      </text>
      {scale.ticks().map((tick, i) => (
        <g key={i} transform={`translate(0, ${scale(tick)})`}>
          <line x1={calcW} x2={-5} className="tick"></line>
          <text x={-5}>{f(tick)}</text>
        </g>
      ))}
    </g>
  )
}

export default LeftAxis
