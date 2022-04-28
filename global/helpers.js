import { getStateFromStorage } from "./utils";
import { calculatorDefaultState } from "./constants";

//Get the initial calculator state and fallback to the constants if not available;
export function getInitialCalculatorState(ssrSafe){
    return ( !ssrSafe && getStateFromStorage('calculatorState')) || calculatorDefaultState;
}

//A general function which can be used to calculate pre and post ror after inflation - if the calc === 0 then it will fallback to 0.00001 as 0 is considered falsy :)
export const calcTrueRetROR = (ror, inflation)=>(ror - inflation) / 100 || 0.00001;

export const calcPostAndPreRetROR = ({postRetROR, preRetROR, inflation})=>({
    truePostRetROR: calcTrueRetROR(postRetROR, inflation),
    truePreRetROR: calcTrueRetROR(preRetROR, inflation)
})

//Calculate the target retirement amount :)
export const calcTargetAmount = ({annualRetExpenses, postRetROR, inflation}) => annualRetExpenses / calcTrueRetROR(postRetROR, inflation);

//Calcaulte the retirement age... using object destructuring to make life easier :)
export const calcRetirementAge = ({ annualRetExpenses, preRetROR, postRetROR, inflation, currSavings, regContributions, contributionsFreq, currAge })=>{
    const targetAmount = calcTargetAmount({annualRetExpenses, postRetROR, inflation })
    const truePreRetROR = calcTrueRetROR(preRetROR, inflation);
    let currBalance = currSavings;
    const annualContributions = regContributions / ( contributionsFreq == 'monthly' ? 1 : 12);
    const retAge = currAge;

    while (currBalance < targetAmount && retAge <= 200){
        currBalance = (currBalance + annualContributions) * (1 + truePreRetROR);
        retAge++;
    }

    return retAge;
}

export const formatter = (i18nCode, currency)=>new Intl.NumberFormat(i18nCode, {
    style:'currency',
    currency: currency,
    minimumFractionDigits: 2
})

export const checkObjectEquality = (obj1, obj2)=>JSON.stringify(obj1) === JSON.stringify(obj2);