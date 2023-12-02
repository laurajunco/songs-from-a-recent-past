import { useState } from 'react'
import { ChartAttrs, chartProps, Song } from '../../utils/interfaces'
import { arc, descending } from 'd3'
import Tooltip from '../../components/Tooltip'
import { getBuckets } from '../../utils/utils'
import Arcs from './Arcs'
import './styles.css'
import ChartContainer from '../ChartContainer'

const PieChart = ({ options, data, onSelect, selected }: chartProps) => {
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
  const radius = chartAttrs.height * 0.4
  const a = arc()

  data.sort((a, b) => {
    return descending(a[options.x as keyof Song], b[options.x as keyof Song])
  })

  return (
    <>
      <ChartContainer attrs={chartAttrs}>
        <Arcs
          data={data}
          arc={a}
          radius={radius}
          attrs={chartAttrs}
          isBucket={false}
          selected={selected}
          onSelect={onSelect}
          setTTipAttrs={setTTipAttrs}
          options={options}
        />
        <Arcs
          data={buckets}
          arc={a}
          radius={radius}
          attrs={chartAttrs}
          isBucket={true}
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

export default PieChart
