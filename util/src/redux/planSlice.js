import { createSlice } from "@reduxjs/toolkit"



// 초기 State 선언
const initialSliceState = {
  plans: [
    {name:'test', period:15, startDate:new Date('2023-01-15'), endDate:new Date('2023-01-20')},
  ],
}

const modifyPlanSlice = createSlice({
  name: 'modifyPlanSlice',
  initialState: initialSliceState,
  reducers: {
    modifyStartDate(state, action) {
      state.plans[action.payload.idx].startDate = action.payload.updatedDate
    },
    modifyEndDate(state, action) {
      state.plans[action.payload.idx].endDate = action.payload.updatedDate
    },
  }
})

// Redux를 Slice 단위로 분할하였으므로 아래의 구문 또한 작성
export const modifyPlanSliceActions = modifyPlanSlice.actions

export default modifyPlanSlice.reducer