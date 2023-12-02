import React from 'react'
import './styles.css'
import { DashboardItemDefinition, Song } from '../../utils/interfaces'
import DashboardItem from '../DashboardItem'

interface DashboardProps {
  items: DashboardItemDefinition[]
  data: Song[]
  selected: Song[]
  children: React.ReactChild
  onRemove: (title: string) => void
  onSelect: (songs: Song[]) => void
}

const Dashboard = ({ items, children, onRemove, data, onSelect, selected }: DashboardProps) => {
  return (
    <div className="dashboard">
      {items.map((item) => (
        <DashboardItem
          item={item}
          key={item.id}
          onRemove={onRemove}
          data={data}
          onSelect={onSelect}
          selected={selected}
        />
      ))}
      {children}
    </div>
  )
}

export default Dashboard
