import { genModule, packModule } from '@/reducers/module'

const SET_EXPANDED = 'SET_EXPANDED'
const SET_SHOW_DETAIL = 'SET_SHOW_DETAIL'
const SET_SHOW_USERMENU = 'SET_SHOW_USERMENU'

const {state, reducer, actions} = genModule({
  expanded: {
    value: 'none',
    type: SET_EXPANDED,
    action: 'setExpanded'
  },
  showDetail: {
    value: false,
    type: SET_SHOW_DETAIL,
    action: 'setShowDetail'
  },
  showUserMenu: {
    value: false,
    type: SET_SHOW_USERMENU,
    action: 'setShowUserMenu'
  }
})

export const module = packModule({
  state, reducer, name: 'nav', actions
})

export const connectNav = module.connect()

