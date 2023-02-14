import { createSlice } from "@reduxjs/toolkit"



// 초기 State 선언
const initialSliceState = {
  stack: {

  },
  fixed: [
    
  ]
}

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: initialSliceState,
  reducers: {
    push(state, action) {
      const parsedPayload = action.payload
      state.stack[parsedPayload.key] = parsedPayload.value
    },
    delete(state, action) {
      const parsedPayload = JSON.parse(action.payload)
      delete state.stack[parsedPayload]
    },
    fixedPush(state, action) {
      const parsedPayload = action.payload
      state.fixed.push(parsedPayload.value)
    },
    fixedDelete(state, action) {
      const parsedPayload = JSON.parse(action.payload)
      delete state.fixed[parsedPayload]
    }

  }
})

// Redux를 Slice 단위로 분할하였으므로 아래의 구문 또한 작성
export const notificationSliceActions = notificationSlice.actions

export default notificationSlice.reducer