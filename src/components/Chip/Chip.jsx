import * as React from "react"
import "./Chip.css"

export function Chip({ menu, handleClick, label = "", isActive = false }) {
  const buttonClassName = () => {
    if(!isActive) {
      return "chip"
    } else {
      return "chip active"
    }
  }
  return (
    <button className={buttonClassName()} onClick={() => {menu ? handleClick(menu):handleClick(label)}}>
      <p className="label">{label}</p>
      <span className="close" role="button">{`X`}</span>
    </button>
  )
}

export default Chip
