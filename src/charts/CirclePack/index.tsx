import { useState } from 'react'
import { Bucket, ChartAttrs, chartProps } from '../../utils/interfaces'
import Tooltip from '../../components/Tooltip'
import { getBuckets } from '../../utils/utils'
import { hierarchy, pack } from 'd3'
import './styles.css'
import PackCircles from './PackCircles'
import ChartContainer from '../ChartContainer'

const CirclePack = ({ options, data, onSelect, selected }: chartProps) => {
  const [tTipAttrs, setTTipAttrs] = useState({
    x: 0,
    y: 0,
    show: false,
    content: '',
  })

  const chartAttrs: ChartAttrs = {
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    width: 1000,
    height: 700,
  }

  const buckets = getBuckets(options.x, data)
  const root: { name: string; children: Bucket[] } = { name: 'root', children: buckets }
  const circlePack = pack().size([chartAttrs.width, chartAttrs.height]).padding(8)
  const nodes = hierarchy(root).sum((d) => (d.children ? 0 : 1))
  const circles = circlePack(nodes).children

  return (
    <>
      <ChartContainer attrs={chartAttrs}>
        <PackCircles
          circles={circles}
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

export default CirclePack
