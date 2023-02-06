import React from 'react';
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


const PlanCardTodoCRUD = (props) => {
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


    return (
        <div className={styles['form-wrapper']}>
            <div className={styles['title-wrapper']}>
                TODO 생성
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <ThemeProvider theme={customTheme}>

                    <TextField id="outlined-basic" label="타이틀" variant="outlined" sx={{width:'100%', paddingBottom:'24px'}}/>
                    <TextField id="outlined-basic" label="메모" variant="outlined" sx={{width:'100%', paddingBottom:'24px'}} multiline />
                    <Stack spacing={3}>
                        <MobileDatePicker
                        label="날짜"
                        value={today}
                        onChange={(newValue) => {
                            // setValue(newValue);
                        }}
                        
                        renderInput={(params) => <TextField {...params} sx={{width:'100%', paddingBottom:'24px'}} />}
                        />
                    </Stack>
                </ThemeProvider>
            </LocalizationProvider>
            
            <footer className={styles['footer']}>
                <Button className={styles['button']} onClick={() => {props.modalHandler()}}>취소</Button>
                <Button className={styles['button']}>생성</Button>
            </footer>
        </div>
    )
}

export default PlanCardTodoCRUD