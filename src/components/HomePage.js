import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import CalendarModule from '@/components/calendar/CalendarModule'
import CourseModule from '@/components/course/CourseModule'
import DatePicker from '@/components/course/DatePicker'
import TodayModule from '@/components/calendar/TodayModule'

const Frame = styled.div `
  display: flex;
  flex: 1 1 auto;
  position: relative;
`

const Filler = styled.div`
  flex: 1 1 auto;
`

const SideBar = styled.div`
flex: 0 0 180px;
box-shadow: 0 3px 1px -2px rgba(0,0,0,.1),
      0 2px 2px 0 rgba(0,0,0,.06),
      0 1px 5px 0 rgba(0,0,0,.05);
display: flex;
flex-direction: column;
z-index: 1;
background-color: #FFFFFF;
`

const Calendar = styled.div`
flex: 4 4 auto;
display: flex;
flex-direction: column;
`

const CurrentMonth = styled.div`
flex: none;
font-weight: 700;
font-size: 26px;
padding: 16px;
box-shadow: 0 3px 1px -2px rgba(0,0,0,.08),
      0 2px 2px 0 rgba(0,0,0,.03),
      0 1px 5px 0 rgba(0,0,0,.02);
`

const Today = styled.div`
/* position: absolute; */
/* right: 0;
 * top: 0;
 * bottom: 0; */
flex: 1 1 250px;
/* min-width: 300px; */
box-shadow: 0 3px 1px -2px rgba(0,0,0,.1),
      0 2px 2px 0 rgba(0,0,0,.06),
      0 1px 5px 0 rgba(0,0,0,.05);
display: flex;
flex-direction: row;
z-index: 1;
background-color: #FFFFFF;
`

const HomePage = () => {
  return (<Frame>
    <SideBar>
      <CourseModule />
      <Filler />
      <DatePicker />
    </SideBar>
    <Calendar>
      <CurrentMonth>{moment().format('MMMM')}</CurrentMonth>
      <CalendarModule />
    </Calendar>
    <Today>
      <TodayModule />
    </Today>
  </Frame>)
};


export default HomePage;
