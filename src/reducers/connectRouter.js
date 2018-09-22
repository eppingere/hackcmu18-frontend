import { connect } from 'react-redux'
import { go, goBack, goForward, push, replace } from 'connected-react-router'

const mapStateToProps = state => {
  return {
    pathname: state.router.location.pathname
  }
}

// push, replace, go, goBack, goForward
/* history.push(path, [state])
 * history.replace(path, [state])
 * history.go(n)
 * history.goBack()
 * history.goForward() */

const mapDispatchToProps = dispatch => {
  const help = action => (...args) => dispatch(action(...args))
  return {
    push: help(push),
    replace: help(replace),
    go: help(go),
    goBack: help(goBack),
    goForward: help(goForward)
  }
}

export const connectReduxRouter = connect(mapStateToProps, mapDispatchToProps)
