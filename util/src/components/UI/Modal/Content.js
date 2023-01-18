import React from "react";
import './Content.css'


const Content = (props) => {

  return (
    <div className="wrapper">
      Content
      <button onClick={props.unmountModalHandler}>unmountModalHandler</button>
    </div>
  )
}

export default Content