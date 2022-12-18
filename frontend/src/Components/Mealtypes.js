import React from 'react'

export default function Mealtypes(props) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="border shadow col-items" >
            <div className="item-1 "><img src={require(`../${props.prop.image}`)} alt="" className="item-1-image"/></div>
            <div className="item-2">
                <div style={{color: "#192F60", fontWeight: "bold"}} className="item-2-heading">{props.prop.name}</div>
                <div style={{color:"#8C96AB"}}>{props.prop.content}</div>
            </div>
        </div>   
    </div>
  )
}
