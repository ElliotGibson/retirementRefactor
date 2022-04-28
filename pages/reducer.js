import { useEffect } from 'react';
import Link from 'next/link';

import { 
    getInitialCalculatorState,
    formatter
} from 'global/helpers';

import Input from 'components/atoms/Input';
import Seo from 'components/atoms/Seo';

import useCalculator from 'hooks/useCalculator';

function RetirementCalculatorWithReducer(){

    //Here we're using a custom hook to seperate our pure state and calculations away from our presentational logic
    //The hook using the reducer pattern :)
    const [ calculatorState, dispatch ] = useCalculator(getInitialCalculatorState(true))

    useEffect( () => dispatch({type:'set', value:getInitialCalculatorState()}), [dispatch]);
    const changeHandler = ({target:{name, value}})=>dispatch({type:'update', name, value})

    const currencyFormatter = formatter('en-US','USD');

    return <div>
        <Seo title={'useReducer example :) - Retirement Calculator'} canonical={'http://localhost:3000/reducer'} />
        <h1>Retirement Calculator</h1>
        <p>Calculate your retirement age and retirement amount :)</p>
        <Link href='/'><a><h2>This version uses the reducer pattern :) - click here to use the useState based version</h2></a></Link>
        <div>
            <h3>You can retire at {calculatorState?.retirementAge}</h3>
            <p>Target retirement amount: {currencyFormatter.format(calculatorState?.trueTargetAmount)}</p>
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

export default RetirementCalculatorWithReducer;