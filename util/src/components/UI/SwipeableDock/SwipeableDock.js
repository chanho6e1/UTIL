import React, {useState, useRef, useEffect} from "react";
import Swipe from "react-easy-swipe";
import styles from './SwipeableDock.module.css'
import { useNavigate, useMatch, useLocation, Routes, Route } from "react-router-dom";



const SwipeableDock = (props) => {
  

  const movingDiv = useRef()
  const [positionx, setPositionx] = useState(0)
  const [contentCount, setContentCount] = useState(1)
  const [endSwipe, setEndSwipe] = useState(false)
  const postData = props.content
  const navigate = useNavigate()
  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)





  useEffect(() => {
    setWidth(() => props.parentRef.current.clientWidth)
    setHeight(() => props.parentRef.current.clientHeight)
    const resize = () => {
      setWidth(() => props.parentRef.current.clientWidth)
      setHeight(() => props.parentRef.current.clientHeight)
      if (props.parentRef.current.clientWidth) {
        movingDiv.current.style.transitionDuration = '0s'
        movingDiv.current.style.transform = `translateX(${-props.parentRef.current.clientWidth * (contentCount - 1)}px)`
      }
    }
    window.addEventListener(`resize`, resize);
    return () => {
      window.removeEventListener(`resize`, resize);
    }
  }, [contentCount])

  



  const onSwipeMove = (position = { x: null, y: null }) => {
    setEndSwipe(false)
    if (postData.content.length === 1) {
      return
    }
    if ((contentCount >= postData.content.length && positionx < 0) || (contentCount === 1 && positionx > 0) || Math.abs(positionx) > width ) {
      return
    }
    if (Math.abs(position.x) > Math.abs(position.y)) {
      movingDiv.current.style.transitionDuration = '0s'
      movingDiv.current.style.transform = `translateX(${positionx + (-width * (contentCount - 1))}px)`
    setPositionx(() => position.x)
    }
  }






  const onSwipeEnd = () => {
    movingDiv.current.style.transitionDuration = '0.3s'
    if (positionx < -50 && contentCount < postData.content.length) {
      setContentCount((prev) => prev + 1)
    }
    if (positionx > 50 && contentCount > -1) {
      setContentCount((prev) => prev - 1)
    }
    if (Math.abs(positionx) <= 50) {
      movingDiv.current.style.transform = `translateX(${-width * (contentCount - 1)}px)`
    }
    setPositionx(() => 0)
    setEndSwipe(true)
  }
  const clickDockHandler = async (idx) => {
    setContentCount(() => idx + 1)
  }






  useEffect(() => {
    movingDiv.current.style.transitionDuration = '0.3s'
    movingDiv.current.style.transform = `translateX(${-width * (contentCount - 1)}px)`
    navigate(postData.url[contentCount - 1], { replace: true });
  }, [contentCount])




  
  return (
    <div className={styles['dock-view']}>
      


        <Swipe onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove}>
          <div className={styles.wrapper}>
            <div className={styles.moveable} ref={movingDiv}>
              {postData.content.map((el, idx) => {
                  // return <div className={styles.content} style={{width: width + 'px', height: height + 'px'}}><Routes><Route path={`${postData.url[idx]}/*`} element={el} /></Routes></div>
                  return <div className={styles.content} style={{width: width + 'px', height: height + 'px'}}>{el}</div>
              })}
            </div>
          </div>
        </Swipe>


      
      <div className={styles['dock-wrapper']}>
        <div className={styles['dock-menu']}>
          <div className={styles['dock-contracted']}>


            <div className={styles['dock-mobile']}>
              {postData.dock.dockContracted.map((el, idx) => {
                  return <div onClick={clickDockHandler.bind(this, idx)} className={'dock-individual'} style={{width: width / postData.dock.length + 'px'}}>{el}</div>;
              })}
            </div>


            <div className={styles['logo-wrapper']}>
              <div className={styles['logo-contracted']}>{postData.dock.logoContracted}</div>
              <div className={styles['logo-expanded']}>{postData.dock.logoExpanded}</div>
            </div>


            <div className={styles['dock-pc']}>
              {postData.dock.dockContracted.map((el, idx) => {
                  return <div onClick={clickDockHandler.bind(this, idx)} className={styles['dock-individual']} >{el}</div>;
              })}
            </div>
          </div>


          <div className={styles['dock-expanded']}>
            <div className={styles['expanded-space']}>
              {/* <div className={styles['logo-expanded']}>{postData.dock.logoExpanded}</div> */}
            </div>
            <div className={styles['dock-pc-expanded']}>
                {postData.dock.dockExpanded.map((el, idx) => {
                    return <div onClick={clickDockHandler.bind(this, idx)} className={styles['dock-individual']} >{el}</div>;
                })}
            </div>
          </div>
        </div>


        
        <div className={styles['dock-menu-bottom']}>
          <div className={styles['dock-contracted']}>
            <div className={styles['dock-pc-bottom']}>
              {postData.dock.dockContractedBottom.map((el, idx) => {
                  return <div className={styles['dock-individual']} >{el}</div>;
              })}
            </div>
          </div>

          <div className={styles['dock-expanded']}>
            <div className={styles['dock-pc-expanded-bottom']}>
                {postData.dock.dockExpandedBottom.map((el, idx) => {
                    return <div className={styles['dock-individual']} >{el}</div>;
                })}
            </div>
          </div>
        </div>
      </div>


      
    </div>
  )
}

export default SwipeableDock