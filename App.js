import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const buttonSize = (width - 48) / 4;

const formatNumber = (value) => {
  if (!Number.isFinite(value)) return 'Error';

  const absValue = Math.abs(value);
  if (absValue >= 1e9 || (absValue > 0 && absValue < 1e-9)) {
    return value.toExponential(6).replace(/\.?0+e/, 'e').replace(/\+/, '');
  }

  const rounded = Number(value.toFixed(8)).toString();
  return rounded === '-0' ? '0' : rounded;
};

const calculate = (a, b, operation) => {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      if (b === 0) return null;
      return a / b;
    default:
      return b;
  }
};

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const resetCalculator = () => {
    setDisplayValue('0');
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const appendDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
      return;
    }

    setDisplayValue((prev) => {
      if (prev === '0' && digit !== '.') {
        return digit;
      }
      return prev + digit;
    });
  };

  const appendDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!displayValue.includes('.')) {
      setDisplayValue((prev) => (prev === '' ? '0.' : prev + '.'));
    }
  };

  const toggleSign = () => {
    const current = Number(displayValue);
    if (Number.isNaN(current)) return;
    const nextValue = current === 0 ? 0 : -current;
    setDisplayValue(formatNumber(nextValue));
  };

  const percentage = () => {
    const current = Number(displayValue);
    if (Number.isNaN(current)) return;
    setDisplayValue(formatNumber(current / 100));
  };

  const handleOperator = (nextOperator) => {
    const inputValue = Number(displayValue);

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operator) {
      const result = calculate(Number(storedValue), inputValue, operator);

      if (result === null) {
        setDisplayValue('Error');
        setStoredValue(null);
        setOperator(null);
        setWaitingForOperand(false);
        return;
      }

      setStoredValue(result);
      setDisplayValue(formatNumber(result));
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const evaluate = () => {
    if (operator === null || storedValue === null) {
      return;
    }

    const result = calculate(Number(storedValue), Number(displayValue), operator);

    if (result === null) {
      setDisplayValue('Error');
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      return;
    }

    setDisplayValue(formatNumber(result));
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const buttons = [
    { label: 'C', type: 'secondary', action: resetCalculator },
    { label: '±', type: 'secondary', action: toggleSign },
    { label: '%', type: 'secondary', action: percentage },
    { label: '÷', type: 'operator', action: () => handleOperator('÷') },
    { label: '7', type: 'digit', action: () => appendDigit('7') },
    { label: '8', type: 'digit', action: () => appendDigit('8') },
    { label: '9', type: 'digit', action: () => appendDigit('9') },
    { label: '×', type: 'operator', action: () => handleOperator('×') },
    { label: '4', type: 'digit', action: () => appendDigit('4') },
    { label: '5', type: 'digit', action: () => appendDigit('5') },
    { label: '6', type: 'digit', action: () => appendDigit('6') },
    { label: '-', type: 'operator', action: () => handleOperator('-') },
    { label: '1', type: 'digit', action: () => appendDigit('1') },
    { label: '2', type: 'digit', action: () => appendDigit('2') },
    { label: '3', type: 'digit', action: () => appendDigit('3') },
    { label: '+', type: 'operator', action: () => handleOperator('+') },
    { label: '0', type: 'zero', action: () => appendDigit('0') },
    { label: '.', type: 'digit', action: appendDecimal },
    { label: '=', type: 'equals', action: evaluate },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.displayPanel}>
        <Text style={styles.expressionText}>
          {storedValue !== null && operator ? `${storedValue} ${operator}` : ''}
        </Text>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </View>

      <View style={styles.keypad}>
        {buttons.map((button) => {
          const isZero = button.label === '0';
          const isEquals = button.type === 'equals';

          return (
            <Pressable
              key={button.label + Math.random()}
              onPress={button.action}
              style={({ pressed }) => [
                styles.button,
                button.type === 'secondary' && styles.secondaryButton,
                button.type === 'operator' && styles.operatorButton,
                button.type === 'equals' && styles.equalsButton,
                button.type === 'zero' && styles.zeroButton,
                button.type === 'digit' && styles.digitButton,
                isZero && styles.zeroButton,
                isEquals && styles.equalsButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  button.type === 'operator' && styles.operatorText,
                  button.type === 'equals' && styles.equalsText,
                  button.type === 'secondary' && styles.secondaryText,
                ]}
              >
                {button.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  displayPanel: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#121212',
  },
  expressionText: {
    minHeight: 28,
    fontSize: 20,
    color: '#a8a8a8',
    textAlign: 'right',
    marginBottom: 8,
  },
  displayText: {
    fontSize: 64,
    color: '#f5f5f5',
    textAlign: 'right',
    fontWeight: '300',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 18,
    backgroundColor: '#1d1d1d',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    margin: 6,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  digitButton: {
    backgroundColor: '#2b2b2b',
  },
  secondaryButton: {
    backgroundColor: '#3b3b3b',
  },
  operatorButton: {
    backgroundColor: '#3f51b5',
  },
  equalsButton: {
    backgroundColor: '#00acc1',
    width: buttonSize * 2 + 12,
  },
  zeroButton: {
    width: buttonSize * 2 + 12,
    backgroundColor: '#2b2b2b',
  },
  buttonText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '500',
  },
  operatorText: {
    color: '#f5f5f5',
  },
  equalsText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#dfe6ef',
  },
});

