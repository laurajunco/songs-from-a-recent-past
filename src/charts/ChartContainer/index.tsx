import { ChartAttrs } from '../../utils/interfaces'

interface ChartContainerProps {
  attrs: ChartAttrs
  children: React.ReactChild | React.ReactChild[]
}

const ChartContainer = ({ attrs, children }: ChartContainerProps) => {
  return (
    <svg viewBox={`0 0 ${attrs.width} ${attrs.height}`}>
      <g transform={`translate(${attrs.margin.left},${attrs.margin.top})`}>{children}</g>
    </svg>
  )
}

export default ChartContainer
