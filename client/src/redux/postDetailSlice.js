import { createSlice } from "@reduxjs/toolkit";

// 초기 State 선언
const initialPostDetailSliceState = {
  plans: null,
  posts: null,
  todos: {},
  reviews: {},
  tils: {},
  comments: {},
};

const modifyPostDetailSlice = createSlice({
  name: "modifyPostDetailSlice",
  initialState: initialPostDetailSliceState,
  reducers: {
    getPlans(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.plans = parsedPayload;
    },
    getTodos(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.todos[parsedPayload.goalId] = parsedPayload.data;
    },
    getReviews(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.reviews[parsedPayload.goalId] = parsedPayload.data;
    },
    getTils(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.tils[parsedPayload.goalId] = parsedPayload.data;
    },
    getPosts(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.posts = parsedPayload;
    },
    // getPosts(state, action) {
    //   const parsedPayload = JSON.parse(action.payload)
    //   state.posts[parsedPayload.goalId] = parsedPayload.data
    // },
    getComments(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.comments[parsedPayload.postId] = parsedPayload.data;
    },
  },
});

// Redux를 Slice 단위로 분할하였으므로 아래의 구문 또한 작성
export const modifyPostDetailSliceActions = modifyPostDetailSlice.actions;

export default modifyPostDetailSlice.reducer;
