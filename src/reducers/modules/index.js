const files = require.context('.', false, /\.js$/)

const modules = files.keys().reduce(({initialState, reducers}, key) => {
  if (key === './index.js') {
    return {initialState, reducers}
  }
  key.replace(/(\.\/|\.js)/g, '')
  const module = files(key).module
  return {
    initialState: Object.assign(initialState, module.state),
    reducers: Object.assign(reducers, module.reducer)
  }
}, {
  initialState: {},
  reducers: {}
})

export default modules
