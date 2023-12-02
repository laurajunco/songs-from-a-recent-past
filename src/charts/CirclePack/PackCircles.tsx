import { HierarchyCircularNode } from 'd3'
import { Bucket, DashboardItemDefinition, Song, tTipAttrs } from '../../utils/interfaces'
import { mouseOut, mouseOver } from '../../utils/utils'

interface PackCirclesProps {
  circles: HierarchyCircularNode<unknown>[] | undefined
  onSelect: (songs: Song[]) => void
  selected: Song[]
  setTTipAttrs: (value: React.SetStateAction<tTipAttrs>) => void
  options: DashboardItemDefinition
}

const PackCircles = ({ circles, onSelect, selected, options, setTTipAttrs }: PackCirclesProps) => {
  return (
    <>
      {circles &&
        circles.map((circle, i) => {
          let maxChar = circle.r / 10
          let txt: string = String((circle.data as Bucket).name)
          txt = txt.length > maxChar ? txt.substring(0, maxChar) : txt
          return (
            <g className="group-container pack" key={i}>
              <circle
                className="bucket"
                r={circle.r}
                transform={`translate(${circle.x}, ${circle.y})`}
                onMouseEnter={(e) => {
                  mouseOver(e, circle.data as Song, setTTipAttrs, options)
                  onSelect((circle.data as Bucket).children)
                }}
                onMouseLeave={() => {
                  mouseOut(setTTipAttrs)
                  onSelect([])
                }}
              ></circle>
              {circle.children &&
                circle.children.map((child, i) => (
                  <circle
                    key={i}
                    r={child.r}
                    className={`single ${selected.includes(child.data as Song)}`}
                    transform={`translate(${child.x}, ${child.y})`}
                  ></circle>
                ))}
              <text className="pack-label label" x={circle.x} y={circle.y}>
                {txt}
              </text>
            </g>
          )
        })}
    </>
  )
}

export default PackCircles
