import React, {useState, useRef, useEffect} from "react";
import Swipe from "react-easy-swipe";
import styles from './SwipeableDock.module.css'
import { useNavigate, useMatch, useLocation, Routes, Route } from "react-router-dom";
import useDidMountEffect from "../../../hooks/useDidMountEffect";




const SwipeableDock = (props) => {
  
  
  const movingDiv = useRef()
  const [positionx, setPositionx] = useState(0)
  const [contentCount, setContentCount] = useState(1)
  const [endSwipe, setEndSwipe] = useState(false)
  const postData = props.content
  const navigate = useNavigate()
  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)
  const [urlLib, setUrlLib] = useState({})
  const location = useLocation();


  useEffect(() => {
    const url = '/' + location.pathname.split('/')[1]
    const index = postData.url.indexOf(url)
    setContentCount(index + 1)
  }, [location.pathname])

  useEffect(() => {
    setUrlLib({})
    postData.url.map((el,idx) => {
      setUrlLib((prev) => {return {...prev, [el]: idx + 1}})
    })
  }, [])


  // useEffect(() => {

  //   // setContentCount(urlLib[location.pathname])

    
  // }, [urlLib, location.pathname])





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
    if (positionx < -20 && contentCount < postData.content.length) {
      setContentCount((prev) => prev + 1)
    }
    if (positionx > 20 && contentCount > -1) {
      setContentCount((prev) => prev - 1)
    }
    if (Math.abs(positionx) <= 20) {
      movingDiv.current.style.transform = `translateX(${-width * (contentCount - 1)}px)`
    }
    setPositionx(() => 0)
    setEndSwipe(true)
  }


  const clickDockHandler = async (idx) => {
    navigate(postData.url[idx], { replace: true });
    // setContentCount(() => idx + 1)
  }






  useEffect(() => {
    movingDiv.current.style.transitionDuration = '0.3s'
    movingDiv.current.style.transform = `translateX(${-width * (contentCount - 1)}px)`
    // navigate(postData.url[contentCount - 1], { replace: true });
  }, [contentCount])



  const [isMouseOn, setIsMouseOn] = useState(false)

  const mouseOnHandler = (boolean) => {
    setIsMouseOn(boolean)
  }






  const { pathname } = useLocation();
  const wrapRef = useRef([]);
  const movePage = (url) =>{
    if(pathname !== `/${url}` && !pathname.includes('modal')) {
      
      wrapRef?.current[contentCount - 1]?.classList?.replace('loaded', 'unloaded');
      setTimeout(()=> { 
        // navigate(url);
        wrapRef?.current[contentCount - 1]?.classList?.replace('unloaded', 'loaded');
      } , 10)
    }
  }

  useEffect(() => {
    if (wrapRef?.current[0]) {
      movePage(pathname)
    }
    
  }, [pathname])






  return (
    <div className={styles['dock-view']}>
      


        <Swipe onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove}>
          <div className={styles.wrapper}>
            <div className={styles.moveable} ref={movingDiv}>
              {postData.content.map((el, idx) => {



                  // return <div className={styles.content} style={{width: width + 'px', height: height + 'px'}}><Routes><Route path={`${postData.url[idx]}/*`} element={el} /></Routes></div>
                  return <div key={`dock-content-${idx}`} ref={el => (wrapRef.current[idx] = el)} className={`${styles.content} loaded`} style={{width: width + 'px', height: height + 'px'}}>{el}</div>
              })}
            </div>
          </div>
        </Swipe>


      
      <div className={styles['dock-wrapper']} onMouseEnter={mouseOnHandler.bind(this, true)} onMouseLeave={mouseOnHandler.bind(this, false)}>


        <div className={styles['dock-mobile']}>
          {postData.dock.dockContracted.map((el, idx) => {
              return <div key={`dock-mobile-${idx}`}  onClick={clickDockHandler.bind(this, idx)} className={'dock-individual'} style={{width: width / postData.dock.length + 'px'}}>{el}</div>;
          })}
        </div>


        <div className={styles['dock-pc']}>

          <div className={styles['dock-pc-top']}>
            <div className={styles['logo-wrapper']}>
              <div className={styles['logo-contracted']}>{postData.dock.logoContracted}</div>
              <div className={styles['logo-expanded']}>{postData.dock.logoExpanded}</div>
            </div>

            {postData.dock.dockContracted.map((el, idx) => {
                return (
                  <div key={`dock-pc-top-${idx}`} onClick={clickDockHandler.bind(this, idx)} className={styles['dock-pc-individual']} >
                    {el}
                    <div onClick={clickDockHandler.bind(this, idx)} className={styles['dock-pc-expanded-individual']} >
                      {postData.dock.dockExpanded[idx]}
                    </div>
                  </div>
                )
            })}
          </div>
          
          <div className={styles['dock-pc-bottom']}>
            {postData.dock.dockContractedBottom.map((el, idx) => {
              const individual = (
                <div  className={styles['dock-pc-individual']} >
                    {el}
                    <div className={styles['dock-pc-expanded-individual']} >
                      {postData.dock.dockExpandedBottom[idx]}
                    </div>
                </div>
              )
              const wrapper = postData.dock.dockWrapperBottom[idx]
              const content = React.cloneElement(wrapper, {children: individual, isMouseOn: isMouseOn, key: `dock-pc-bottom-${idx}`});
              return content
            })}
          </div>

        </div>


      </div>
    </div>
  )
}

export default SwipeableDock