// circular-b.js - Demonstrates circular dependency handling

console.log('Loading module B...');

const moduleA = require('./circular-a');

exports.name = 'Module B';
exports.getMessage = function() {
    return `Hello from ${exports.name}, working with ${moduleA.name}`;
};

console.log('Module B loaded!');
