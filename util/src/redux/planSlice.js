import { createSlice } from "@reduxjs/toolkit"



// 초기 State 선언
const initialSliceState = {
  plans: [
    {goalId: 0, title:'자바스크립트 공부abcdefghijklmnopqrstuvwxyz', startDate: new Date('2023-01-1').toString(), endDate: new Date('2023-02-18').toString()},
    {goalId: 1, title:'리액트 트랙', startDate: new Date('2023-1-16').toString(), endDate: new Date('2023-04-25').toString()},
    {goalId: 2, title:'공통 프로젝트 진행', startDate: new Date('2023-03-1').toString(), endDate: new Date('2023-05-11').toString()},
    {goalId: 3, title:'포트폴리오 작성', startDate: new Date('2023-04-1').toString(), endDate: new Date('2023-05-03').toString()},
    {goalId: 4, title:'개인 과제 분배', startDate: new Date('2023-02-1').toString(), endDate: new Date('2023-04-13').toString()},
    {goalId: 5, title:'취업현황 조사', startDate: new Date('2023-02-17').toString(), endDate: new Date('2023-03-27').toString()},
    
    // {goalId: 6, title:'자바스크립트 공부', startDate: new Date('2023-01-1').toString(), endDate: new Date('2023-02-18').toString()},
    // {goalId: 7, title:'리액트 트랙', startDate: new Date('2023-1-16').toString(), endDate: new Date('2023-04-25').toString()},
    // {goalId: 8, title:'공통 프로젝트 진행', startDate: new Date('2023-03-1').toString(), endDate: new Date('2023-05-11').toString()},
    // {goalId: 9, title:'포트폴리오 작성', startDate: new Date('2023-04-1').toString(), endDate: new Date('2023-05-03').toString()},
    // {goalId: 10, title:'개인 과제 분배', startDate: new Date('2023-02-1').toString(), endDate: new Date('2023-04-13').toString()},
    // {goalId: 11, title:'취업현황 조사', startDate: new Date('2023-02-17').toString(), endDate: new Date('2023-03-27').toString()},
    // {goalId: 12, title:'자바스크립트 공부', startDate: new Date('2023-01-1').toString(), endDate: new Date('2023-02-18').toString()},
    // {goalId: 13, title:'리액트 트랙', startDate: new Date('2023-1-16').toString(), endDate: new Date('2023-04-25').toString()},
    // {goalId: 14, title:'공통 프로젝트 진행', startDate: new Date('2023-03-1').toString(), endDate: new Date('2023-05-11').toString()},
    // {goalId: 15, title:'포트폴리오 작성', startDate: new Date('2023-04-1').toString(), endDate: new Date('2023-05-03').toString()},
    // {goalId: 16, title:'개인 과제 분배', startDate: new Date('2023-02-1').toString(), endDate: new Date('2023-04-13').toString()},
    // {goalId: 17, title:'취업현황 조사', startDate: new Date('2023-02-17').toString(), endDate: new Date('2023-03-27').toString()},
  ],
  todos: {
    1: [{
      todoId : 1,
      title : "Track1 : useState abcdefghijklmnop",
      isDone : true,
      dueDate : "2023-01-19",
      description : "Track1 PDF 25p ~ 37p"
    },
    {
      todoId : 2,
      title : "Track2 : useRef",
      isDone : false,
      dueDate : "2023-01-20",
      description : "Track2 PDF 38p ~ 45p"
    },]
  }
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