// math.js - A simple math utility module
// Yeh ek simple math module hai jo basic calculations ke liye functions provide karta hai

// Addition function - do numbers ko add karta hai
function add(a, b) {
    return a + b;
}

// Subtraction function - pehla number se doosra subtract karta hai
function subtract(a, b) {
    return a - b;
}

// Multiplication function - do numbers ko multiply karta hai
function multiply(a, b) {
    return a * b;
}

// Division function - pehla number ko doosre se divide karta hai
function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero - Zero se divide nahi kar sakte!');
    }
    return a / b;
}

// Export functions using module.exports
// Module.exports se saare functions export kar rahe hain
module.exports = {
    add,
    subtract,
    multiply,
    divide
};

// Alternative way - ek ek karke bhi export kar sakte hain
// module.exports.add = add;
// module.exports.subtract = subtract;

console.log('Math module load ho gaya!');
