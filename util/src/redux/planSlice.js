import { createSlice } from "@reduxjs/toolkit"



// 초기 State 선언
const initialSliceState = {
  plans: [
    {name:'test2', startDate: new Date('2023-01-1').toString(), endDate: new Date('2023-05-11').toString()},
    {name:'test2', startDate: new Date('2023-1-16').toString(), endDate: new Date('2023-05-11').toString()},
    {name:'test3', startDate: new Date('2023-03-1').toString(), endDate: new Date('2023-05-11').toString()},
    {name:'test4', startDate: new Date('2023-04-1').toString(), endDate: new Date('2023-05-11').toString()},
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