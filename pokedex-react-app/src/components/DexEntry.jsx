import React from 'react'
import './DexEntry.css'

export const DexEntry = ({value}) => {
  const name = value.name;
  const imageSrc = value.sprites.front_default;
  console.log(name, imageSrc)
  return (
    <img key={name} src={imageSrc}></img>
  )
}
