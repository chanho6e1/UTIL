import React, {useState} from "react";
import Button from "../UI/Button/Button";
import FixedModal from "../UI/FixedModal/FixedModal";
import NotiDeliverer from "../UI/StackNotification/NotiDeliverer";
import { chkTodoAPI } from "../../api/Plan/chkTodoAPI";
import { editIsPlanDoneAPI } from "../../api/Plan/editIsPlanDoneAPI";
import { recvIsAllTodosDoneAPI } from "../../api/Plan/recvIsAllTodosDoneAPI";
import { useSelector, useDispatch } from 'react-redux'
import { modifyPlanSliceActions } from '../../redux/planSlice'
import { useNavigate } from "react-router-dom";
import complete from "../../img/Complete.png"
import styles from './PlanIsDoneToggle.module.css'
import { recvTodayTodosAPI } from "../../api/Plan/recvTodayTodosAPI";
import { recvIngPlanAPI } from "../../api/Plan/recvIngPlanAPI";


const DoneModalForm = (props) => {
    
    return (
        <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', padding:'24px'}}>
            <img style={{width:'250px', height:'auto', marginTop:'12px', marginBottom: '24px'}} src={complete} />
            <div>
                <p style={{lineHeight: '40%'}}>목표의 모든 TODO를 완료하였습니다.</p>
                <p style={{lineHeight: '40%'}}>관련 글을 작성하고 목표를 완료하세요.</p>
            </div>  
            <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', marginTop:'12px'}}>
                <Button className={styles['button']} onClick={() => {props.redirectToPost(true)}}>글 작성</Button>
                <Button className={styles['button']} onClick={() => {props.planDone(); props.modalHandler()}}>목표 완료</Button>
                <Button className={styles['button']} onClick={props.modalHandler}>취소</Button>
            </div>
        </div>
    )
}

const PlanIsDoneToggle = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toggleIsDone = () => {
        chkTodoAPI(props.todo.todoId, props.plan.goalId)
        .then((res) => {
            const proccessing = {
                goalId: props.plan.goalId,
                data: res
            }
            dispatch(modifyPlanSliceActions.responseTodos(JSON.stringify(proccessing)))
            
            
        })
        .then((res) => {
            
            recvTodayTodosAPI()
            .then((res) => {
                dispatch(modifyPlanSliceActions.responseTodayTodos(JSON.stringify(res)))
            })
            .catch((err) => {
                console.log('PlanCardItem : recvTodayTodosAPI => ', err)
            })

            recvIsAllTodosDoneAPI(props.plan.goalId)
            .then((res) => {
                if (res === true) {
                    const today = new Date()
                    if (today > new Date(props.plan.endDate)) {
                        setDoneModalState(true)
                    } else {
                        setNotiContent(message2)
                        setDoneNotiState(true)
                    }
                    
                } else {
                    if (props.todo.state === false) {
                        setNotiContent(message1)
                        setDoneNotiState(true)
                    }
                    
                }
            })
            
        })
        
    }

    const planDone = () => {
        editIsPlanDoneAPI(props.plan.goalId)
        .then((res) => {
            setNotiContent(message3)
            setDoneNotiState(true)
            recvIngPlanAPI()
            .catch((err) => {
                console.log('PlanIsDoneToggle : recvIngPlanAPI => ', err)
            })
            .then((res) => {
                dispatch(modifyPlanSliceActions.responsePlans(JSON.stringify(res)))
                
            })
            
        })
        .catch((err) => {
            console.log('PlanIsDoneToggle : editIsPlanDoneAPI => ', err)
        })
        
        
    }

    const redirectToPost = (isPlanDone) => {
        const url = `/create/post?goal_id=${props.plan.goalId}${isPlanDone ? '&ask_done=true' : ''}&step=true`
        navigate(url)
    }

    


    const message1 = (
        <div style={{width:'100%', height: '100px', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center'}}>
            <div><b>{props.todo.title}</b>을 완료하였습니다.</div>
            <div>관련 글을 작성 하시겠습니까?</div>
            <div style={{width: '100%', display:'flex', justifyContent:'space-around', marginTop: '16px'}}>
                <Button className={styles['noti-button']} onClick={() => {redirectToPost(false);}}>글 작성</Button>
            </div>
            
        </div>
    )

    const message2 = (
        <div style={{height: '100px', display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
            <div>해당 목표의 TODO를 모두 완료하였습니다.</div>
            <div>목표를 완료하거나 새 TODO를 작성하세요.</div>
            <div style={{width: '100%', display:'flex', justifyContent:'space-around', marginTop: '16px'}}>
                <Button className={styles['noti-button']} onClick={() => {redirectToPost(true)}}>글 작성</Button>
                <Button className={styles['noti-button']} onClick={() => {planDone()}}>목표 완료</Button>
            </div>
        </div>
    )

    const message3 = (
        <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
          <img style={{width:'40px', height:'40px', marginRight:'12px'}} src={complete} />
          <div>
            <p style={{lineHeight: '40%'}}>축하드립니다!</p>
            <p style={{lineHeight: '40%'}}>목표를 완료하였습니다!</p>
          </div>
        </div>
      )


    const [doneModalState, setDoneModalState] = useState(false)
    const [doneNotiState, setDoneNotiState] = useState(false)
    const [notiContent, setNotiContent] = useState()


    

    // const addBtn = []

    const isDoneTrue = (
        <div onClick={(event) => {event.stopPropagation(); toggleIsDone()}} className={styles['is-done-true-wrapper']}>
            완료됨
        </div>
    )

    const isDoneFalse = (
        <div onClick={(event) => {event.stopPropagation(); toggleIsDone()}} className={styles['is-done-false-wrapper']}>
            진행중
        </div>
    )


    return (
        <React.Fragment>
            <FixedModal 
                modalState={doneModalState}
                stateHandler={setDoneModalState} 
                content={<DoneModalForm redirectToPost={redirectToPost} planDone={planDone}/>}
                width={'350px'} 
                height={'auto'}
            />
        {doneNotiState && <NotiDeliverer content={notiContent} stateHandler={setDoneNotiState} passToFixed={true} duration={5000} width={400} />}

            {props.todo.state ? isDoneTrue : isDoneFalse}
        </React.Fragment>
        
    )
}

export default PlanIsDoneToggle