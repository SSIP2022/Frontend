import React from "react";

function Span({ text, bgcolor,color, ...rest }) {
  const style = {
    backgroundColor:bgcolor?bgcolor:"",
    color:color?color:"",
    padding:"3px",
    borderRadius:"5px",
    fontSize:"12px",
    
  }
  return <span style={style} {...rest}>{text}</span>;
}

export default Span;
