// main.js - Demonstration of our custom module system

const { customRequire, getCacheInfo, clearCache } = require('./custom-module-system');

console.log('=== Custom Module System Demo ===\n');

// Test 1: Load a simple math module
console.log('1. Loading math module...');
const math = customRequire('./math.js');
console.log('Math operations:');
console.log(`5 + 3 = ${math.add(5, 3)}`);
console.log(`10 - 4 = ${math.subtract(10, 4)}`);
console.log(`6 * 7 = ${math.multiply(6, 7)}`);
console.log(`15 / 3 = ${math.divide(15, 3)}`);
console.log();

// Test 2: Load greetings module (using exports)
console.log('2. Loading greetings module...');
const greetings = customRequire('./greetings.js');
console.log(greetings.sayHello('Alice'));
console.log(greetings.sayGoodbye('Bob'));
console.log(greetings.customGreeting('Howdy', 'Charlie'));
console.log('Available greetings:', greetings.greetings);
console.log();

// Test 3: Load JSON module
console.log('3. Loading JSON config...');
const config = customRequire('./config.json');
console.log('Config loaded:', config);
console.log(`Port: ${config.settings.port}`);
console.log(`Environment: ${config.settings.environment}`);
console.log();

// Test 4: Load module with dependencies
console.log('4. Loading calculator module (with dependencies)...');
const Calculator = customRequire('./calculator.js');
const calc = new Calculator('MyCalculator');
console.log(calc.greet());
console.log(`Addition result: ${calc.add(10, 5)}`);
console.log(`Multiplication result: ${calc.multiply(3, 4)}`);
console.log('Calculation history:', calc.getHistory());
console.log();

// Test 5: Module caching demonstration
console.log('5. Testing module caching...');
console.log('Cache info before loading math again:', getCacheInfo().count);
const mathAgain = customRequire('./math.js'); // Should use cache
console.log('Same instance?', math === mathAgain);
console.log('Cache info after:', getCacheInfo().count);
console.log('Cached modules:', getCacheInfo().modules);
console.log();

// Test 6: Error handling
console.log('6. Testing error handling...');
try {
    customRequire('./nonexistent.js');
} catch (error) {
    console.log('Expected error caught:', error.message);
}
console.log();

// Test 7: Circular dependency simulation
console.log('7. Module system features:');
console.log('✓ File caching system');
console.log('✓ Dependency resolution');
console.log('✓ Both .js and .json support');
console.log('✓ Module.exports and exports support');
console.log('✓ Error handling');
console.log('✓ Module context (__filename, __dirname, etc.)');
console.log();

console.log('=== Demo Complete ===');
console.log(`Total modules loaded: ${getCacheInfo().count}`);
