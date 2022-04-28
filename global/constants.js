export const calculatorDefaultState = {
    retirementAge: 100,
    targetRetAmount: 0,
    annualRetExpenses:0,
    currAge: 35,
    currSavings: 1000,
    regContributions: 500,
    contributionsFreq: 'Monthly',
    preRetROR: 7,
    postRetROR: 7,
    inflation: 2.9
}

export const defaultSeo = {
    description:'A refactorred retirement calculator for u/Ghix - refactor by E Gibson',
    keywords:'Retirement, Calculator, useReducer, useState, retirement amount, retirement',
    canonical:'http://localhost:3000/',
    title:'Retirement Calculator Refactor',
    preventIndexing:false,
    favicon: '/favicon.ico',
    shareImage:'/vercel.svg'
}