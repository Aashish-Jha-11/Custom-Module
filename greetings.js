// greetings.js - A greeting module using exports shorthand
// Yeh module different types ke greetings provide karta hai - exports shorthand use karke

// exports ka direct use - yeh module.exports ka shortcut hai
// Yaad rakho: exports = module.exports initially hota hai
exports.sayHello = function(name) {
    return `Hello, ${name}!`;
};

exports.sayGoodbye = function(name) {
    return `Goodbye, ${name}!`;
};

// Different greetings ki array
exports.greetings = ['Hello', 'Hi', 'Hey', 'Howdy'];

// You can also mix exports and module.exports
// exports aur module.exports dono mix kar sakte hain
module.exports.customGreeting = function(greeting, name) {
    return `${greeting}, ${name}!`;
};

console.log('Greetings module load ho gaya!');
