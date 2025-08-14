// advanced-test.js - Tests advanced features of our module system

const { customRequire, getCacheInfo, clearCache } = require('./custom-module-system');

console.log('=== Advanced Features Test ===\n');

// Test circular dependencies
console.log('Testing circular dependencies...');
try {
    const moduleA = customRequire('./circular-a.js');
    console.log(moduleA.getMessage());
    
    const moduleB = customRequire('./circular-b.js');
    console.log(moduleB.getMessage());
    console.log('✓ Circular dependencies handled correctly\n');
} catch (error) {
    console.log('Circular dependency error:', error.message);
}

// Test cache information
console.log('Current cache status:');
const cacheInfo = getCacheInfo();
console.log(`Modules in cache: ${cacheInfo.count}`);
cacheInfo.modules.forEach((mod, index) => {
    console.log(`  ${index + 1}. ${mod}`);
});
console.log();

// Test module context variables
console.log('Testing module context...');
const contextTest = `
// This will be executed in our module system
console.log('__filename:', __filename);
console.log('__dirname:', __dirname);
console.log('module.id:', module.id);

module.exports = {
    filename: __filename,
    dirname: __dirname,
    moduleId: module.id
};
`;

// Write a temporary test file
const fs = require('fs');
const testFile = '/Users/aashishjha/Desktop/nst/context-test.js';
fs.writeFileSync(testFile, contextTest);

const contextModule = customRequire('./context-test.js');
console.log('Module context test results:');
console.log('✓ __filename provided:', !!contextModule.filename);
console.log('✓ __dirname provided:', !!contextModule.dirname);
console.log('✓ module.id provided:', !!contextModule.moduleId);
console.log();

// Clean up
fs.unlinkSync(testFile);

console.log('=== Advanced Test Complete ===');
