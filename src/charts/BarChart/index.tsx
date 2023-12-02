import { useState } from 'react'
import { ChartAttrs, chartProps } from '../../utils/interfaces'
import { scaleLinear, max, scaleBand } from 'd3'
import Tooltip from '../../components/Tooltip'
import { getBuckets } from '../../utils/utils'
import LeftAxis from '../LeftAxis/Index'
import BottomAxis from '../BottomAxis/Index'
import Bars from './Bars'
import ChartContainer from '../ChartContainer'

const BarChart = ({ options, data, onSelect, selected }: chartProps) => {
  const [tTipAttrs, setTTipAttrs] = useState({
    x: 0,
    y: 0,
    show: false,
    content: '',
  })

  const chartAttrs: ChartAttrs = {
    margin: {
      top: 15,
      right: 15,
      bottom: 210,
      left: 80,
    },
    width: 1000,
    height: 700,
  }

  const buckets = getBuckets(options.x, data)
  const maxData = max(buckets, (d) => d.children.length)

  const y = scaleLinear()
    .domain([0, maxData ? maxData : 0])
    .range([chartAttrs.height - chartAttrs.margin.bottom, chartAttrs.margin.top])

  const x = scaleBand()
    .domain(buckets.map((d) => String(d.name)))
    .range([chartAttrs.margin.left, chartAttrs.width - chartAttrs.margin.right])
    .padding(0.2)

  return (
    <>
      <ChartContainer attrs={chartAttrs}>
        <LeftAxis scale={y} attrs={chartAttrs} label="# of songs" />
        <BottomAxis scale={x} attrs={chartAttrs} buckets={buckets} label={options.x} />
        <Bars
          x={x}
          y={y}
          buckets={buckets}
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

export default BarChart
