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
import styles from './PlanCardTodoCRUD.module.css'
import { styled, createTheme, ThemeProvider } from '@mui/material';
import Button from '../../UI/Button/Button';
import { editTodoAPI } from '../../../api/Plan/editTodoAPI';
import { modifyPlanSliceActions } from '../../../redux/planSlice'
import { useSelector, useDispatch } from 'react-redux'
import { newTodoAPI } from '../../../api/Plan/newTodoAPI';
import { recvTodoPeriodAPI } from '../../../api/Plan/recvTodoPeriodAPI';



const PlanCardTodoCRUD = (props) => {
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


    const startDate = toStringByFormatting(new Date(props.plan.startDate))

    const [title, setTitle] = useState(props.todo ? props.todo.title : null)
    const [description, setDescription] = useState(props.todo ? props.todo.description : null)
    const [dueDate, setDueDate] = useState(props.todo ? toStringByFormatting(new Date(props.todo.dueDate)) : startDate)

    const titleChangeHandler = (event) => {
        setTitle(() => event.target.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(() => event.target.value)
    }

    const dueDateChangeHandler = (value) => {
        setDueDate(() => value)
    }

    const submitHandler = () => {
        const processing = {
            title: title,
            description: description,
            state: props.todo ? props.todo.state : null,
            dueDate: dueDate,
        }
        if (props.todo) {
            
            editTodoAPI(props.todo.todoId, props.plan.goalId, processing)
            .then((res) => {
                const proccessing = {
                    goalId: props.plan.goalId,
                    data: res
                }
                dispatch(modifyPlanSliceActions.responseTodos(JSON.stringify(proccessing)))
            })
            .then((res) => {
                props.modalHandler()
            })
            .catch((err) => {
                console.log('PlanCardTodoCRUD : editTodoAPI => ', err)
            })

        } else {
            newTodoAPI(props.plan.goalId, processing)
            .then((res) => {
                const processing = {
                    goalId: props.plan.goalId,
                    data: res
                }
                dispatch(modifyPlanSliceActions.responseTodos(JSON.stringify(processing)))
            })
            .then((res) => {
                recvTodoPeriodAPI(props.plan.goalId)
                .then((res) => {
                    const processing = {
                        goalId: props.plan.goalId,
                        data: res
                    }
                    dispatch(modifyPlanSliceActions.responseTodoPeriod(JSON.stringify(processing)))
                    props.modalHandler()
                })
                .catch((err) => {
                    console.log('PlanCardTodoCRUD : recvTodoPeriodAPI => ', err)
                })
    
            })
            .catch((err) => {
                console.log('PlanCardTodoCRUD : newTodoAPI => ', err)
    
                // if (err.response.data.message == "todo 날짜가 목표 범위 벗어남") {
                //     setNotiState(true)
                // }
                
            })
        }
    }


    return (
        <div className={styles['form-wrapper']}>
            <div className={styles['title-wrapper']}>
            {props.todo ? 'TODO 수정' : 'TODO 생성'}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <ThemeProvider theme={customTheme}>

                    <TextField onChange={titleChangeHandler} value={title} id="outlined-basic" label="타이틀" variant="outlined" sx={{width:'100%', paddingBottom:'24px'}}/>
                    <TextField onChange={descriptionChangeHandler} value={description} id="outlined-basic" label="메모" variant="outlined" sx={{width:'100%', paddingBottom:'24px'}} multiline />
                    <Stack spacing={3}>
                        <MobileDatePicker
                        label="날짜"
                        minDate={toStringByFormatting(new Date(props.plan.startDate))}
                        maxDate={toStringByFormatting(new Date(props.plan.endDate))}
                        value={dueDate}
                        onChange={dueDateChangeHandler}
                        
                        renderInput={(params) => <TextField {...params} sx={{width:'100%', paddingBottom:'24px'}} />}
                        />
                    </Stack>
                </ThemeProvider>
            </LocalizationProvider>
            
            <footer className={styles['footer']}>
                <Button className={styles['button']} onClick={() => {props.modalHandler()}}>취소</Button>
                <Button onClick={submitHandler} className={styles['button']}>{props.todo ? '수정' : '생성'}</Button>
            </footer>
        </div>
    )
}

export default PlanCardTodoCRUD