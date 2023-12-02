import { HierarchyRectangularNode } from 'd3'
import { Bucket, DashboardItemDefinition, Song, tTipAttrs } from '../../utils/interfaces'
import { mouseOut, mouseOver } from '../../utils/utils'

interface TreeRectsProps {
  rects: HierarchyRectangularNode<unknown>[] | undefined
  onSelect: (songs: Song[]) => void
  selected: Song[]
  setTTipAttrs: (value: React.SetStateAction<tTipAttrs>) => void
  options: DashboardItemDefinition
}

const TreeRects = ({ rects, onSelect, selected, options, setTTipAttrs }: TreeRectsProps) => {
  return (
    <>
      {rects &&
        rects.map((rect, i) => {
          let maxChar = (rect.x1 - rect.x0) / 20
          let txt: string = String((rect.data as Bucket).name)
          txt = txt.length > maxChar ? txt.substring(0, maxChar) : txt
          return (
            <g className="group-container" key={i}>
              <rect
                className="bucket"
                x={rect.x0}
                y={rect.y0}
                width={rect.x1 - rect.x0}
                height={rect.y1 - rect.y0}
                onClick={() => onSelect((rect.data as Bucket).children)}
                onMouseEnter={(e) => {
                  mouseOver(e, rect.data as Song, setTTipAttrs, options)
                  onSelect((rect.data as Bucket).children)
                }}
                onMouseLeave={() => {
                  mouseOut(setTTipAttrs)
                  onSelect([])
                }}
              ></rect>
              {rect.children &&
                rect.children.map((child, i) => {
                  return (
                    <rect
                      key={i}
                      className={`single ${selected.includes(child.data as Song)}`}
                      x={child.x0}
                      y={child.y0}
                      width={child.x1 - child.x0}
                      height={child.y1 - child.y0}
                    ></rect>
                  )
                })}
              <text className="tree-label label" x={rect.x0 + 10} y={rect.y0 + 35}>
                {txt}
              </text>
            </g>
          )
        })}
    </>
  )
}

export default TreeRects
