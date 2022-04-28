import { useReducer } from "react";

import { calcRetirementAge, calcTargetAmount } from "global/helpers";
import { setStateToStorage } from "global/utils";

export default function useCalculator(initialState){

    function calcState( stateValue ){
        return {...stateValue, trueTargetAmount: calcTargetAmount(stateValue), retirementAge: calcRetirementAge(stateValue) }
    }

    function reducer(state, action){
        switch (action.type){
            case 'set':
                return calcState(action.value);
            case 'update':
                setStateToStorage('calculatorState', {...state, [action.name]:action.value})
                return calcState({...state, [action.name]:action.value})
            default:
                return state;
        }
    }

    const [ state, dispatch ] = useReducer( reducer, initialState );

    return [
        state,
        dispatch
    ]
}