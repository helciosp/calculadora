import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '=']

  const [currentNumber, setCurrentNumber] = useState('')
  const [lastNumber, setLastNumber] = useState('')
  


  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    const fistOperand = parseFloat(splitNumbers[0])
    const lastOperand = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]
    console.log(splitNumbers)

    // Faz ação referente tecla pressionada
    switch(operator){
      case '+':
        setCurrentNumber((fistOperand + lastOperand).toString())
        return
      case '-': 
        setCurrentNumber((fistOperand - lastOperand).toString())
        return
      case 'x':
        setCurrentNumber((fistOperand * lastOperand).toString())
        return
      case '/': 
        setCurrentNumber((fistOperand / lastOperand).toString())
        return
      case '%' :
        setCurrentNumber(((fistNumber / 100)) * lastNumber)
    }
  }

  function revert(){
    let oposto = parseInt(currentNumber)

    oposto *= -1

    if(oposto < 0) {
      setCurrentNumber( '-' + currentNumber)
    }
    else {
      const desmembrado = currentNumber.split(' ')
      setCurrentNumber( desmembrado[2] )
    }
  }

  function handleInput(buttonPressed){
    console.log(buttonPressed) // Mostra no Console a tecla pressionada
    if(buttonPressed === '+' || buttonPressed === "-" || buttonPressed === "x" || buttonPressed === "/" || buttonPressed === '%'){
      if(currentNumber === ''){
        setCurrentNumber(buttonPressed)
        return
      }
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch(buttonPressed){
      case 'DEL':
        if(currentNumber[currentNumber.length - 1] == ' ') {
          setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 2)))
        }
        else if(currentNumber[currentNumber.length] == ' ') {
          setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 2)))
        }
        else {
          setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        } 
        return
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber('') 
        setCurrentNumber('') 
        return
      case '=':
        setLastNumber(currentNumber + ' = ')
        calculator()
        return
      case '+/-':
        revert()
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }


  return (
    <View style={styles.container}>

      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>

        {buttons.map((button) => button === '=' ?

        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#1e1240'}]}>
          <Text style={[styles.textButton, {color: 'white', fontSize: 30}]}>{button}</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
          <Text style={[styles.textButton, {color: typeof(button) === 'number' ? '#efeaf3': '#77707e'}]}>{button}</Text>
        </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#1e1240'
  },
  resultText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText:{
    color: "#717075",
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#3d0075',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90, 
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: '#7c7c7c',
    fontSize: 20,
  } 
});