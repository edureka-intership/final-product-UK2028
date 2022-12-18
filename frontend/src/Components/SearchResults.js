import React from 'react'
import "../styles/Filter.css"

export default function SearchResults(props) {
  return (
    <>
        <div className="side_box_inner_box">
                <img src={props.prop.thumb} alt="breakfast"  className="side_box_image"/>
                <div className="side_box_inside_box_inner_box">
                    <span style={{fontSize: "24px"}}><b>{props.prop.name}</b></span>
                    <br/>
                    <span style={{fontSize: "small"}} >{props.prop.city_name}</span>
                    <br/>
                    <span style={{fontSize: "x-small"}}>{props.prop.address}</span>
                </div>
                <br/>
                <hr style={{width:"90%"}}/>
                <div className="side_box_inside_box_inner_box_below">
                    <span>CUISINES: {props.prop.Cuisine[0].name},{props.prop.Cuisine[1].name}</span>
                    <br/>
                    <span>COST FOR TWO: &#8377;{props.prop.cost}</span>
                </div>
            </div>
            <br/>
    </>
  )
}
