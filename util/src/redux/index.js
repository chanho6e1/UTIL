// Redux toolkit
// Redux를 좀 더 간편하고 직관적으로 사용할 수 있게 만들어주는 toolkit

import { createStore } from 'redux'

// Redux toolkit을 import
import { createSlice, configureStore } from '@reduxjs/toolkit'


// -------------------------------------------------------------------------------------------------------
// 아래의 구문들은 redux store를 Slice 단위로 분할하여 관리할 때의 경우
// Slice 단위로 분할하였으므로 import
// 별칭으로 import : exampleSlice1Reducer, exampleSlice2Reducer
import planSliceReducer from './planSlice'
import userAuthReducer from './userAuthSlice'
// import exampleSlice2Reducer from './exampleSlice2(toolkit)'
// -------------------------------------------------------------------------------------------------------


// store 상수에 exampleSlice의 Reducer함수를 store형식으로 정의
// configureStore은 여러개의 Reducer함수를 합칠 수 있게 한다.
const store = configureStore({
  // 주의할 점은 이때 키의 이름(여기서는 example1, example2)은 Redux를 사용하는 컴포넌트에서 useSelector로 값을 읽어올 때 사용된다.
  // 아래의 구문은 redux store를 Slice 단위로 분할하여 관리할 때의 경우
  // import할 때에 별칭(exampleSlice1Reducer, exampleSlice2Reducer)으로 import하였으므로 그대로 사용한다.
  reducer: {
    planSlice: planSliceReducer,
    userAuthSlice: userAuthReducer
  }


})




export default store

