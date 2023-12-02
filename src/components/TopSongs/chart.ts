import { area, descending, format, Line, line, scaleLinear, select } from 'd3'
import { ChartAttrs, Song } from '../../utils/interfaces'

class Chart {
  el: HTMLDivElement | null
  svg: d3.Selection<SVGGElement, unknown, null, undefined>
  attrs: ChartAttrs
  x: d3.ScaleLinear<number, number, never>
  groups: d3.Selection<SVGGElement | d3.BaseType, Song, SVGGElement, unknown>
  circlesX: d3.Selection<SVGCircleElement, Song, SVGGElement, unknown>
  circlesY: d3.Selection<SVGCircleElement, Song, SVGGElement, unknown>
  xyArea
  xLine: Line<Song>
  yLine: Line<Song>
  xPath: d3.Selection<SVGPathElement, Song[], null, undefined>
  yPath: d3.Selection<SVGPathElement, Song[], null, undefined>
  xyPath: d3.Selection<SVGPathElement, Song[], null, undefined>
  xText
  yText
  f
  text

  constructor(el: HTMLDivElement | null, data: Song[]) {
    // HTML element
    this.el = el
    select(el).html('')

    // General chart attributes
    this.attrs = {
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      width: this.el ? this.el.clientWidth : 0,
      height: 40 * data.length,
    }

    // format for numbers
    this.f = format('.2f')

    // svg element
    this.svg = select(el)
      .append('svg')
      .attr('width', `${this.attrs.width + this.attrs.margin.left + this.attrs.margin.right}`)
      .attr('height', `${this.attrs.height + this.attrs.margin.top + this.attrs.margin.bottom}`)
      .append('g')
      .attr('transform', `translate(${this.attrs.margin.left},${this.attrs.margin.top})`)

    // scale for circles
    this.x = scaleLinear()
      .domain([0, 1])
      .range([this.attrs.width / 1.5, this.attrs.width - 100])

    // area
    this.xyArea = area<Song>()
      .x0(this.attrs.width / 1.5)
      .x1(this.attrs.width / 1.5)
      .y((d, i) => 40 * i + 20)

    // line for x circles
    this.xLine = line<Song>()
      .x(this.attrs.width / 1.5)
      .y((d, i) => 40 * i + 20)

    // line for y circles
    this.yLine = line<Song>()
      .x(this.attrs.width / 1.5)
      .y((d, i) => 40 * i + 20)

    // Paths that join circles vertically
    this.xPath = this.svg.append('path').attr('class', 'line-x').datum(data).attr('d', this.xLine)
    this.yPath = this.svg.append('path').attr('class', 'line-y').datum(data).attr('d', this.yLine)

    // Path for area
    this.xyPath = this.svg
      .append('path')
      .attr('class', 'area-xy')
      .datum(data)
      .attr('d', this.xyArea)

    // a g element groups every row
    this.groups = this.svg
      .selectAll('g.song')
      .data(data)
      .join('g')
      .attr('class', 'song-group')
      .attr('transform', (d: Song, i: number) => `translate(0,${40 * i})`)

    //Rect that changes color on hover
    this.groups
      .append('rect')
      .attr('class', 'bg-rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.attrs.width)
      .attr('height', 40)

    //text for each song
    this.text = this.groups
      .append('text')
      .attr('class', 'song-text')
      .attr('x', 20)
      .attr('y', 20)
      .text('')

    //circles x
    this.circlesX = this.groups
      .append('circle')
      .attr('class', 'circle-x')
      .attr('r', 10)
      .attr('cy', 20)
      .attr('cx', this.attrs.width / 1.5)

    //circles y
    this.circlesY = this.groups
      .append('circle')
      .attr('class', 'circle-y')
      .attr('r', 8)
      .attr('cy', 20)
      .attr('cx', this.attrs.width / 1.5)

    // text x
    this.xText = this.groups
      .append('text')
      .attr('class', 'circle-text')
      .attr('x', this.attrs.width / 1.5)
      .attr('y', 20)
      .text('')

    // text y
    this.yText = this.groups
      .append('text')
      .attr('class', 'circle-text')
      .attr('x', this.attrs.width / 1.5)
      .attr('y', 20)
      .text('')
  }

  update = (data: Song[], selectedX: string, selectedY: string, selectedOrder: string) => {
    // sort data based on user selection
    data = data.sort((a, b) => {
      if (selectedOrder === 'Difference') {
        return descending(
          +a[selectedX as keyof Song] - +a[selectedY as keyof Song],
          +b[selectedX as keyof Song] - +b[selectedY as keyof Song]
        )
      } else {
        return descending(a[selectedOrder as keyof Song], b[selectedOrder as keyof Song])
      }
    })

    // update lines
    this.xLine.x((d: Song) => this.x(+d[selectedX as keyof Song]))
    this.yLine.x((d: Song) => this.x(+d[selectedY as keyof Song]))

    //update area
    this.xyArea
      .x0((d: Song) => this.x(+d[selectedX as keyof Song]))
      .x1((d: Song) => this.x(+d[selectedY as keyof Song]))
      .y((d, i) => 40 * i + 20)

    // update lineas and area paths
    this.xPath.datum(data).transition().duration(1000).attr('d', this.xLine)
    this.yPath.datum(data).transition().duration(1000).attr('d', this.yLine)
    this.xyPath.datum(data).transition().duration(1000).attr('d', this.xyArea)

    // update rows position
    this.groups
      .data(data, (d) => d.Name + d.Artist)
      .transition()
      .duration(1000)
      .attr('transform', (d: Song, i: number) => `translate(0,${40 * i})`)

    // update text based on order selection
    this.text.text((d: Song) => {
      let maxChar = this.attrs.width / 40
      let txt: string = ''

      if (selectedOrder === 'Name') {
        txt = d.Name
      } else if (selectedOrder === 'Difference') {
        txt = `${this.f(+d[selectedX as keyof Song] - +d[selectedY as keyof Song])} – ${d.Name}`
      } else {
        txt = `${d[selectedOrder as keyof Song]} – ${d.Name}`
      }

      return txt.length > maxChar ? `${txt.substring(0, maxChar)}...` : txt
    })

    // update circles x position
    this.circlesX
      .data(data, (d) => d.Name + d.Artist)
      .transition()
      .duration(1000)
      .attr('cx', (d: Song) => this.x(+d[selectedX as keyof Song]))

    // update circles y position
    this.circlesY
      .data(data, (d) => d.Name + d.Artist)
      .transition()
      .duration(1000)
      .attr('cx', (d: Song) => this.x(+d[selectedY as keyof Song]))

    // update texts x position
    this.xText
      .data(data, (d) => d.Name + d.Artist)
      .text((d: Song) => this.f(+d[selectedX as keyof Song]))
      .transition()
      .duration(1000)
      .attr('x', (d: Song) => {
        const diff = +d[selectedX as keyof Song] - +d[selectedY as keyof Song]
        return diff > 0
          ? this.x(+d[selectedX as keyof Song]) + 20
          : this.x(+d[selectedX as keyof Song]) - 20
      })
      .style('text-anchor', (d) => {
        const diff = +d[selectedX as keyof Song] - +d[selectedY as keyof Song]
        return diff > 0 ? 'start' : 'end'
      })

    // update texts y position
    this.yText
      .data(data, (d) => d.Name + d.Artist)
      .text((d: Song) => this.f(+d[selectedY as keyof Song]))
      .transition()
      .duration(1000)
      .attr('x', (d: Song) => {
        const diff = +d[selectedX as keyof Song] - +d[selectedY as keyof Song]
        return diff > 0
          ? this.x(+d[selectedY as keyof Song]) - 20
          : this.x(+d[selectedY as keyof Song]) + 20
      })
      .style('text-anchor', (d) => {
        const diff = +d[selectedX as keyof Song] - +d[selectedY as keyof Song]
        return diff > 0 ? 'end' : 'start'
      })
  }
}

export default Chart
