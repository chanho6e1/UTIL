import React, {useState, useRef, useEffect} from "react";
import Swipe from "react-easy-swipe";
import styles from "./DraggableDateSelector.module.css"


const DraggableDateSelector = (props) => {
  const dateSelectorBar = useRef()
  const [positionx, setPositionx] = useState(0)
  const [contentCount, setContentCount] = useState(1)
  const [endSwipe, setEndSwipe] = useState(false)
  const [startDate, setStartDate] = useState()
  const [endData, setEndDate] = useState()
  const resizePoint = 24 + 'px'


  useEffect(() => {
    dateSelectorBar.current.style.width = props.period * 24 + 'px'
  }, [])




  const onSwipeMove = (dateVariable, position = { x: null }) => {
    console.log(position.x, dateVariable)
    
    

    setPositionx(() => position.x)
  }






  const onSwipeEnd = () => {

  }


  



  return (
    <div ref={dateSelectorBar} className={styles['date-selector-bar']}>
      <Swipe onSwipeStart={(event) => {event.stopPropagation();}} onSwipeEnd={onSwipeEnd} onSwipeMove={(event) => {onSwipeMove('test', event)}}>
        <div id="left" className={styles['resize-handler']}>

        </div>
      </Swipe>
      <div className={styles['center-move-handler']}>
        
      </div>
      <Swipe onSwipeStart={(event) => {event.stopPropagation();}} onSwipeEnd={onSwipeEnd} onSwipeMove={(event) => {onSwipeMove('test', event)}}>
        <div id="right" className={styles['resize-handler']}>
          
        </div>
      </Swipe>
    </div>
  )
}

export default DraggableDateSelector