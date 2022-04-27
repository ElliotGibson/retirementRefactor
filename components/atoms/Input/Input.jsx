function InputLabel({
    name,
    label,
    children
}){
    return <label htmlFor={name}>
        {label}
        {children}
    </label>
}

function Number({
    name,
    value,
    label,
    onChange
}){

    const changeHandler = ({target, ...e})=>{
        onChange({...e, target:{
            ...target,
            name: target.name,
            value: parseInt(target.value)
        }})}

    return <InputLabel for={name} label={label}>
        <input type='number' id={name} name={name} value={value} onChange={changeHandler} />
    </InputLabel>
}

function Select({
    name,
    value,
    options,
    label,
    onChange,
}){

    return <InputLabel for={name} label={label}>
        <select id={name} name={name} value={value} onChange={onChange}>
            {
                options.map(({value, label})=><option key={value} value={value}>{label}</option>)
            }
        </select>
    </InputLabel>
}

const Input = ({name, label, ...rest})=><InputLabel name={name} label={label}><input {...rest}></input></InputLabel>;
Input.Number = Number;
Input.Select = Select;

export {
    Number as NumberInput,
    Select as MultiSelect
}

export default Input;