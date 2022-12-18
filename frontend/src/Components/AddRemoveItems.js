import React,{useState} from 'react'

export default function AddRemoveItems(props) {

    const [numberOfItem,setNumberOfItem] = useState(0)

    const addItem = () => {
        let n = numberOfItem+1
        setNumberOfItem(n)
      }

    const removeItem = () => {
        let n = numberOfItem-1
        if(n===-1){
            setNumberOfItem(0)
        }
        else{
            setNumberOfItem(n)
        }
      }

  return (
    <div>
        <button onClick={()=>{addItem();props.add(props.prop.itemPrice)}} style={{float:'right'}} className='btn btn-outline-success'>+</button>
        <button className='btn btn-success' style={{float:'right'}} onClick={()=>{addItem();props.add(props.prop.itemPrice)}}>ADD</button>
        <button onClick={()=>{removeItem();props.remove(props.prop.itemPrice,numberOfItem)}} style={{float:'right'}} className='btn btn-outline-success'>-</button>
        <span style={{paddingRight:'1%',fontSize:'150%'}}>Number of Items:</span>
        <span style={{fontSize:'150%'}}>{numberOfItem}</span>
    </div>
  )
}
