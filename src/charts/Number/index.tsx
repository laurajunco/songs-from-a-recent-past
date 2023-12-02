import { format } from 'd3'
import { chartProps } from '../../utils/interfaces'
import { getUniqueValues } from '../../utils/utils'

const Number = ({ options, data }: chartProps) => {
  const f = format(',')
  const values = getUniqueValues(options.x, data)
  return <h2 className="viz-number">{f(values.length)}</h2>
}

export default Number
