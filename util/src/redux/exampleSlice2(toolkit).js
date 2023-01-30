import { createSlice } from "@reduxjs/toolkit"

const initialSlice2State = {
  data3: [1, 2, 3],
}

const exampleSlice2 = createSlice({
  name: 'exampleSlice2',
  initialState: initialSlice2State,
  reducers: {
    pushToData3(state) {
      const lastIndex = state.data3.length - 1
      state.data3.push(state.data3[lastIndex] + 1)
    },
  }

})

// Redux를 Slice 단위로 분할하였으므로 아래의 구문 또한 작성
export const exampleSlice2Actions = exampleSlice2.actions

export default exampleSlice2.reducer