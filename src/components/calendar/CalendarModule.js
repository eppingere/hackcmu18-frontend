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
  padding: 16px;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  padding: 12px;
`

const Expand = styled.div`
  flex: 1 1 auto;
`

function hexToRgb(hex) {
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

function lerp (value1, value2, amount) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}

function clamp (value, min, max) {

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
    this.props.getSchedule ()
  }

  render () {
    return (
      <Frame>
        {
          this.props.schedule.map(d => (
            <Day key={d.id}>
              <Title>{moment(d.date).format('dddd')}</Title>
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
                  <p>{t.title}</p>
                  <p>{t.time} Hours</p>
                </div>
                              </TimeBlock>
                ))
              }
              <Expand />
            </Day>
          ))
        }
      </Frame>
    )
  }
}

CalendarModule.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object),
  getSchedule: PropTypes.func
}

export default connectCalendar(CalendarModule)
