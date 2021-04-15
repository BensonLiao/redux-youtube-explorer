export const loadState = ({ exceptKeys = null, withKey = false }) => {
  let state
  try {
    Object.keys(localStorage)
      .filter(key => !key.match(exceptKeys))
      .forEach(key => {
        const serializedState = localStorage.getItem(key)
        if (serializedState === null) {
          return undefined
        }
        state = withKey
          ? {
              [key]: JSON.parse(serializedState),
              ...state,
            }
          : {
              ...JSON.parse(serializedState),
              ...state,
            }
      })
    return state
  } catch (err) {
    return `An error occurs when loading state: ${err}`
  }
}

export const loadStateInKeys = ({ keys = null, withKey = false }) => {
  let state
  try {
    Object.keys(localStorage)
      .filter(key => key.match(keys))
      .forEach(key => {
        const serializedState = localStorage.getItem(key)
        if (serializedState === null) {
          return undefined
        }
        state = withKey
          ? {
              [key]: JSON.parse(serializedState),
              ...state,
            }
          : {
              ...JSON.parse(serializedState),
              ...state,
            }
      })
    return state
  } catch (err) {
    return `An error occurs when loading state: ${err}`
  }
}

export const saveState = ({ key = 'root', state }) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(key, serializedState)
  } catch (err) {
    return `An error occurs when saving state: ${err}`
  }
}

export const clearState = (key = 'root') => {
  try {
    localStorage.removeItem(key)
  } catch (err) {
    return `An error occurs when clearing state: ${err}`
  }
}
