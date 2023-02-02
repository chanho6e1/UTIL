import React, {useRef, useEffect} from "react";
import styles from './Notification.module.css'
import ReactDOM from 'react-dom'

import { notificationSliceActions } from "../../../redux/notificationSlice";
import { useSelector, useDispatch } from 'react-redux'

const Notification = (props) => {
    const indicatorRef = useRef()
    const popUpRef = useRef()
    const contentWrapperRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        if (indicatorRef.current) {
            indicatorRef.current.style.transitionProperty = 'width'
            indicatorRef.current.style.transitionDuration = `${props.duration / 1000}s`
        }

        if (popUpRef.current) {
            popUpRef.current.style.height = '0px'
            popUpRef.current.style.width = `${props.width + 40}px`
            contentWrapperRef.current.style.width = `${props.width}px`
            contentWrapperRef.current.style.height = `${props.height}px`
            popUpRef.current.style.right = `-${props.width + 20}px`
            popUpRef.current.style.transitionProperty = 'right top height'
            popUpRef.current.style.transitionDuration = `0.3s`
        }
        setTimeout(function() {
            popUpRef.current.style.height = `${props.height + 20}px`
            
        }, 100);
        setTimeout(function() {
            indicatorRef.current.style.width = '0px'
            popUpRef.current.style.right = `0px`
        }, 400);
        setTimeout(function() {
            popUpRef.current.style.right = `-${props.width + 20}px`
        }, props.duration + 300);
        setTimeout(function() {
            popUpRef.current.style.height = '0px'
        }, props.duration + 600);
        setTimeout(function() {

            // const copy = props.state
            // console.log(props.id)
            // delete copy[props.id]
            // props.stateHandler(() => {return {...copy}})
            // console.log(props.state)
            dispatch(notificationSliceActions.delete(JSON.stringify(props.id)))

        }, props.duration + 900);
    }, [])



    return (

        <div ref={popUpRef} onClick={() => console.log(props.state)} className={styles['pop-up']}>
            <div ref={contentWrapperRef} className={styles['content-wrapper']}>
                <div className={styles['content']}>
                    {props.content}
                </div>
                <div ref={indicatorRef} className={styles['indicator']} />
            </div>
            
        </div>

        

    )
}


export default Notification