import axios from 'axios'
import moment from 'moment'

export const getSchedule = () => axios.get('/schedule')
/* export const getSchedule = () => new Promise((resolve, reject) => (
 *   resolve ({
 *     data: [
 *       {
 *         id: Math.random(),
 *         date: moment('2018-09-22T17:40:19.397Z').format(),
 *         tasks: [
 *           {
 *             id: Math.random(),
 *             color: '#0aaf0d',
 *             title: '151 HW',
 *             time: 4
 *           },
 * 
 *           {
 *             id: Math.random(),
 *             color: '#0aaf0d',
 *             title: '151 HW',
 *             time: 3
 *           }
 *         ]
 *       },
 *       {
 *         id: Math.random(),
 *         date: moment('2018-09-22T17:40:19.397Z').format(),
 *         tasks: [
 *           {
 *             id: Math.random(),
 *             color: '#0aaf0d',
 *             title: '151 HW',
 *             time: 4
 *           },
 * 
 *           {
 *             id: Math.random(),
 *             color: '#0aaf0d',
 *             title: '151 HW',
 *             time: 3
 *           }
 *         ]
 *       },
 *       {
 *         id: Math.random(),
 *         date: moment('2018-09-22T17:40:19.397Z').format(),
 *         tasks: [
 *           {
 *             id: Math.random(),
 *             color: '#0aaf0d',
 *             title: '151 HW',
 *             time: 4
 *           },
 * 
 *           {
 *             id: Math.random(),
 *             color: '#0aaf0d',
 *             title: '151 HW',
 *             time: 3
 *           }
 *         ]
 *       },
 *       {
 *         id: Math.random(),
 *         date: moment('2018-09-22T17:40:19.397Z').format(),
 *         tasks: [
 *           {
 *             id: Math.random(),
 *             color: '#0aaf0d',
 *             title: '151 HW',
 *             time: 4
 *           },
 * 
 *           {
 *             id: Math.random(),
 *             color: '#0aaf0d',
 *             title: '151 HW',
 *             time: 3
 *           }
 *         ]
 *       }
 *     ]
 *   })
 * )) */

export const getCourses = () => axios.get('/course')
/* export const getCourses = () => new Promise ((resolve, reject) => {
 *   resolve ({
 *     data: [
 *       {
 *         id: Math.random(),
 *         color: '#0aaf0d',
 *         title: '15-151',
 *         description: 'The Best',
 *         hours: 9
 *       },
 *       {
 *         id: Math.random(),
 *         color: '#9eb9d4',
 *         title: '15-251',
 *         description: 'The Best',
 *         hours: 9
 *       },
 *       {
 *         id: Math.random(),
 *         color: '#ffc800',
 *         title: '11-701',
 *         description: 'The Best',
 *         hours: 9
 *       },
 *       {
 *         id: Math.random(),
 *         color: '#fd3f92',
 *         title: '15-210',
 *         description: 'The Best',
 *         hours: 9
 *       }
 *     ]
 *   })
 * }) */

export const getTodos = () => axios.get('/assignment')

/* export const addCourse = course => axios.post('/course', course) */
export const addCourse = course => new Promise ((resolve, reject) => (
  resolve ()
))

export const removeCourse = id => axios.delete(`/course/${id}`)

export const addTodo = todo => axios.post('/todo', todo)

export const removeTodo = id => axios.delete(`/todo/${id}`)

