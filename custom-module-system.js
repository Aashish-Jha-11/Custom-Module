const fs = require('fs'); // File system ke liye - files padhne ke liye
const path = require('path'); // Path operations ke liye - file paths handle karne ke liye  
const vm = require('vm'); // Virtual machine ke liye - code safely execute karne ke liye

// Module cache to store loaded modules
// Yeh object sabhi loaded modules ko store karega - same module baar baar load nahi hoga
const moduleCache = {};

/**
 * Custom Module class - represents a module in our system
 * Har module ka apna object hota hai jo uski details store karta hai
 */
class CustomModule {
    constructor(id, parent) {
        this.id = id; // Module ka unique identifier
        this.exports = {}; // Yahan se module cheezein export karega
        this.parent = parent; // Kis module ne ise load kiya hai
        this.filename = null; // File ka complete path
        this.loaded = false; // Kya module completely load ho gaya hai
        this.children = []; // Yeh module ne kaun se modules load kiye hain
    }
}

/**
 * Custom require function - loads and executes modules
 * Yeh main function hai jo modules ko load karta hai - Node.js ke require() ki tarah
 * @param {string} id - module identifier (file path)
 * @param {CustomModule} parent - parent module (kis module ne ise call kiya)
 * @returns {any} - exported content from the module
 */
function customRequire(id, parent = null) {
    // Resolve the absolute path
    // Pehle file ka complete path nikalo
    const filename = resolveModulePath(id, parent);
    
    // Check if module is already cached
    // Dekho ki module pehle se cache mein hai ya nahi
    if (moduleCache[filename]) {
        return moduleCache[filename].exports;
    }
    
    // Create new module instance
    // Naya module object banao
    const module = new CustomModule(filename, parent);
    module.filename = filename;
    
    // Add to cache before loading to handle circular dependencies
    // Pehle cache mein dal do - circular dependency handle karne ke liye
    moduleCache[filename] = module;
    
    // Add to parent's children if there's a parent
    // Agar parent hai to uske children mein add kar do
    if (parent) {
        parent.children.push(module);
    }
    
    try {
        // Load and execute the module
        // Module ko load aur execute karo
        loadModule(module);
        module.loaded = true;
        return module.exports;
    } catch (error) {
        // Remove from cache if loading failed
        // Agar loading fail ho gayi to cache se hata do
        delete moduleCache[filename];
        throw error;
    }
}

/**
 * Resolves module path to absolute path
 * File ka relative path ko absolute path mein convert karta hai
 * @param {string} id - module identifier
 * @param {CustomModule} parent - parent module
 * @returns {string} - absolute file path
 */
function resolveModulePath(id, parent) {
    // If it's an absolute path, use it directly
    // Agar absolute path hai to wahi use karo
    if (path.isAbsolute(id)) {
        return path.resolve(id);
    }
    
    // If it's a relative path, resolve relative to parent's directory
    // Relative path hai to parent ke directory ke saath join karo
    const parentDir = parent ? path.dirname(parent.filename) : process.cwd();
    let resolvedPath = path.resolve(parentDir, id);
    
    // Add .js extension if not present
    // Agar .js extension nahi hai to add kar do
    if (!path.extname(resolvedPath)) {
        resolvedPath += '.js';
    }
    
    return resolvedPath;
}

/**
 * Loads and executes a module file
 * Module ko load karta hai - file type ke hisaab se
 * @param {CustomModule} module - module to load
 */
function loadModule(module) {
    const extension = path.extname(module.filename);
    
    // File extension ke hisaab se different loading strategy
    switch (extension) {
        case '.js':
            loadJavaScriptModule(module); // JavaScript file hai
            break;
        case '.json':
            loadJSONModule(module); // JSON file hai
            break;
        default:
            throw new Error(`Unknown file extension: ${extension}`);
    }
}

/**
 * Loads a JavaScript module
 * JavaScript file ko load aur execute karta hai - yahan main magic hota hai!
 * @param {CustomModule} module - module to load
 */
function loadJavaScriptModule(module) {
    // Read the file content
    // File ka content padh lo
    const content = fs.readFileSync(module.filename, 'utf8');
    
    // Create a wrapper function that provides module context
    // Code ko wrapper function mein wrap karo - Node.js ki tarah
    const wrapper = createModuleWrapper(content);
    
    // Create a new context for the module
    // Module ke liye context banao
    const context = createModuleContext(module);
    
    // Execute the wrapped code in the context
    // Wrapped code ko execute karo
    const compiledWrapper = vm.runInThisContext(wrapper, {
        filename: module.filename,
        lineOffset: 0,
        displayErrors: true
    });
    
    // Call the wrapper function with module context
    // Wrapper function ko proper arguments ke saath call karo
    compiledWrapper.call(
        module.exports,
        module.exports, // exports object
        createRequireForModule(module), // require function
        module, // module object
        module.filename, // __filename
        path.dirname(module.filename) // __dirname
    );
}

/**
 * Loads a JSON module
 * JSON file ko parse karke module.exports mein dal deta hai
 * @param {CustomModule} module - module to load
 */
function loadJSONModule(module) {
    const content = fs.readFileSync(module.filename, 'utf8');
    try {
        // JSON ko parse karke exports mein dal do
        module.exports = JSON.parse(content);
    } catch (error) {
        error.message = `${module.filename}: ${error.message}`;
        throw error;
    }
}

/**
 * Creates a wrapper function for module code
 * Module code ko function mein wrap karta hai - exactly Node.js ki tarah
 * @param {string} content - module content
 * @returns {string} - wrapped code
 */
function createModuleWrapper(content) {
    // Wrap the module code in a function that provides Node.js-like environment
    // Module code ko function mein wrap karo jo Node.js jaisa environment provide kare
    return `(function(exports, require, module, __filename, __dirname) {\n${content}\n});`;
}

/**
 * Creates a module context
 * Module ke liye context object banata hai - saare variables provide karta hai
 * @param {CustomModule} module - module instance
 * @returns {object} - context object
 */
function createModuleContext(module) {
    return {
        exports: module.exports, // exports object
        require: createRequireForModule(module), // require function
        module: module, // module object
        __filename: module.filename, // file ka complete path
        __dirname: path.dirname(module.filename), // directory path
        global: global, // global object
        process: process, // process object
        Buffer: Buffer, // Buffer class
        console: console // console object
    };
}

/**
 * Creates a require function bound to a specific module
 * Har module ke liye ek special require function banata hai
 * @param {CustomModule} module - parent module
 * @returns {function} - require function
 */
function createRequireForModule(module) {
    return function(id) {
        // Yeh function us module ke context mein require karta hai
        return customRequire(id, module);
    };
}

/**
 * Gets information about cached modules
 * Cache ki information dekhne ke liye - kitne modules load hain
 * @returns {object} - cache information
 */
function getCacheInfo() {
    return {
        count: Object.keys(moduleCache).length, // Kitne modules cache mein hain
        modules: Object.keys(moduleCache), // Kaun se modules hain
        cache: moduleCache // Pura cache object
    };
}

/**
 * Clears the module cache
 * Sabhi cached modules ko clear kar deta hai
 */
function clearCache() {
    Object.keys(moduleCache).forEach(key => {
        delete moduleCache[key]; // Har module ko cache se hata do
    });
}

// Export our custom module system
// Apna custom module system export kar rahe hain taaki dusre files use kar sakein
module.exports = {
    customRequire, // Main require function
    CustomModule, // Module class
    getCacheInfo, // Cache information
    clearCache // Cache clear karne ke liye
};
