import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import { connectCalendar } from '@/reducers/modules/cal'
import PropTypes from 'prop-types'

const Frame = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow-x: scroll;
`

const Day = styled.div`
  flex: 1 1 200px;
  flex-direction: column;
  overflow-y: scroll;
  border-right: 1px #EEEEEE solid;
`

const TimeBlock = styled.div`
  flex: none;
  padding: 8px;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  padding: 12px;
`

const Expand = styled.div`
  flex: 1 1 auto;
`

const DueBlocks = styled.div`
  flex: none;
  font-size: 10px;
  height: 32px;
  overflow: scroll;
`

const DueBlock = styled.div`
  padding: 2px 0;
`

export function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function lerp (value1, value2, amount) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}

export function clamp (value, min, max) {

  if (value < min) {
    return min;
  }
  else if (value > max) {
    return max;
  }

  return value;
}

class CalendarModule extends React.Component {
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

    return (
      <Frame>
        {
        schedule.map(d => (
        <Day key={d.id}>
          <Title>{moment(d.date).format('dddd')}</Title>
          <DueBlocks>
            {d.due.map(t => {return {
            ...t,
            color: hexToRgb (t.color)
            }}).map(e => (
            <DueBlock key={e.id}>
              <div style={{
                backgroundColor: `rgba(${e.color.r}, ${e.color.g}, ${e.color.b}, 0.6)`,
                width: '100%',
                padding: '1px 6px'
                }}>
                {e.title} Due
              </div>
            </DueBlock>
            ))}
          </DueBlocks>
          {
          d.tasks.map(t => {return {
          ...t,
          color: hexToRgb (t.color)
          }}).map(t => (
          <TimeBlock key={t.id}>
            <div style={{
            backgroundColor: `rgba(${t.color.r}, ${t.color.g}, ${t.color.b}, 8)`,
            height: '4px',
            width: '100%'
            }} />
            <div style={{
              backgroundColor: `rgba(${t.color.r}, ${t.color.g}, ${t.color.b}, 0.3)`,
              padding: '16px',
              height: clamp (lerp (50, 600, t.time / 12), 80, 800) + 'px'
              }}>
              <p><b>{t.title}</b> - {t.course}</p>
              <p>{t.time} Hours</p>
            </div>
          </TimeBlock>
          ))
          }
          <Expand />
        </Day>
        )
        )
      }
      </Frame>
    )
  }
}

CalendarModule.propTypes = {
  schedule: PropTypes.object,
  getSchedule: PropTypes.func,
  getCourses: PropTypes.func,
  courses: PropTypes.arrayOf(PropTypes.object),
  todos: PropTypes.arrayOf(PropTypes.object),
  getTodos: PropTypes.func
}

export default connectCalendar(CalendarModule)
