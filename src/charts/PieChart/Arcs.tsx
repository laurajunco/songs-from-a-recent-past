import { Arc, DefaultArcObject } from 'd3-shape'
import { ChartAttrs, DashboardItemDefinition, Song, tTipAttrs } from '../../utils/interfaces'
import { mouseOut, mouseOver } from '../../utils/utils'

interface ArcsProps {
  arc: Arc<any, DefaultArcObject>
  data: any[]
  attrs: ChartAttrs
  radius: number
  isBucket: boolean
  onSelect: (songs: Song[]) => void
  selected: Song[]
  setTTipAttrs: (value: React.SetStateAction<tTipAttrs>) => void
  options: DashboardItemDefinition
}

const Arcs = ({
  data,
  arc,
  radius,
  attrs,
  isBucket,
  onSelect,
  selected,
  options,
  setTTipAttrs,
}: ArcsProps) => {
  return (
    <g className={`pie-container`} transform={`translate(${attrs.width / 2},${attrs.height / 2})`}>
      {data.map((b, i, arr) => {
        const step = isBucket ? b.children.length : 1
        const totalBCount = arr.reduce(
          (acc, b) => (isBucket ? acc + b.children.length : acc + 1),
          0
        )
        const prevBCount = arr
          .slice(0, i)
          .reduce((acc, b) => (isBucket ? acc + b.children.length : acc + 1), 0)

        const startAngle: number = (Math.PI * 2 * prevBCount) / totalBCount
        const endAngle: number = (Math.PI * 2 * (prevBCount + step)) / totalBCount
        const midAngle = (startAngle + endAngle) / 2 + (3 * Math.PI) / 2
        const pos = [radius * 1.1 * Math.cos(midAngle), radius * 1.1 * Math.sin(midAngle)]
        const labelAnchor = (startAngle + endAngle) / 2 < Math.PI ? 'start' : 'end'

        return (
          <g key={i}>
            <path
              className={`${isBucket ? 'bucket' : 'single'} ${selected.includes(b)}`}
              onMouseEnter={(e) => {
                mouseOver(e, b, setTTipAttrs, options)
                if (isBucket) onSelect(b.children)
              }}
              onMouseLeave={() => {
                mouseOut(setTTipAttrs)
                onSelect([])
              }}
              d={`${arc({
                innerRadius: radius * 0.5,
                outerRadius: radius,
                startAngle: startAngle,
                endAngle: endAngle,
              })}`}
            />

            {isBucket && endAngle - startAngle > Math.PI / 30 && (
              <text className="label" style={{ textAnchor: labelAnchor }} x={pos[0]} y={pos[1]}>
                {b.name}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}

export default Arcs
