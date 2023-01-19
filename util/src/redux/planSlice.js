import { createSlice } from "@reduxjs/toolkit"



// 초기 State 선언
const initialSliceState = {
  plans: [
    {name:'test1', startDate: new Date('2023-01-6').toString(), endDate: new Date('2023-01-20').toString()},
    {name:'test2', startDate: new Date('2023-01-10').toString(), endDate: new Date('2023-03-02').toString()},
    {name:'test3', startDate: new Date('2023-02-07').toString(), endDate: new Date('2023-2-15').toString()},
    {name:'test4', startDate: new Date('2023-03-02').toString(), endDate: new Date('2023-04-11').toString()},
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