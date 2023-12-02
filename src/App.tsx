import { useState } from 'react'
import './Base.css'
import './App.css'
import Dashboard from './components/Dashboard'
import { colors, DashboardItemDefinition, Song } from './utils/interfaces'
import AddChartForm from './components/AddChartForm'
import data from './data/top20songs_1970s-2000s.json'
import chartsData from './data/starter_charts.json'
import Footer from './components/Footer'
import Header from './components/Header'
import TopSongs from './components/TopSongs'

const dataset: Song[] = data
const dashboardItems: DashboardItemDefinition[] = chartsData
export const keys: string[] = Object.keys(dataset[0])

const App = () => {
  const [items, setItems] = useState(dashboardItems)
  const [selected, setSelected] = useState<Song[]>([])
  const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)])

  return (
    <div className={`app ${color}`}>
      <main>
        <Header text={'Discover the Top 20 Songs 1960s-2000s'} onSetColor={setColor} />
        <TopSongs data={dataset} />
        <Dashboard
          items={items}
          data={dataset}
          onSelect={(songs) => setSelected(songs)}
          selected={selected}
          onRemove={(title) => {
            const newItems = items.filter((item) => item.title !== title)
            setItems(newItems)
          }}
        >
          <AddChartForm
            onNewChart={(chart: DashboardItemDefinition) => {
              const newItems = [...items, chart]
              setItems(newItems)
            }}
          />
        </Dashboard>
      </main>
      <Footer data={dataset} />
    </div>
  )
}

export default App
