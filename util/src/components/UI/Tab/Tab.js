import styles from "./Tab.module.css";
import React, { useRef, useEffect, useState } from "react";

const Tab = (props) => {
  const tabItemsRef = useRef([]);
  const tabIndicatorRef = useRef();
  const [tabIndex, setTabIndex] = useState(props.initialValue ? props.initialValue : 0);


  useEffect(() => {
    const resize = () => {
      tabIndicatorRef.current.style.left = `${tabItemsRef.current[0].clientWidth * tabIndex}px`;
      tabIndicatorRef.current.style.width = `${tabItemsRef?.current[0]?.clientWidth}px`
    };

    window.addEventListener(`resize`, resize);
    return () => {
      window.removeEventListener(`resize`, resize);
    };
  });



  useEffect(() => {
    if (tabIndicatorRef?.current) {
      tabIndicatorRef.current.style.left = `${tabItemsRef.current[0].clientWidth * tabIndex}px`;
    }
  }, [tabIndex]);

  const tabItems = props.tabItems.map((el, idx) => {
    return (
      <div
        key={`${el.content}-${idx}`}
        ref={(el) => (tabItemsRef.current[idx] = el)}
        onClick={() => {
          setTabIndex(() => idx);
          el.function();
        }}
        className={styles["tab-item"]}
        style={{ fontWeight: `${tabIndex === idx ? "700" : "500"}` }}
      >
        {el.content}
      </div>
    );
  });

  return (
    <div
      className={styles["tab-wrapper"]}
      style={{ width: `${props.width}`, height: `${props.height}` }}
    >
      <div className={styles["tab-inner-wrapper"]}>{tabItems}</div>
      <div
        ref={tabIndicatorRef}
        className={styles["indicator"]}
        style={{ width: `${tabItemsRef?.current[0]?.clientWidth}px` }}
      />
    </div>
  );
};

export default Tab;
