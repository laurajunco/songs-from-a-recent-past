export const chart_types = [
  'pie',
  'bar',
  'scatter plot',
  'number of',
  'most of',
  'treemap',
  'circle pack',
]
export const width_options = ['3', '4', '6', '8', '9', '12']
export const colors = ['blue', 'orange', 'red']
export const cat_options = [
  'Artist',
  'City',
  'Decade',
  'Country',
  'Name',
  'Rank',
  'key',
  'time_signature',
]

export const num_options = [
  'Rank',
  'acousticness',
  'danceability',
  'duration_ms',
  'energy',
  'liveness',
  'loudness',
  'speechiness',
  'instrumentalness',
  'key',
  'tempo',
  'time_signature',
  'valence',
]

export const map_options = [
  'acousticness',
  'danceability',
  'energy',
  'instrumentalness',
  'liveness',
  'speechiness',
  'valence',
]

export interface Song {
  Artist: string
  City: string
  Country: string
  Decade: number
  Name: string
  Rank: number
  acousticness: number
  danceability: number
  duration_ms: number
  energy: number
  instrumentalness: number
  key: number
  liveness: number
  loudness: number
  speechiness: number
  tempo: number
  time_signature: number
  valence: number
}

export interface DashboardItemDefinition {
  title: string
  id: string
  width: typeof width_options[number]
  chart: typeof chart_types[number]
  x: string
  y: string
  z: string
}

export interface chartProps {
  options: DashboardItemDefinition
  data: Song[]
  onSelect: (songs: Song[]) => void
  selected: Song[]
}

export interface Bucket {
  name: string | number
  children: Song[]
}

export interface ChartAttrs {
  margin: {
    top: number
    right: number
    bottom: number
    left: number
  }
  width: number
  height: number
}

export interface tTipAttrs {
  x: number
  y: number
  show: boolean
  content: string
}
