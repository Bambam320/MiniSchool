import React, {useState} from 'react'
import { TextField, Button } from '@material-ui/core';

const Clickme = () => {
  const [textValue, setTextValue] = useState('')
  const [count, setCount] =useState(0)

  const handleClick = () => {
    setCount(count + textValue.length)
    setTextValue('')
  }

  function handleTextChange (e) {
    setTextValue(e.target.value)
  }

  return (
    <>
    <form>
      <input  
        type="text"
        name="text"
        value={textValue}
        onChange={handleTextChange}
        />
      <Button onClick={handleClick} >Click Me</Button>
      <span>{count}</span>
      </form>
    </>
  )
}

export default Clickme;

{/* <TextField
id="outlined-password-input"
name="password"
label="Password"
type="password"
autoComplete="current-password"
value={formValues.password}
onChange={handleInputChange}
/> */}