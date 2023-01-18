import React from 'react'

import ListItem from './ListItem'
import './List.css'

const listExample = [{idx: 0, name: 'example'}, {idx: 1, name: 'example'}, {idx: 2, name: 'example'}, {idx: 3, name: 'example'}, {idx: 4, name: 'example'}]

const List = (props) => {

  

  return (
    <div className="list-wrapper">

      <div className="list">
        {listExample.map((el) => {
          return <ListItem data={el}/>
        })}
      </div>
      
    </div>
      
  )
}

export default List