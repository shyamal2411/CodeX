import React from 'react'
import "../App.css";

function Input(props) {
    const getInputValue = (e) => {
        props.inputHandler(e.target.value);
        e.preventDefault();
    }
  return (
    <div className='input'>
        <div className="heading">Input</div>
        <textarea onChange={getInputValue}
        type='text'
        rows='10'
        cols='10'
        placeholder='Enter Input'
        id='inputTextArea'></textarea>
    </div>
  )
}

export default Input