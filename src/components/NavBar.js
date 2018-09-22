import { Menu } from 'semantic-ui-react'
import React, { PureComponent } from 'react'

export default class MenuBar extends PureComponent {

  render() {

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='Quel' active={true}/>
          <Menu.Menu position='right'>
            <Menu.Item>
                <i className='calendar outline icon' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
