import React from 'react'
import styled from 'styled-components'

import PropTypes from 'prop-types'
import { connectCalendar } from '@/reducers/modules/cal'

const Frame = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 36px;
  padding: 32px;
`

class TodayModule extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <Frame>
        <Title>Today</Title>
        
      </Frame>
    )
  }
}

TodayModule.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.object)
}

export default connectCalendar(TodayModule)
