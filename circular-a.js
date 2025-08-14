// circular-a.js - Demonstrates circular dependency handling

console.log('Loading module A...');

const moduleB = require('./circular-b');

exports.name = 'Module A';
exports.getMessage = function() {
    return `Hello from ${exports.name}, working with ${moduleB.name}`;
};

console.log('Module A loaded!');
