import './styles.css'
import { Song } from '../../utils/interfaces'

interface FooterProps {
  data: Song[]
}

const Footer = ({ data }: FooterProps) => {
  return (
    <div className="footer">
      <aside className="marquee">
        <div className="marquee-inner">
          <p>{data.map((song) => `${song.Name} - ${song.Artist} | `)}</p>
        </div>
      </aside>
      <div className="bottom">
        <p>Laura Junco 2021</p>
      </div>
    </div>
  )
}

export default Footer
