import { group, ScaleBand, ScaleLinear } from 'd3'
import { Bucket, DashboardItemDefinition, Song, tTipAttrs } from './interfaces'

export const getValues = (category: string, data: Song[]): (number | string)[] => {
  return data.map((song) => song[category as keyof Song])
}

export const getNumericValues = (category: string, data: Song[]): number[] => {
  return data.map((song) => +song[category as keyof Song])
}

export const getUniqueValues = (category: string, data: Song[]): (number | string)[] => {
  return [...new Set(getValues(category, data))]
}

export const getMostFrequent = (category: string, data: Song[]): string | number => {
  const values = getValues(category, data)
  const map = values.map((a) => values.filter((b) => a === b).length)
  return values[map.indexOf(Math.max.apply(null, map))]
}

export const getBuckets = (category: string, data: Song[]): Bucket[] => {
  const map = group(data, (d) => d[category as keyof Song])
  const buckets: Bucket[] = Array.from(map, ([name, value]) => ({ name: name, children: value }))
  return buckets
}

export const isLinearScale = (
  scale: ScaleLinear<number, number, never> | ScaleBand<string>
): scale is ScaleLinear<number, number, never> => {
  return (scale as ScaleLinear<number, number, never>).ticks ? true : false
}

export const isBucket = (x: Song | Bucket): x is Bucket => {
  return (x as Bucket).children ? true : false
}

export const mouseOver = (
  e: React.MouseEvent,
  d: Song | Bucket,
  setattrs: (value: React.SetStateAction<tTipAttrs>) => void,
  options: DashboardItemDefinition
) => {
  let content = ''
  if (isBucket(d)) {
    content = `${options.x}: ${d.name}
    Songs: ${d.children.length}`
  } else {
    content = `Song: ${d.Name}
  ${options.x}: ${d[options.x as keyof Song]}`
    if (options.y) {
      content = content.concat(`
    ${options.y}: ${d[options.y as keyof Song]}`)
    }

    if (options.z) {
      content = content.concat(`
    ${options.z}: ${d[options.z as keyof Song]}`)
    }
  }

  setattrs({
    x: +e.clientX + 25,
    y: +e.clientY - 25,
    show: true,
    content: content,
  })
}

export const mouseOut = (setattrs: (value: React.SetStateAction<tTipAttrs>) => void) => {
  setattrs((prevState) => ({
    ...prevState,
    show: false,
  }))
}
