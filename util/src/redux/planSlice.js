import { createSlice } from "@reduxjs/toolkit";

// 초기 State 선언
const initialSliceState = {
  plans: null,
  allPlans: null,
  posts: null,
  todos: [],
  todayTodos: [],
  todosPeriod: {},
  reviews: {},
  tils: {},
  comments: {},
};

const modifyPlanSlice = createSlice({
  name: "modifyPlanSlice",
  initialState: initialSliceState,
  reducers: {
    responsePlans(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.plans = parsedPayload;
    },
    responseAllPlans(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.allPlans = parsedPayload;
    },
    responseTodos(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.todos[parsedPayload.goalId] = parsedPayload.data;
    },
    responseTodayTodos(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.todayTodos = parsedPayload;
    },
    responseReviews(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.reviews[parsedPayload.goalId] = parsedPayload.data;
    },
    responseTils(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.tils[parsedPayload.goalId] = parsedPayload.data;
    },
    responsePosts(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.posts = parsedPayload;
    },
    responseComments(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.comments[parsedPayload.postId] = parsedPayload.data;
    },
    deleteComments(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.comments.splice(parsedPayload, 1);
    },
    responseTodosPeriod(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.todosPeriod = parsedPayload[0];
    },
    responseTodoPeriod(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.todosPeriod[parsedPayload.goalId] =
        parsedPayload.data[parsedPayload.goalId];
    },
    deletePlan(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.plans.splice(parsedPayload, 1);
    },
    modifyStartDate(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.plans[parsedPayload.idx].startDate = parsedPayload.updatedDate;
    },
    modifyEndDate(state, action) {
      const parsedPayload = JSON.parse(action.payload);
      state.plans[parsedPayload.idx].endDate = parsedPayload.updatedDate;
    },
  },
});

// Redux를 Slice 단위로 분할하였으므로 아래의 구문 또한 작성
export const modifyPlanSliceActions = modifyPlanSlice.actions;

export default modifyPlanSlice.reducer;
