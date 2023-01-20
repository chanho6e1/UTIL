import { createSlice } from "@reduxjs/toolkit"



// 초기 State 선언
const initialSliceState = {
  plans: [
    {title:'자바스크립트 공부', startDate: new Date('2023-01-1').toString(), endDate: new Date('2023-05-11').toString()},
    {title:'리액트 트랙', startDate: new Date('2023-1-16').toString(), endDate: new Date('2023-05-11').toString()},
    {title:'공통 프로젝트 진행', startDate: new Date('2023-03-1').toString(), endDate: new Date('2023-05-11').toString()},
    {title:'포트폴리오 작성', startDate: new Date('2023-04-1').toString(), endDate: new Date('2023-05-11').toString()},
  ],
}

const modifyPlanSlice = createSlice({
  name: 'modifyPlanSlice',
  initialState: initialSliceState,
  reducers: {
    modifyStartDate(state, action) {
      const parsedPayload = JSON.parse(action.payload)
      state.plans[parsedPayload.idx].startDate = parsedPayload.updatedDate
    },
    modifyEndDate(state, action) {
      const parsedPayload = JSON.parse(action.payload)
      state.plans[parsedPayload.idx].endDate = parsedPayload.updatedDate
    },
  }
})

// Redux를 Slice 단위로 분할하였으므로 아래의 구문 또한 작성
export const modifyPlanSliceActions = modifyPlanSlice.actions

export default modifyPlanSlice.reducer