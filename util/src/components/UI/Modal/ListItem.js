import React, {useState, useRef} from "react";
import { HashRouter, BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useMatch } from "react-router-dom";
import './ListItem.css' 
import Modal from "./Modal";
import Content from "./Content"


const ListItem = (props) => {
  const [showModal, setShowModal] = useState(false)
  const itemRef = useRef()
  const navigate = useNavigate()


  const ShowModalHandler = (boolean) => {
    navigate(`${props.data.idx}`);
    setShowModal(boolean)
  }

  const modal = <Modal component={<Content />} id={props.data.idx} name={props.data.name} parentId={`modal-parent-${props.data.name}-${props.data.idx}`} parentRef={itemRef} toggleFunction={setShowModal} toggleBoolean={showModal} url={`index/modal/${props.data.idx}`} prevUrl={'/index/modal'} />
  
  return (
    <div>
      <div onClick={ShowModalHandler.bind(this, true)} ref={itemRef} id={`modal-parent-${props.data.name}-${props.data.idx}`} className="Card" >
        <p>{props.data.idx}</p>
        <p>모달폼을 열려면 클릭하세요.</p>
        {modal}
      </div>
      
      {/* <Routes>
        <Route path={`/${props.data.idx}`} element={modal} />
        <Route path={'/'} element={modal} />
      </Routes> */}
    </div>
  )
  
}

export default ListItem