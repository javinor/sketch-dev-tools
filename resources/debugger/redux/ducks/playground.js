import { RUN_SCRIPT, SET_SCRIPT_RESULT } from '../../../../shared-actions'

const SET_SCRIPT_VALUE = 'playground/SET_SCRIPT_VALUE'

const initialState = {
  currentScript: 'console.log(context)',
  loading: false,
  runId: 0,
  result: '',
}

const handlers = {}

export const setScriptValue = text => ({
  type: SET_SCRIPT_VALUE,
  payload: {
    text,
  },
})

handlers[SET_SCRIPT_VALUE] = (state, { payload }) => ({
  ...state,
  currentScript: payload.text,
})

export const runScript = (script, runId) => ({
  type: RUN_SCRIPT,
  payload: {
    runId: runId + 1,
  },
  meta: {
    sketch: ['onRunScript', script, runId + 1],
  },
})

handlers[RUN_SCRIPT] = (state, { payload }) => ({
  ...state,
  loading: true,
  runId: payload.runId,
})

export const setScriptResult = ({ id, result }) => ({
  type: SET_SCRIPT_RESULT,
  payload: {
    id,
    result,
  },
})

handlers[SET_SCRIPT_RESULT] = (state, { payload }) => {
  if (payload.id !== state.runId) {
    return state
  }

  return {
    ...state,
    result: payload.result,
    loading: false,
  }
}

export default function(state = initialState, action) {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }

  return state
}
