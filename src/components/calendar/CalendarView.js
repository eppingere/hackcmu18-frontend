import React from 'react'
import styled from 'styled-components'

import { connectCalendar } from '@/reducers/modules/calendar'

const Frame = styled.div`
  display: flex;
`
const CalendarView = () => {
  return (
    <Frame></Frame>
  )
}

CalendarView.propTypes = {
  
}

export default connectCalendar(CalendarView)
