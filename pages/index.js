import { useState, useEffect } from 'react';
import Link from 'next/link';
import { setStateToStorage } from 'global/utils';

import { 
    getInitialCalculatorState,
    calcRetirementAge,
    calcTargetAmount,
    formatter
} from 'global/helpers';

import Input from 'components/atoms/Input';
import Seo from 'components/atoms/Seo'

function RetirementCalculator(){

    //We don't want to fetch the default state until after the component has mounted on the client,
    //this is so that the initial state is consistent between ssr and csr :) - passing true into the function will ensure
    //we get a ssr / hydration safe value :)
    
    const [calculatorState, setCalculatorState] = useState(getInitialCalculatorState(true));
    const [trueTargetAmount, setTrueTargetAmount] = useState(calcTargetAmount(calculatorState));
    const [retirementAge, setRetirementAge] = useState(calcRetirementAge(calculatorState));

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
        <Seo title={'useState example :) - Retirement Calculator'} />
        <h1>Retirement Calculator</h1>
        <p>Calculate your retirement age and retirement amount :)</p>
        <Link href='/reducer'><a><h2>This version uses the useState hook :) - click here to use the reducer based version</h2></a></Link>
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