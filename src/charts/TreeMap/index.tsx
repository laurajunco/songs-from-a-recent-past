import { useState } from 'react'
import { Bucket, ChartAttrs, chartProps } from '../../utils/interfaces'
import Tooltip from '../../components/Tooltip'
import './styles.css'
import { getBuckets } from '../../utils/utils'
import { hierarchy, treemap } from 'd3'
import TreeRects from './TreeRects'
import ChartContainer from '../ChartContainer'

const TreeMap = ({ options, data, onSelect, selected }: chartProps) => {
  const [tTipAttrs, setTTipAttrs] = useState({
    x: 0,
    y: 0,
    show: false,
    content: '',
  })

  const chartAttrs: ChartAttrs = {
    margin: {
      top: 15,
      right: 0,
      bottom: 0,
      left: 0,
    },
    width: 1000,
    height: 700,
  }

  const buckets = getBuckets(options.x, data)
  const root: { name: string; children: Bucket[] } = { name: 'root', children: buckets }

  let tree = treemap()
    .size([
      chartAttrs.width - chartAttrs.margin.left - chartAttrs.margin.right,
      chartAttrs.height - chartAttrs.margin.top - chartAttrs.margin.bottom,
    ])
    .paddingInner(0)
    .paddingOuter(8)

  let nodes = hierarchy(root).sum((d) => (d.children ? 0 : 1))
  const rects = tree(nodes).children

  return (
    <>
      <ChartContainer attrs={chartAttrs}>
        <TreeRects
          rects={rects}
          selected={selected}
          onSelect={onSelect}
          setTTipAttrs={setTTipAttrs}
          options={options}
        />
      </ChartContainer>
      <Tooltip attrs={tTipAttrs} />
    </>
  )
}

export default TreeMap
