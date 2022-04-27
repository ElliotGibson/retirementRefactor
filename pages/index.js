import { useState, useEffect } from 'react';

import { calculatorDefaultState } from 'global/constants';
import { setStateToStorage } from 'global/utils';

import { 
    getInitialCalculatorState,
    calcRetirementAge,
    calcTargetAmount,
    formatter
} from 'global/helpers';

import Input from 'components/Atoms/Input';

function RetirementCalculator(){

    //We don't want to fetch the default state until after the component has mounted on the client,
    //this is so that the initial state is consistent between ssr and csr :)
    //otherwise we could use suppressHydrationWarning on the page component
    const [calculatorState, setCalculatorState] = useState(calculatorDefaultState);
    const [trueTargetAmount, setTrueTargetAmount] = useState(calcTargetAmount(calculatorState));
    const [retirementAge, setRetirementAge] = useState(calcRetirementAge(calculatorState));

    //Use layout effect will run before the initial render has committed to dom / painted to dom
    //we always want to fetch this data whenever this page component is mounted
    //and we also want to set the state to storage whenever this component is mounted
    useEffect( () => setCalculatorState(getInitialCalculatorState()), []);

    useEffect( () => {
        //calculate the trueTargetAmount
        setTrueTargetAmount(calcTargetAmount(calculatorState))
        //calculate the retirementAge
        setRetirementAge(calcRetirementAge(calculatorState))
    }, [calculatorState]);

    const changeHandler = ({target:{name, value}})=>{
        setCalculatorState({...calculatorState, [name]:value});
        setStateToStorage('calculatorState', {...calculatorState, [name]:value});
    };
    const currencyFormatter = formatter('en-US','USD');

    return <div>
        <h2>Retirement Calculator</h2>
        <div>
            <h3>You can retire at {retirementAge}</h3>
            <p>Target retirement amount: {currencyFormatter.format(trueTargetAmount)}</p>
            <form>
                <Input.Number label='Annual Retirement Expenses' name='annualRetExpenses' value={calculatorState.annualRetExpenses} onChange={changeHandler} />
                <Input.Number label='Current Age' name='currAge' value={calculatorState.currAge} onChange={changeHandler} />
                <Input.Number label='Current Savings' name='currSavings' value={calculatorState.currSavings} onChange={changeHandler} />
                <Input.Number label='Regular Contributions' name='regContributions' value={calculatorState.regContributions} onChange={changeHandler} />
                <Input.Select label='Contribution Frequency' name='contributionsFreq' value={calculatorState.contributionsFreq} onChange={changeHandler} options={[
                    { label:'Monthly', value:'monthly' },
                    { label:'Annualy', value:'annually'}
                ]} />
                <Input.Number label='Pre-retirement average rate of return' name='preRetROR' value={calculatorState.preRetROR} onChange={changeHandler}/>
                <Input.Number label='Post-retirement average rate of return' name='postRetROR' value={calculatorState.postRetROR} onChange={changeHandler}/>
                <Input.Number label='Inflation' name='inflation' value={calculatorState.inflation} onChange={changeHandler} />
            </form>
        </div>
    </div>


}

export default RetirementCalculator;