import { createSlice } from "@reduxjs/toolkit"

const initialSliceState = {
  userAuth: {
    authenticated: false,
    currentUser: null,
    token: null,
    loading: true,
  }
}

const userAuthSlice = createSlice({
  name: 'userAuthSlice',
  initialState: initialSliceState,
  reducers: {
    changeAuthenticated(state, action) {
      const parsedPayload = JSON.parse(action.payload)
      state.userAuth.authenticated = parsedPayload
    },
    changeCurrentUser(state, action) {
      const parsedPayload = JSON.parse(action.payload)
      state.userAuth.currentUser = parsedPayload
    },
    changeLoading(state, action) {
      const parsedPayload = JSON.parse(action.payload)
      state.userAuth.loading = parsedPayload
    },
    changeToken(state, action) {
      // const parsedPayload = JSON.parse(action.payload)
      state.userAuth.token = action.payload
    }
  }

})

// Redux를 Slice 단위로 분할하였으므로 아래의 구문 또한 작성
export const userAuthSliceActions = userAuthSlice.actions

export default userAuthSlice.reducer