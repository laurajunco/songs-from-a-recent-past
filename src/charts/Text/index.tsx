import { chartProps } from '../../utils/interfaces'
import { getMostFrequent } from '../../utils/utils'

const Text = ({ options, data }: chartProps) => {
  return <h2 className="viz-number">{getMostFrequent(options.x, data)}</h2>
}

export default Text
