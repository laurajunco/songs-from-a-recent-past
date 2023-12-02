import './styles.css'

interface SelectProps {
  options: string[] | number[]
  label: string
  setSelected: (value: string) => void
  value: string | number | undefined
}

const Select = ({ options, label, setSelected, value }: SelectProps) => {
  return (
    <div className="select-group">
      <label>{label}</label>
      <select value={value} onChange={(event) => setSelected(event.target.value)}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
