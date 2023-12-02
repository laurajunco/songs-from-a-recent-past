import { ScaleLinear } from 'd3'
import { DashboardItemDefinition, Song, tTipAttrs } from '../../utils/interfaces'
import { mouseOut, mouseOver } from '../../utils/utils'

interface BarsProps {
  y: ScaleLinear<number, number, never>
  x: ScaleLinear<number, number, never>
  r: ScaleLinear<number, number, never>
  data: Song[]
  onSelect: (songs: Song[]) => void
  selected: Song[]
  setTTipAttrs: (value: React.SetStateAction<tTipAttrs>) => void
  options: DashboardItemDefinition
}

const Circles = ({ x, y, r, data, onSelect, selected, options, setTTipAttrs }: BarsProps) => {
  return (
    <g className="scatter-container" transform={`translate(0, 0)`}>
      {data.map((d, i) => (
        <g
          key={i}
          transform={`translate(${x(+d[options.x as keyof Song])}, ${y(
            +d[options.y as keyof Song]
          )})`}
        >
          <circle
            className={`circle ${selected.includes(d)}`}
            r={r(+d[options.z as keyof Song])}
            onMouseEnter={(e) => {
              mouseOver(e, d, setTTipAttrs, options)
              onSelect([d])
            }}
            onMouseLeave={() => {
              mouseOut(setTTipAttrs)
              onSelect([])
            }}
          ></circle>
        </g>
      ))}
    </g>
  )
}

export default Circles
