import './styles.css'
import { tTipAttrs } from '../../utils/interfaces'

interface tooltipProps {
  attrs: tTipAttrs
}

const Tooltip = ({ attrs }: tooltipProps) => {
  return (
    <div className={`tooltip ${attrs.show}`} style={{ top: attrs.y, left: attrs.x }}>
      {attrs.content}
    </div>
  )
}

export default Tooltip
