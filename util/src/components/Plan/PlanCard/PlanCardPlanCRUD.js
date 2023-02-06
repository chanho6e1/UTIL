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
    const [startDate, setStartDate] = useState(props.plan ? toStringByFormatting(new Date(props.plan.startDate)) : today)
    const [endDate, setEndDate] = useState(props.plan ? toStringByFormatting(new Date(props.plan.startDate)) : null)

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
      
    }


    return (
        <div className={styles['form-wrapper']}>
            <div className={styles['title-wrapper']}>
            {props.plan ? '목표 수정' : '목표 생성'}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <ThemeProvider theme={customTheme}>

                    <TextField onChange={titleChangeHandler} value={title} id="outlined-basic" label="타이틀" variant="outlined" sx={{width:'100%', paddingBottom:'24px'}}/>
                    <Stack spacing={3}>
                        <MobileDatePicker
                            label="시작일"
                            value={startDate}
                            onChange={startDateChangeHandler}
                            renderInput={(params) => <TextField {...params} sx={{width:'100%', paddingBottom:'24px'}} />}
                        />
                    </Stack>
                    <Stack spacing={3}>
                        <MobileDatePicker
                            label="마감일"
                            value={endDate}
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