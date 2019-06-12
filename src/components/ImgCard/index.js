import React from "react";
import "./style.css";

function ImgCard(props) {
  return (
    <div className="card">
      <div className="img-container">
        <img src={props.image} onClick={() => {props.play(props.id)}}/>
      </div>
    </div>
  );
}

export default ImgCard;
