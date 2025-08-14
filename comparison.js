// comparison.js - Compare our custom system with Node.js built-in system

console.log('=== Comparison: Custom vs Built-in Module System ===\n');

// Test with our custom system
console.log('1. Using Our Custom Module System:');
const { customRequire } = require('./custom-module-system');
const customMath = customRequire('./math.js');
console.log('Custom require result:', customMath.add(5, 3));

// Test with built-in Node.js system
console.log('\n2. Using Built-in Node.js System:');
const builtinMath = require('./math.js');
console.log('Built-in require result:', builtinMath.add(5, 3));

// Show they produce same results
console.log('\n3. Results Comparison:');
console.log('Same result?', customMath.add(10, 20) === builtinMath.add(10, 20));
console.log('Same module structure?', typeof customMath === typeof builtinMath);

// Show module object structure
console.log('\n4. Module Object Analysis:');
console.log('Custom module exports keys:', Object.keys(customMath));
console.log('Built-in module exports keys:', Object.keys(builtinMath));

console.log('\n5. What Our Implementation Demonstrates:');
console.log('✓ Module wrapping with function context');
console.log('✓ File system integration');
console.log('✓ Caching mechanism');
console.log('✓ Dependency resolution');
console.log('✓ Context variables (__filename, __dirname, etc.)');
console.log('✓ Support for both .js and .json files');
console.log('✓ Circular dependency handling');
console.log('✓ Error handling and validation');

console.log('\n6. Features Not Implemented (for simplicity):');
console.log('- node_modules directory resolution');
console.log('- Built-in module support (fs, path, etc.)');
console.log('- Package.json main field resolution');
console.log('- Native addon support');
console.log('- ES6 module interoperability');
console.log('- Conditional exports');

console.log('\n=== This shows the core concepts behind Node.js modules! ===');
