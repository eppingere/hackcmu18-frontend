import {
  DateInput
} from 'semantic-ui-calendar-react'
import { Form } from 'semantic-ui-react'
import React from 'react'
import moment from 'moment'

class DatePicker extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      date: ''
    }

    this.handleChange = this.handleChange.bind (this)
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <Form>
        <DateInput
          inline
          name="date"
          value={this.state.date}
          onChange={this.handleChange}
          initialDate={moment()}
        />
      </Form>
    );
  }
}

export default DatePicker
