import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator = () => {
  const [inputValue, setInputValue] = useState('');
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [operator, setOperator] = useState(null);

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 10 }).format(number);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const inputDigit = (digit) => {
    setInputValue(inputValue === '0' ? digit : inputValue + digit);
  };

  const inputDot = () => {
    if (!inputValue.includes('.')) {
      setInputValue(inputValue + '.');
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValueNumber = parseFloat(inputValue.replace(/,/g, ''));

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand == null) {
      setFirstOperand(inputValueNumber);
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const newValue = performCalculation[operator](currentValue, inputValueNumber);

      setDisplayValue(formatNumber(newValue));
      setFirstOperand(newValue);
    }

    setInputValue('');
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand,
    '√': (firstOperand) => Math.sqrt(firstOperand),
    '∛': (firstOperand) => Math.cbrt(firstOperand),
    '^': (firstOperand, secondOperand) => Math.pow(firstOperand, secondOperand),
    'x^3': (firstOperand) => Math.pow(firstOperand, 3),
    'log': (firstOperand) => Math.log10(firstOperand),
    'exp': (firstOperand) => Math.exp(firstOperand),
    'sin': (firstOperand) => Math.sin(firstOperand * Math.PI / 180),
    'cos': (firstOperand) => Math.cos(firstOperand * Math.PI / 180),
    'tan': (firstOperand) => Math.tan(firstOperand * Math.PI / 180)
  };

  const handleSpecialOperator = (specialOperator) => {
    const inputValueNumber = parseFloat(inputValue.replace(/,/g, ''));
    const newValue = performCalculation[specialOperator](inputValueNumber);
    setDisplayValue(formatNumber(newValue));
    setInputValue('');
    setFirstOperand(newValue);
    setWaitingForSecondOperand(true);
  };

  const clearAll = () => {
    setInputValue('');
    setDisplayValue('0');
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setOperator(null);
  };

  return (
    <div className="calculator">
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        className="input-display" 
      />
      <Display value={displayValue} />
      <div className="button-panel">
        <Button label="C" handleClick={clearAll} />
        <Button label="(" handleClick={inputDigit} />
        <Button label=")" handleClick={inputDigit} />
        <Button label="√" handleClick={() => handleSpecialOperator('√')} />
        <Button label="∛" handleClick={() => handleSpecialOperator('∛')} />
        <Button label="log" handleClick={() => handleSpecialOperator('log')} />
        <Button label="exp" handleClick={() => handleSpecialOperator('exp')} />
        <Button label="x^3" handleClick={() => handleSpecialOperator('x^3')} />
        <Button label="x^y" handleClick={() => handleOperator('^')} />
        <Button label="sin" handleClick={() => handleSpecialOperator('sin')} />
        <Button label="cos" handleClick={() => handleSpecialOperator('cos')} />
        <Button label="tan" handleClick={() => handleSpecialOperator('tan')} />
        <Button label="/" handleClick={() => handleOperator('/')} />
        <Button label="*" handleClick={() => handleOperator('*')} />
        <Button label="-" handleClick={() => handleOperator('-')} />
        <Button label="+" handleClick={() => handleOperator('+')} />
        <Button label="7" handleClick={() => inputDigit('7')} />
        <Button label="8" handleClick={() => inputDigit('8')} />
        <Button label="9" handleClick={() => inputDigit('9')} />
        <Button label="4" handleClick={() => inputDigit('4')} />
        <Button label="5" handleClick={() => inputDigit('5')} />
        <Button label="6" handleClick={() => inputDigit('6')} />
        <Button label="1" handleClick={() => inputDigit('1')} />
        <Button label="2" handleClick={() => inputDigit('2')} />
        <Button label="3" handleClick={() => inputDigit('3')} />
        <Button label="0" handleClick={() => inputDigit('0')} />
        <Button label="." handleClick={inputDot} />
        <Button label="=" handleClick={() => handleOperator('=')} />
      </div>
    </div>
  );
};

export default Calculator;
