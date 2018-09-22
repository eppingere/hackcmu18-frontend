import React, { PureComponent } from 'react'
import { Input, Menu, Segment, Image } from 'semantic-ui-react'

export default class MenuBar extends PureComponent {

  render() {

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='Quel' active={true}/>
          <Menu.Menu position='right'>
            <Menu.Item>
                <i class = 'calendar outline icon'></i>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
