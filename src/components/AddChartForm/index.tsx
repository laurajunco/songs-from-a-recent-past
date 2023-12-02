import React, { useState } from 'react'
import './styles.css'
import {
  DashboardItemDefinition,
  chart_types,
  width_options,
  cat_options,
  num_options,
} from '../../utils/interfaces'
import Select from '../Select'

interface AddChartFormProps {
  onNewChart: (chart: DashboardItemDefinition) => void
}

const emptyChart: DashboardItemDefinition = {
  title: '',
  id: 'id',
  width: '6',
  chart: chart_types[0],
  x: 'key',
  y: 'danceability',
  z: 'energy',
}

const AddChartForm = ({ onNewChart }: AddChartFormProps) => {
  const [chart, setChart] = useState(emptyChart)
  const submit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    setField(chart.title + Math.random(), 'id')
    onNewChart(chart)
    setChart(emptyChart)
  }

  const setField = (value: string, field: string): void => {
    setChart((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  return (
    <div className={`dashboard-item add grid-12`}>
      <h3>Add your own chart</h3>
      <form onSubmit={submit}>
        <input
          value={chart.title}
          onChange={(event) => {
            setField(event.target.value, 'title')
            setField(event.target.value + Math.random(), 'id')
          }}
          type="text"
          placeholder="Write a title for this chart"
          required
        />

        <Select
          value={chart.chart}
          options={chart_types}
          label={'Select a chart type'}
          setSelected={(type) => setField(type, 'chart')}
        />

        <Select
          value={chart.width}
          options={width_options}
          label={'Select the width'}
          setSelected={(type) => setField(type, 'width')}
        />

        <Select
          value={chart.x}
          options={chart.chart === 'scatter plot' ? num_options : cat_options}
          label={'Select x dimension'}
          setSelected={(type) => setField(type, 'x')}
        />

        {chart.chart === 'scatter plot' && (
          <Select
            value={chart.y}
            options={num_options}
            label={'Select y dimension'}
            setSelected={(type) => setField(type, 'y')}
          />
        )}

        {chart.chart === 'scatter plot' && (
          <Select
            value={chart.z}
            options={num_options}
            label={'Select z dimension'}
            setSelected={(type) => setField(type, 'z')}
          />
        )}

        <button>Add Chart</button>
      </form>
    </div>
  )
}

export default AddChartForm
