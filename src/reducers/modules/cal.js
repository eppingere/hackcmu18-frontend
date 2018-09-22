import { genModule, packModule } from '@/reducers/module'

import * as api from '@/services/api'

const SET_COURSES = 'SET_COURSES'
const ADD_COURSE = 'ADD_COURSE'
const REMOVE_COURSE = 'REMOVE_COURSE'

const SET_TODOS = 'SET_TODOS'
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'

const SET_SCHEDULE = 'SET_SCHEDULE'

const {state, reducer: genReducer, actions: genActions} = genModule({
  courses: {
    value: [],
    type: SET_COURSES,
    action: 'setCourses'
  },
  todos: {
    value: [],
    type: SET_TODOS,
    action: 'setTodos'
  },
  schedule: {
    value: {},
    type: SET_SCHEDULE,
    action: 'setSchedule'
  }
})

export const module = packModule({
  state, reducer: {
    ...genReducer,
    [ADD_COURSE] (state, {course}) {
      return {
        ...state,
        courses: [...state.courses, course]
      }
    },
    [REMOVE_COURSE] (state, {id}) {
      return {
        ...state,
        courses: state.courses.filter(x => x.id !== id)
      }
    },
    [ADD_TODO] (state, {todo}) {
      return {
        ...state,
        todos: [...state.todos, todo]
      }
    },
    [REMOVE_TODO] (state, {id}) {
      return {
        ...state,
        todos: state.todos.filter(x => x.id !== id)
      }
    }
  },
  name: 'cal',
  actions: {
    ...genActions,
    addCourse (course) {
      return {
        type: ADD_COURSE,
        course
      }
    },
    removeCourse (id) {
      return {
        type: REMOVE_COURSE,
        id
      }
    },
    addTodo (todo) {
      return {
        type: ADD_TODO,
        todo
      }
    },
    removeTodo (id) {
      return {
        type: REMOVE_TODO,
        id
      }
    }
  }
})

const a = module.actions

const getSchedule = () => dispatch => api.getSchedule ().then (result =>
  dispatch (a.setSchedule (result.data))
)

const getCourses = () => dispatch => api.getCourses ().then (result =>
  dispatch (a.setCourses (result.data))
)

const addCourse = course => dispatch => {
  dispatch(a.addCourse (course))
  api.addCourse (course).then (() =>
    api.getCourses () (dispatch)
  ).catch(() => dispatch (a.removeCourse (course.id)))
}

const removeCourse = id => dispatch => {
  api.removeCourse (id).then (() =>
    api.getCourses () (dispatch)
  )
}

const getTodos = () => dispatch => api.getTodos ().then (result =>
  dispatch (a.setTodos (result.data))
)

const addTodo = todo => dispatch => {
  dispatch (a.addTodo (todo))
  api.addTodo (todo).then (() =>
    api.getTodos () (dispatch)
  ).catch(() => dispatch (a.removeTodo (todo.id)))
}

const removeTodo = id => dispatch => {
  api.removeTodo (id).then (() =>
    api.getTodos () (dispatch)
  )
}

export const connectCalendar = module.connect ({
  getSchedule, getCourses, addCourse, removeCourse, getTodos, addTodo, removeTodo
})
