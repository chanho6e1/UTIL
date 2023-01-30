import React, { useEffect, useRef, useState } from "react";
import styles from './DropDown.module.css'

const DropDown = (props) => {
  const dropDownRef = useRef()
  const dropDownItemRef = useRef([])


  useEffect(() => {
    
    dropDownRef.current.style.marginLeft = props.marginLeft
    dropDownRef.current.style.width = props.width
    if (props.direction === 'up') {
      dropDownRef.current.style.transform = `translateY(${-50 * dropDownItemRef.current.length}%)`
    }
    
  }, [])

  const setDropDownState = () => {
    props.setDropDownState(false)
  }

  useEffect(() => {
    props.setDropDownState(false)
  }, [props.conditionalRender])


  useEffect(() => {
    if (props.dropDownState) {
      window.addEventListener("mouseup", setDropDownState);
    } else {
      window.removeEventListener("mouseup", setDropDownState);
    }
  }, [props.dropDownState])

  useEffect(() => {
    
    if (props.dropDownState) {
      dropDownRef.current.style.height = dropDownItemRef.current[0].clientHeight * dropDownItemRef.current.length + 'px'
      dropDownRef.current.style.boxShadow = '0px 0px 10px 1px rgba(0, 0, 0, 0.15)'
    } else {
      dropDownRef.current.style.height = '0px'
      dropDownRef.current.style.boxShadow = 'none'
    }
    
  }, [dropDownRef?.current?.clientHeight, props.dropDownState])

  const dropDownItems = props.dropDownItems.label.map((el,idx) => {

    return (
      <div ref={el => (dropDownItemRef.current[idx] = el)} onClick={(event) => {event.stopPropagation(); props.dropDownItems.function[idx](); props.setDropDownState(false);}} className={styles['dropdown-item']} >
        {el}
      </div>
    )
  })


  return (
    <div className={styles['dropdown-wrapper']}>
      <div ref={dropDownRef} className={styles['dropdown']}>
        {dropDownItems}
      </div>
    </div>
  )
}

export default DropDown