import { useEffect, useRef, useState } from 'react'
import './styles.css'
import { map_options, Song } from '../../utils/interfaces'
import Select from '../Select'
import Chart from './chart'
import { keys } from '../../App'

let vis: any = {}

interface TopSongsProps {
  data: Song[]
}

const TopSongs = ({ data }: TopSongsProps) => {
  const [selectedX, setSelectedX] = useState('acousticness')
  const [selectedY, setSelectedY] = useState('instrumentalness')
  const [selectedOrder, setSelectedOrder] = useState('Difference')
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    vis = new Chart(el.current, data)
  }, [data])

  useEffect(() => {
    vis && vis.update(data, selectedX, selectedY, selectedOrder)
  }, [selectedOrder, selectedX, selectedY, data])

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function () {
        vis = {}
        vis = new Chart(el.current, data)
        vis.update(data, selectedX, selectedY, selectedOrder)
      }, 300)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [selectedOrder, selectedX, selectedY, data])

  return (
    <div className="top-songs">
      <div className="selection-bar">
        <div className="select-order">
          <Select
            label={'Order by'}
            setSelected={(cat) => {
              setSelectedOrder(cat)
            }}
            value={selectedOrder}
            options={['Difference', ...keys]}
          />
        </div>

        <div className="select-categories">
          <Select
            label={''}
            setSelected={(cat) => {
              setSelectedX(cat)
            }}
            value={selectedX}
            options={map_options}
          />

          <Select
            label={''}
            setSelected={(cat) => {
              setSelectedY(cat)
            }}
            value={selectedY}
            options={map_options}
          />
        </div>
      </div>

      <div className="vis-container" ref={el} />
    </div>
  )
}

export default TopSongs
