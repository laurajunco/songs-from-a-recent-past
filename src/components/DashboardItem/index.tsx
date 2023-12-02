import './styles.css'
import { DashboardItemDefinition, Song } from '../../utils/interfaces'
import ChartRenderer from '../ChartRenderer'

interface DashboardItemProps {
  item: DashboardItemDefinition
  onRemove: (id: string) => void
  data: Song[]
  selected: Song[]
  onSelect: (songs: Song[]) => void
}

const DashboardItem = ({ item, onRemove, data, onSelect, selected }: DashboardItemProps) => {
  return (
    <div className={`dashboard-item grid-${item.width}`}>
      <h4>{item.title}</h4>
      <div className="close" onClick={() => onRemove(item.title)}>
        x
      </div>
      <ChartRenderer options={item} data={data} onSelect={onSelect} selected={selected} />
    </div>
  )
}
export default DashboardItem
