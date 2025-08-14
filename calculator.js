// calculator.js - A module that depends on other modules
// Yeh module dusre modules ko use karta hai - dependency ka example

// This demonstrates how our custom require works with dependencies
// Yeh demonstrate karta hai ki hamara custom require dependencies ke saath kaise kaam karta hai
const math = require('./math'); // Math module ko import kar rahe hain
const greetings = require('./greetings'); // Greetings module ko import kar rahe hain

// Calculator class - yeh math operations aur history maintain karta hai
class Calculator {
    constructor(name) {
        this.name = name; // Calculator ka naam
        this.history = []; // Saare calculations ka history
    }

    // Math module ke functions use kar rahe hain
    add(a, b) {
        const result = math.add(a, b);
        this.history.push(`${a} + ${b} = ${result}`); // History mein save kar rahe hain
        return result;
    }

    subtract(a, b) {
        const result = math.subtract(a, b);
        this.history.push(`${a} - ${b} = ${result}`);
        return result;
    }

    multiply(a, b) {
        const result = math.multiply(a, b);
        this.history.push(`${a} * ${b} = ${result}`);
        return result;
    }

    divide(a, b) {
        const result = math.divide(a, b);
        this.history.push(`${a} / ${b} = ${result}`);
        return result;
    }

    // History return karta hai
    getHistory() {
        return this.history;
    }

    // Greetings module use kar rahe hain
    greet() {
        return greetings.sayHello(this.name);
    }
}

// Calculator class ko export kar rahe hain
module.exports = Calculator;

console.log('Calculator module load ho gaya!');
