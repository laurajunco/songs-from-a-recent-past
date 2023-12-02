import { ScaleBand, ScaleLinear } from 'd3'
import { Bucket, DashboardItemDefinition, Song, tTipAttrs } from '../../utils/interfaces'
import { mouseOut, mouseOver } from '../../utils/utils'

interface BarsProps {
  y: ScaleLinear<number, number, never>
  x: ScaleBand<string>
  buckets: Bucket[]
  onSelect: (songs: Song[]) => void
  selected: Song[]
  setTTipAttrs: (value: React.SetStateAction<tTipAttrs>) => void
  options: DashboardItemDefinition
}

const Bars = ({ x, y, buckets, onSelect, selected, options, setTTipAttrs }: BarsProps) => {
  return (
    <g transform={`translate(0, 0)`}>
      {buckets.map((b, i) => (
        <g className="group-container" key={i} transform={`translate(${x.step() * (i + 1)}, 0)`}>
          {b.children.map((d, i) => (
            <rect
              key={i}
              className={`single bar ${selected.includes(d)}`}
              width={x.bandwidth()}
              height={y(0) - y(1)}
              x={-x.bandwidth()}
              y={y(i + 1)}
            ></rect>
          ))}
          <rect
            className={`bucket bar`}
            width={x.bandwidth()}
            height={y(0) - y(b.children.length)}
            x={-x.bandwidth()}
            y={y(b.children.length)}
            onMouseEnter={(e) => {
              mouseOver(e, b, setTTipAttrs, options)
              onSelect(b.children as Song[])
            }}
            onMouseLeave={() => {
              mouseOut(setTTipAttrs)
              onSelect([])
            }}
          ></rect>
        </g>
      ))}
    </g>
  )
}

export default Bars
