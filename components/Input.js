import { useState } from "react";
import { useDispatch } from "react-redux";

const Input = () => {
    const [inputValue, setInputValue] = useState('');

    return <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
};

export default Input;