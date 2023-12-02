import { ScaleBand, ScaleLinear } from 'd3-scale'
import { format } from 'd3'
import { Bucket, ChartAttrs } from '../../utils/interfaces'
import { isLinearScale } from '../../utils/utils'
import './styles.css'

interface AxisProps {
  scale: ScaleLinear<number, number, never> | ScaleBand<string>
  buckets: Bucket[]
  attrs: ChartAttrs
  label: string
}

const BottomAxis = ({ scale, buckets, attrs, label }: AxisProps) => {
  const f = format(',')
  const calcW = attrs.width - attrs.margin.right - attrs.margin.left
  return (
    <g className="axis x-axis" transform={`translate(0, ${attrs.height - attrs.margin.bottom})`}>
      <line x1={0} y1={0} x2={calcW} y2={0}></line>
      <text className="label" x={calcW / 2} y={attrs.margin.bottom - 15}>
        {label}
      </text>
      {isLinearScale(scale)
        ? scale.ticks().map((tick, i) => (
            <g key={i} transform={`translate(${scale(tick)}, 0)`}>
              <text x={-10}>{f(tick)}</text>
            </g>
          ))
        : buckets.map((d, i) => (
            <g key={i} transform={`translate(${scale.step() * (i + 1)}, 0)`}>
              <text x={-8} y={-scale.bandwidth() / 2}>
                {scale.bandwidth() > 10 ? d.name : ''}
              </text>
            </g>
          ))}
    </g>
  )
}

export default BottomAxis
