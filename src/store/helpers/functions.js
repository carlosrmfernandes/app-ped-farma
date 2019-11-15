function rebuildArray (commit, datas) {
  const result = []
  for (const data of datas) {
    result.push({ email: data.email })
  }

  result.shift()
  // sconsole.log(result)
  return result
}

export default {
  namespaced: true,
  state: {
  },
  mutations: {

  },
  actions: {
    rebuildArray
  }
}
