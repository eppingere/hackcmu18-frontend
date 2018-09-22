import axios from 'axios'

export const getSchedule = () => axios.get('/schedule')

export const getCourses = () => axios.get('/courses')

export const getTodos = () => axios.get('/todos')

export const addCourse = course => axios.post('/courses', course)

export const removeCourse = id => axios.delete(`/courses/${id}`)

export const addTodo = todo => axios.post('/todo', todo)

export const removeTodo = id => axios.delete(`/todo/${id}`)

