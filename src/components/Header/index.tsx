import './styles.css'

interface headerProps {
  text: string
  onSetColor: (color: string) => void
}

const Header = ({ text, onSetColor }: headerProps) => {
  return (
    <div className="header">
      <div className="listen">
        <a
          href="https://open.spotify.com/playlist/5ZGpzktJOqvqoIVVuepVmg?si=47851c814d0a46f0"
          className="overlay"
          target="_blank"
          rel="noreferrer"
        >
          a
        </a>
        <span>🔊</span>
      </div>
      <h1>{text}</h1>
      <div className="colors">
        <div className="color red" onClick={() => onSetColor('red')}></div>
        <div className="color blue" onClick={() => onSetColor('blue')}></div>
        <div className="color orange" onClick={() => onSetColor('orange')}></div>
      </div>
    </div>
  )
}

export default Header
