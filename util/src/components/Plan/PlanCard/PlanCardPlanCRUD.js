import React, {useState, useEffect} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/ko';
import styles from './PlanCardPlanCRUD.module.css'
import { styled, createTheme, ThemeProvider } from '@mui/material';
import Button from '../../UI/Button/Button';
import { editTodoAPI } from '../../../api/Plan/editTodoAPI';
import { modifyPlanSliceActions } from '../../../redux/planSlice'
import { useSelector, useDispatch } from 'react-redux'
import { newTodoAPI } from '../../../api/Plan/newTodoAPI';
import { recvTodoPeriodAPI } from '../../../api/Plan/recvTodoPeriodAPI';
import { editPlanAPI } from '../../../api/Plan/editPlanAPI';
import NotiDeliverer from '../../UI/StackNotification/NotiDeliverer';
import warning from "../../../img/Warning.png"
import { newPlanAPI } from '../../../api/Plan/newPlanAPI';
import { delPlanAPI } from '../../../api/Plan/delPlanAPI';
import FixedModal from '../../UI/FixedModal/FixedModal';



const PlanCardPlanCRUD = (props) => {
    const dispatch = useDispatch()

    const customTheme = createTheme({
        palette: {
          primary: {
            main: 'rgba(154, 76, 249, 0.8)',
            contrastText: 'white',
          },
        },
      });

    function leftPad(value) {
        if (value >= 10) {
            return value;
        }
    
        return `0${value}`;
    }

    function toStringByFormatting(source, delimiter = '-') {
        const year = source.getFullYear();
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate());
        return [year, month, day].join(delimiter);
    }


    const today = toStringByFormatting(new Date())

    const [title, setTitle] = useState(props.plan ? props.plan.title : null)
    const [startDate, setStartDate] = useState(props.plan ? new Date(props.plan.startDate) : today)
    const [endDate, setEndDate] = useState(props.plan ? new Date(props.plan.startDate) : null)

    const titleChangeHandler = (event) => {
        setTitle(() => event.target.value)
    }

    const startDateChangeHandler = (value) => {
        setStartDate(() => value)
    }

    const endDateChangeHandler = (value) => {
        setEndDate(() => value)
    }

    const submitHandler = () => {
      if (props.plan) {
        const processing = {
            title: title,
            startDate: startDate,
            endDate: endDate
          }
          editPlanAPI(props.plan.goalId, processing)
          .then((res) => {
              dispatch(modifyPlanSliceActions.responsePlans(JSON.stringify(res)))
              props.modalHandler()
          })
          .catch((err) => {
            console.log('PlanItem : editPlanAPI => ', err)
            if (err.response.data[0].message == "목표 내용이 없습니다.") {
                setNotiContent('목표의 타이틀은 필수 입력 사항입니다.')
                setDoneNotiState(true)
            }
          })
      } else {
        newPlanAPI(startDate, endDate, title)
            .catch((err) => {
                // navigate('/login');
                console.log('Plan : newPlanAPI => ', err)
                if (startDate == null || endDate == null) {
                    setNotiContent('시작일과 마감일은 필수 입력 사항입니다.')
                    setDoneNotiState(true)
                }
                if (err.response.data[0].message == "목표 내용이 없습니다.") {
                    setNotiContent('목표의 타이틀은 필수 입력 사항입니다.')
                    setDoneNotiState(true)
                }
            })
            .then((res) => {
                dispatch(modifyPlanSliceActions.responsePlans(JSON.stringify(res)))
                props.modalHandler()

                
            })
      }
    }

    const [doneNotiState, setDoneNotiState] = useState(false)
    const [notiContent, setNotiContent] = useState()
    const [askDeleteState, setAskDeleteState] = useState(false)


    const ErrorMessage = (props) => {
        return (
            <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
                <img style={{width:'40px', height:'40px', marginRight:'12px'}} src={warning} />
                <div>
                    <p style={{lineHeight: '40%'}}>{notiContent}</p>
                    {/* <p style={{lineHeight: '40%'}}>날짜 범위를 미만 & 초과할 수 없습니다.</p> */}
                </div>
            </div>
        )
    }

    const deletePlan = () => {
        delPlanAPI(props.plan.goalId)
        .then((res) => {
          dispatch(modifyPlanSliceActions.responsePlans(JSON.stringify(res)))
        })
        .catch((err) => {
          console.log('PlanItem : delPlanAPI => ', err)
        })
    
    }

    const AskDeleteForm = (props) => {
        return (
          <div style={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <img style={{width:'140px', height:'auto', marginBottom: '12px'}} src={warning} />
            <div>
              <p style={{lineHeight: '40%'}}>삭제 시 복구할 수 없습니다.</p>
              <p style={{lineHeight: '40%'}}>정말로 삭제 하시겠습니까?</p>
            </div>
            <div style={{width:'100%', display:'flex', justifyContent:'space-evenly', marginTop:'12px'}}>
              <Button className={styles['modal-button']} onClick={props.modalHandler}>취소</Button>
              <Button className={`${styles['modal-button']} ${styles['modal-delete']}`} onClick={() => {deletePlan(); props.modalHandler()}}>삭제</Button>
            </div>
          </div>
        )
      }
    

    

    const deleteButton = (
        <div onClick={() => {setAskDeleteState(true)}} className={styles['delete-button']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-x" viewBox="0 0 16 16">
                <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z"/>
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
            </svg>
        </div>
    )


    return (
        <div className={styles['form-wrapper']}>
            <FixedModal modalState={askDeleteState} stateHandler={setAskDeleteState} content={<AskDeleteForm />} width={'340px'} height={'310px'} />
            {doneNotiState && <NotiDeliverer content={<ErrorMessage />} stateHandler={setDoneNotiState} duration={5000} width={400} />}
            <div className={styles['title-wrapper']}>
                {props.plan ? '목표 수정' : '목표 생성'}
                {props.plan && deleteButton}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <ThemeProvider theme={customTheme}>

                    <TextField onChange={titleChangeHandler} value={title} id="outlined-basic" label="타이틀" variant="outlined" sx={{width:'100%', paddingBottom:'24px'}}/>
                    <Stack spacing={3}>
                        <MobileDatePicker
                            label="시작일"
                            value={startDate}
                            maxDate={endDate}
                            onChange={startDateChangeHandler}
                            renderInput={(params) => <TextField {...params} sx={{width:'100%', paddingBottom:'24px'}} />}
                        />
                    </Stack>
                    <Stack spacing={3}>
                        <MobileDatePicker
                            label="마감일"
                            value={endDate}
                            minDate={startDate}
                            onChange={endDateChangeHandler}
                            renderInput={(params) => <TextField {...params} sx={{width:'100%', paddingBottom:'24px'}} />}
                        />
                    </Stack>
                </ThemeProvider>
            </LocalizationProvider>
            
            <footer className={styles['footer']}>
                <Button className={styles['button']} onClick={() => {props.modalHandler()}}>취소</Button>
                <Button onClick={submitHandler} className={styles['button']}>{props.plan ? '수정' : '생성'}</Button>
            </footer>
        </div>
    )
}

export default PlanCardPlanCRUD