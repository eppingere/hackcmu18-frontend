import { Button, Icon, Input, List, Modal } from 'semantic-ui-react'
import React from 'react'
import styled from 'styled-components'

import { connectCalendar } from '@/reducers/modules/cal'
import PropTypes from 'prop-types'

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`

const Padded = styled.div`
  padding: 16px;
`

const LightPadded = styled.div`
  padding: 8px;
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`

const RightAlign = styled.div`
  width: 100%;
  text-align: right;
`

class CourseModule extends React.Component {
  constructor (props) {
    super(props)
    this.handleAdd = this.handleAdd.bind (this)
    this.handleRemove = this.handleRemove.bind (this)
    this.onAddClose = this.onAddClose.bind (this)
    this.onAddSave = this.onAddSave.bind (this)

    this.state = {
      addModal: false,
      courseNum: '',
      hours: 0,
    }

    this.handleChange = this.handleChange.bind (this)
  }

  componentDidMount() {
    this.props.getCourses ()
  }

  handleAdd () {
    this.setState ({
      addModal: true
    })
  }

  handleRemove (id) {
    this.props.removeCourse (id)
  }

  onAddClose () {
    this.setState ({
      addModal: false,
      courseNum: '',
      hours: 0
    })
  }

  onAddSave () {
    this.props.addCourse ({
      id: Math.random (),
      title: this.state.courseNum,
      description: 'test',
      hours: this.state.hours
    })

    this.setState ({
      addModal: false,
      courseNum: '',
      hours: 0
    })
  }

  handleChange = (e, { name, value }) =>
    this.setState({ [name]:   value })

  render () {
    return (
      <Frame>
        <Padded>
          <List relaxed>
            {
              this.props.courses.map(course => (
                <List.Item key={course.id}>
                  <List.Content floated='right'>
                    <Icon name='close' onClick={() => this.handleRemove(course.id)}/>
                  </List.Content>
                  <span style={{float: 'left', padding: '6px', color: course.color}}>
                    <List.Icon name='circle' size='large' verticalAlign='middle' />
                  </span>
                  <List.Content>
                    <List.Header as='a'>{course.title}</List.Header>
                    <List.Description as='a'>{course.description}</List.Description>
                  </List.Content>
                </List.Item>
              ))
            }
          </List>

          <RightAlign>
            <Button onClick={() => this.handleAdd ()}>Add</Button>
          </RightAlign>
        </Padded>

        <Modal
          open={this.state.addModal}
          closeOnEscape
          closeOnDimmerClick
          onClose={this.onAddClose}
          size='mini'
        >
          <Modal.Header>Add a course</Modal.Header>
          <Modal.Content>
            <LightPadded>
              <Center>
              <p>Course Humber</p>
              <Input placeholder='Course' name='courseNum' value={this.state.courseNum}
                onChange={this.handleChange} />
              </Center>
            </LightPadded>
            <LightPadded>
              <Center>
              <p>Number of Hours</p>
              <Input placeholder='Hours' name='hours' value={this.state.hours}
                onChange={this.handleChange} />
              </Center>
            </LightPadded>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.onAddSave}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Save'
            />

            <Button onClick={this.onAddClose} negative>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Frame>
    )
  }
}

CourseModule.propTypes = {
  getCourses: PropTypes.func,
  addCourse: PropTypes.func,
  removeCourse: PropTypes.func,
  courses: PropTypes.arrayOf(PropTypes.object)
}

export default connectCalendar(CourseModule)
