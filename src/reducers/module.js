import { connect } from 'react-redux'

export const genModule = (config = {}) => {
  return Object.keys(config).reduce((acc, key) => {
    const value = config[key]
    const defaultValue = value.value
    const mutationType = value.type
    const actionName = value.action
    acc.state[key] = defaultValue
    acc.reducer[mutationType] = (state, action) => {
      const retVal = {
        ...state
      }
      retVal[key] = action[key]
      return retVal
    }
    acc.actions[actionName] = arg => {
      const retVal = {
        type: mutationType
      }
      retVal[key] = arg
      return retVal
    }
    // value is the config
    // key is the name of the state
    return acc
  }, {
    state: {},
    reducer: {},
    actions: {}
  })
}

export const packModule = ({actions, state, reducer, name}) => {
  const namespaced = {}
  if (actions) {
    namespaced.actions = Object.keys(actions).reduce((acc, val) => {
      acc[val] = function () {
        const result = actions[val].apply(undefined, arguments)
        return {
          ...result,
          type: name + '/' + result.type
        }
      }
      return acc
    }, {})
  }

  namespaced.state = {}
  if (state) {
    namespaced.state[name] = state
  }

  namespaced.reducer = {}
  if (typeof reducer === 'object') {
    namespaced.reducer[name] = (prevState = state, action) => {
      if (action.type.startsWith(name)) {
        const actual = action.type.substring(name.length + 1)
        const found = reducer[actual]
        if (found) {
          return found.apply(undefined, [prevState, {
            ...action,
            type: actual
          }])
        }
      }
      return prevState
    }
  } else if (typeof reducer === 'function') {
    namespaced.reducer[name] = (prevState = state, action) => {
      return reducer.apply(undefined, [prevState, {
        ...action,
        type: action.type.substring(name.length + 1)
      }])
    }
  }

  namespaced.connect = (args = {}) => {
    const mapState = connectState => {
      return Object.keys(state).reduce((acc, val) => {
        acc[val] = connectState[name][val]
        return acc
      }, {})
    }
    const mapDispatch = connectDispatch => {
      const mapActions = Object.keys(actions).reduce((acc, val) => {
        acc[val] = (...actionArgs) =>
          connectDispatch(namespaced.actions[val].apply(undefined, actionArgs))
        return acc
      }, {})
      return Object.keys(args).reduce((acc, val) => {
        acc[val] = (...thunkArgs) =>
          connectDispatch(args[val].apply(undefined, thunkArgs))
        return acc
      }, mapActions)
    }
    return connect(mapState, mapDispatch)
  }
  return namespaced
}
