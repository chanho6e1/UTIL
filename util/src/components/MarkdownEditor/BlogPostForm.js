import React, { useEffect, useState }  from "react";
import styles from './BlogPostForm.module.css'
import TextInput from "../UI/TextInput/TextInput";
import { recvPlansAPI } from "../../api/Plan/recvPlansAPI";
import arrow from '../../img/arrow.png'
import Button from "../UI/Button/Button";

const BlogPostForm = (props) => {
    const [plans, setPlans] = useState([])
    const [showPlansPicker, setShowPlansPicker] = useState(props.forReview ? true : false)
    const [showScopePicker, setShowScopePicker] = useState(true)
    const [selectedPlan, setSelectedPlan] = useState(props.queryString.goal ? props.queryString.goal : null)
    const [selectedScope, setSelectedScope] = useState(2)

    useEffect(() => {
        recvPlansAPI()
        .then((res) => {
            setPlans(res)
            
        })
    }, [])

    const planPickerHandler = () => {
        if (props.forReview === true) {
            return
        }
        setShowPlansPicker((prev) => !prev)
    }

    const scopePickerHandler = () => {
        setShowScopePicker((prev) => !prev)
    }



    const selectPlan = (plan) => {
        if (selectedPlan !== plan) {
            setSelectedPlan(plan)
        } else {
            setSelectedPlan(null)
        }
    }

    const onClickSubmitHandler = () => {
        if (props.forReview === true) {
            props.reviewSubmitHandler(selectedPlan?.goalId)
            props.modalHandler()
        } else {
            props.postSubmitHandler(selectedScope, selectedPlan?.goalId)
            props.modalHandler()
        }
        
    }

    const plansRender = plans?.map((el, idx) => {
        const startDate = new Date(el.startDate)
        const endDate = new Date(el.endDate)
        if (el.state === false) {
            return (
                <div onClick={() => {selectPlan(el); planPickerHandler() }} className={styles['item']} style={{backgroundColor: el.goalId === selectedPlan?.goalId ? 'rgb(235, 236, 239)' : '', }}>
                    <b>{el.title}</b>
                    <div className={styles['small-text']}>
                        {startDate.getFullYear()}년 {startDate.getMonth()}월 {startDate.getDate()}일 ~ {endDate.getFullYear()}년 {endDate.getMonth()}월 {endDate.getDate()}일
                    </div>
                </div>
            )
        }
    })


    const scopeElement = (
        <React.Fragment>
            <div onClick={scopePickerHandler} className={styles['picker']}>
                <img className={styles['arrow-icon']} src={arrow} style={{transform: showScopePicker ? 'rotate(90deg)' : 'none', marginLeft:'10px', marginRight:'12px', width: '12px', height: 'auto'}}/>
                {selectedScope === 2 && <div>모두 공개</div>}
                {selectedScope === 1 && <div>팔로잉 공개</div>}
                {selectedScope === 0 && <div>비공개</div>}
            </div>
            <div className={styles['picker-wrapper']} style={{height: showScopePicker ? '145px' : '0px'}}>
                <div className={styles['shadow-box-wrapper']} style={{height: showScopePicker ? '145px' : '0px'}}>
                    <div className={styles['shadow-box']} />
                </div>

                <div onClick={() => {setSelectedScope(2); scopePickerHandler() }} className={styles['item']} style={{backgroundColor: 2 === selectedScope ? 'rgb(235, 236, 239)' : '', }}>
                    <b>모두 공개</b>
                    <div className={styles['small-text']}>
                        모든 사용자에게 이 글을 공개합니다.
                    </div>
                </div>
                <div onClick={() => {setSelectedScope(1); scopePickerHandler() }} className={styles['item']} style={{backgroundColor: 1 === selectedScope ? 'rgb(235, 236, 239)' : '', }}>
                    <b>팔로잉 공개</b>
                    <div className={styles['small-text']}>
                        팔로잉 한 사용자에게 이 글을 공개합니다.
                    </div>
                </div>
                <div onClick={() => {setSelectedScope(0); scopePickerHandler() }} className={styles['item']} style={{backgroundColor: 0 === selectedScope ? 'rgb(235, 236, 239)' : '', }}>
                    <b>비공개</b>
                    <div className={styles['small-text']}>
                        다른 이용자는 이 글을 볼 수 없습니다.
                    </div>
                </div>
            </div>
        </React.Fragment>
    )


    return (
        <div className={styles['blog-post-form']}>
            <div className={styles['form-wrapper']}>
                <header className={styles['header']}>
                    <span>글 상세 설정</span>
                </header>
                <div className={styles['body']}>

                    <div onClick={planPickerHandler} className={styles['picker']}>
                        <img className={styles['arrow-icon']} src={arrow} style={{transform: showPlansPicker ? 'rotate(90deg)' : 'none', marginLeft:'10px', marginRight:'12px', width: '12px', height: 'auto'}}/>
                        {selectedPlan ? <div>{selectedPlan.title}</div> : <div style={{color:'rgb(120, 120, 120)'}}>연결할 목표 선택하기</div>}
                    </div>
                    <div className={styles['picker-wrapper']} style={{height: showPlansPicker ? '200px' : '0px'}}>
                        <div className={styles['shadow-box-wrapper']} style={{height: showPlansPicker ? '200px' : '0px'}}>
                            <div className={styles['shadow-box']} />
                        </div>
                        {plansRender}
                    </div>


                    {props.forReview ? null : scopeElement}
                    

                </div>
                <footer className={styles['footer']}>
                    <Button onClick={props.modalHandler} className={styles['button']}>취소</Button>
                    <Button onClick={onClickSubmitHandler} className={styles['button']}>제출</Button>
                </footer>

            </div>
        </div>
        
    )
}

export default BlogPostForm