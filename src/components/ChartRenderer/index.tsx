import BarChart from '../../charts/BarChart'
import CirclePack from '../../charts/CirclePack'
import Number from '../../charts/Number'
import PieChart from '../../charts/PieChart'
import ScatterPlot from '../../charts/ScatterPlot'
import Text from '../../charts/Text'
import TreeMap from '../../charts/TreeMap'
import { Song, DashboardItemDefinition } from '../../utils/interfaces'

interface ChartRendererProps {
  options: DashboardItemDefinition
  data: Song[]
  onSelect: (songs: Song[]) => void
  selected: Song[]
}

const ChartRenderer = ({ options, data, onSelect, selected }: ChartRendererProps) => {
  const setBlockType = (type: string) => {
    switch (type) {
      case 'number of':
        return <Number options={options} data={data} onSelect={onSelect} selected={selected} />
      case 'most of':
        return <Text options={options} data={data} onSelect={onSelect} selected={selected} />
      case 'bar':
        return <BarChart options={options} data={data} onSelect={onSelect} selected={selected} />
      case 'treemap':
        return <TreeMap options={options} data={data} onSelect={onSelect} selected={selected} />
      case 'circle pack':
        return <CirclePack options={options} data={data} onSelect={onSelect} selected={selected} />
      case 'pie':
        return <PieChart options={options} data={data} onSelect={onSelect} selected={selected} />
      case 'scatter plot':
        return <ScatterPlot options={options} data={data} onSelect={onSelect} selected={selected} />
      default:
        return <h3>No Chart yet :( </h3>
    }
  }

  return setBlockType(options.chart)
}
export default ChartRenderer
