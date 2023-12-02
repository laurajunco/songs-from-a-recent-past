import { useState } from 'react'
import { ChartAttrs, chartProps } from '../../utils/interfaces'
import { scaleLinear, max, min } from 'd3'
import Tooltip from '../../components/Tooltip'
import { getNumericValues } from '../../utils/utils'
import LeftAxis from '../LeftAxis/Index'
import BottomAxis from '../BottomAxis/Index'
import Circles from './Circles'
import './styles.css'
import ChartContainer from '../ChartContainer'

const ScatterPlot = ({ options, data, onSelect, selected }: chartProps) => {
  const [tTipAttrs, setTTipAttrs] = useState({
    x: 0,
    y: 0,
    show: false,
    content: '',
  })

  const valuesX = getNumericValues(options.x, data)
  const valuesY = getNumericValues(options.y, data)
  const valuesZ = getNumericValues(options.z, data)

  const chartAttrs: ChartAttrs = {
    margin: {
      top: 15,
      right: 20,
      bottom: 120,
      left: 100,
    },
    width: 1000,
    height: 700,
  }

  const maxDataX = max(valuesX)
  const maxDataY = max(valuesY)
  const maxDataZ = max(valuesZ)

  const minDataX = min(valuesX)
  const minDataY = min(valuesY)
  const minDataZ = min(valuesZ)

  const y = scaleLinear()
    .domain([minDataY ? minDataY : 0, maxDataY ? maxDataY : 0])
    .range([chartAttrs.height - chartAttrs.margin.bottom, chartAttrs.margin.top])
    .nice()

  const x = scaleLinear()
    .domain([minDataX ? minDataX : 0, maxDataX ? maxDataX : 0])
    .range([0, chartAttrs.width - chartAttrs.margin.right - chartAttrs.margin.left])
    .nice()

  const r = scaleLinear()
    .domain([minDataZ ? minDataZ : 0, maxDataZ ? maxDataZ : 0])
    .range([5, 20])

  return (
    <>
      <ChartContainer attrs={chartAttrs}>
        <LeftAxis scale={y} attrs={chartAttrs} label={options.y} />
        <BottomAxis scale={x} attrs={chartAttrs} buckets={[]} label={options.x} />
        <Circles
          x={x}
          y={y}
          r={r}
          data={data}
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

export default ScatterPlot
