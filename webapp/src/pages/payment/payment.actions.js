import c from './../../init/constants'

export function createSummary(object){
    return function(dispatch){
        return {
            type:c.CREATE_SUMMARY,
            payload:object,
        }
    }
}

