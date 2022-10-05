import React from "react";

function Button({ text, bgcolor,color, ...rest }) {
  const style = {
    backgroundColor:bgcolor?bgcolor:"",
    color:color?color:""
  }
  return <button style={style} {...rest}>{text}</button>;
}

export default Button;
