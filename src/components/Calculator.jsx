import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [operator, setOperator] = useState(null);

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 10 }).format(number);
  };

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDot = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue.replace(/,/g, ''));

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand == null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const newValue = performCalculation[operator](currentValue, inputValue);

      setDisplayValue(formatNumber(newValue));
      setFirstOperand(newValue);
    }

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
    const inputValue = parseFloat(displayValue.replace(/,/g, ''));
    const newValue = performCalculation[specialOperator](inputValue);
    setDisplayValue(formatNumber(newValue));
    setFirstOperand(newValue);
    setWaitingForSecondOperand(true);
  };

  const clearAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setOperator(null);
  };

  const handleKeyPress = (event) => {
    const { key } = event;

    if (/\d/.test(key)) {
      inputDigit(key);
    } else if (key === '.') {
      inputDot();
    } else if (key in performCalculation) {
      handleOperator(key);
    } else if (key === 'Enter') {
      handleOperator('=');
    } else if (key === 'Backspace') {
      clearAll();
    }
  };

  return (
    <div className="calculator" onKeyDown={handleKeyPress} tabIndex="0">
      <Display value={displayValue} />
      <div className="button-panel">
        <Button label="C" handleClick={clearAll} />
        <Button label="(" handleClick={inputDigit} />
        <Button label=")" handleClick={inputDigit} />
        <Button label="√" handleClick={handleSpecialOperator} />
        <Button label="∛" handleClick={handleSpecialOperator} />
        <Button label="log" handleClick={handleSpecialOperator} />
        <Button label="exp" handleClick={handleSpecialOperator} />
        <Button label="x^3" handleClick={handleSpecialOperator} />
        <Button label="x^y" handleClick={handleOperator} />
        <Button label="sin" handleClick={handleSpecialOperator} />
        <Button label="cos" handleClick={handleSpecialOperator} />
        <Button label="tan" handleClick={handleSpecialOperator} />
        <Button label="/" handleClick={handleOperator} />
        <Button label="*" handleClick={handleOperator} />
        <Button label="-" handleClick={handleOperator} />
        <Button label="+" handleClick={handleOperator} />
        <Button label="7" handleClick={inputDigit} />
        <Button label="8" handleClick={inputDigit} />
        <Button label="9" handleClick={inputDigit} />
        <Button label="4" handleClick={inputDigit} />
        <Button label="5" handleClick={inputDigit} />
        <Button label="6" handleClick={inputDigit} />
        <Button label="1" handleClick={inputDigit} />
        <Button label="2" handleClick={inputDigit} />
        <Button label="3" handleClick={inputDigit} />
        <Button label="0" handleClick={inputDigit} />
        <Button label="." handleClick={inputDot} />
        <Button label="=" handleClick={handleOperator} />
      </div>
    </div>
  );
};

export default Calculator;
