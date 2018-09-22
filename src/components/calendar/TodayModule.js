import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import { connectCalendar } from '@/reducers/modules/cal'
import { hexToRgb } from '@/components/calendar/CalendarModule'
import PropTypes from 'prop-types'

const Frame = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 36px;
  padding: 32px;
`

const TodayContent = styled.div`
  font-size: 14px;
  padding: 16px 48px;
`

class TodayModule extends React.Component {
  constructor (props) {
    super (props)
  }

  componentDidMount () {
    const self = this
    self.props.getCourses ().then(() => {
      self.props.getTodos ().then(() => {
        self.props.getSchedule ()
      })
    })
  }

  render () {
    const t1 = moment().startOf('day')
    const t2 = t1.clone().add(1, 'days')
    const t3 = t2.clone().add(1, 'days')
    const t4 = t3.clone().add(1, 'days')

    const times = [t1, t2, t3, t4]

    const remote = this.props.schedule

    const schedule = Array.from(Array(4).keys()).map(i => {
      return {
        id: i,
        date: times[i],
        tasks: [],
        due: []
      }
    })

    const dateMap = {
      '2018-09-22': 0,
      '2018-09-23': 1,
      '2018-09-24': 2,
      '2018-09-25': 3
    }

    const self = this

    Object.keys(remote).forEach(k => {
      const value = remote[k]
      Object.keys(value).forEach(date => {
        const idx = dateMap[date]
        const hours = value[date]

        const assignment = self.props.todos.find(e => e.id === k)


        const course = self.props.courses.find(c => c.id === assignment.course)

        if (hours !== 0) {
          schedule[idx].tasks.push({
            id: k,
            title: assignment.name,
            course: course.id,
            time: hours,
            color: course.color
          })
        }
      })
    })

    this.props.todos.forEach(t => {
      const course = self.props.courses.find(c => c.id === t.course)

      const due = moment(t.due).startOf('day').format('Y-MM-D')

      const idx = dateMap[due]

      schedule[idx].due.push({
        id: t.id,
        title: t.name,
        /* color: '#00FF00' */
        color: course.color
      })
    })

    const today = schedule[0]

    const sum = today.tasks.reduce((acc, val) => val.time + acc, 0)

    return (
      <Frame>
        <Title>Today</Title>
        <TodayContent>
          <p>You have {today.due.length} assignments due today.</p>
          <p>With {today.tasks.length} todos, you are working {sum} hours in total.</p>
          <br />
          {
            today.tasks.map(t => {return {
              ...t,
              color: hexToRgb (t.color)
            }}).map(t => (
              <React.Fragment key={t.id}>
              <div style={{
                backgroundColor: `rgba(${t.color.r}, ${t.color.g}, ${t.color.b}, 8)`,
                height: '4px',
                width: '100%'
              }} />
              <div key={t.id} style={{
                backgroundColor: `rgba(${t.color.r}, ${t.color.g}, ${t.color.b}, 0.3)`,
                padding: '16px',
                margin: '0 0 8px 0',
                height: '80px'
              }}>
                <p><b>{t.title}</b> - {t.course}</p>
                <p>{t.time} Hours</p>
              </div>
              </React.Fragment>
            ))
          }
        </TodayContent>
      </Frame>
    )
  }
}

TodayModule.propTypes = {
  schedule: PropTypes.object,
  getSchedule: PropTypes.func,
  getCourses: PropTypes.func,
  courses: PropTypes.arrayOf(PropTypes.object),
  todos: PropTypes.arrayOf(PropTypes.object),
  getTodos: PropTypes.func
}


export default connectCalendar(TodayModule)
