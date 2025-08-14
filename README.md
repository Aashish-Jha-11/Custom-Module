# Custom Node.js Module System Implementation

This project demonstrates a from-scratch implementation of Node.js's `require()` and `module.exports` system.

## How Node.js Module System Works

### 1. **Module Loading Process**
- When `require()` is called, Node.js resolves the file path
- Checks if the module is already cached
- If not cached, creates a new module object
- Wraps the module code in a function
- Executes the wrapped function in a controlled context
- Returns the `module.exports` object

### 2. **Module Wrapper Function**
Node.js wraps every module in a function like this:
```javascript
(function(exports, require, module, __filename, __dirname) {
    // Your module code here
});
```

### 3. **Key Components**

#### Module Cache
- Prevents loading the same module multiple times
- Handles circular dependencies
- Stores loaded modules by their absolute file path

#### Module Object
- Contains `exports` (what the module exports)
- Contains `id` (unique identifier)
- Contains metadata like `filename`, `loaded`, `parent`, `children`

## Our Implementation

### Core Features Implemented:

1. **Module Caching System**
   - `moduleCache` object stores loaded modules
   - Prevents duplicate loading
   - Handles circular dependencies

2. **Path Resolution**
   - Converts relative paths to absolute paths
   - Adds `.js` extension if missing
   - Supports both relative and absolute paths

3. **Module Execution Context**
   - Provides `exports`, `require`, `module`, `__filename`, `__dirname`
   - Uses Node.js `vm` module for safe code execution
   - Maintains proper scope isolation

4. **File Type Support**
   - JavaScript files (`.js`) - executed as code
   - JSON files (`.json`) - parsed as JSON

5. **Error Handling**
   - Graceful handling of missing files
   - Syntax error reporting
   - Cache cleanup on failed loads

### Key Functions:

- `customRequire()` - Main require function
- `resolveModulePath()` - Path resolution logic
- `loadModule()` - Module loading dispatcher
- `createModuleWrapper()` - Code wrapping function
- `createModuleContext()` - Context creation

## Usage Examples

### Basic Module Export
```javascript
// math.js
function add(a, b) { return a + b; }
module.exports = { add };

// main.js
const math = customRequire('./math');
console.log(math.add(2, 3)); // 5
```

### Using exports shorthand
```javascript
// greetings.js
exports.hello = function(name) {
    return `Hello, ${name}!`;
};

// main.js
const greetings = customRequire('./greetings');
console.log(greetings.hello('World')); // Hello, World!
```

### JSON Module
```javascript
// config.json
{ "port": 3000, "debug": true }

// main.js
const config = customRequire('./config.json');
console.log(config.port); // 3000
```

## Differences from Real Node.js

### Simplified Features:
- No support for `node_modules` directory resolution
- No support for native modules
- No package.json main field resolution
- Limited built-in module support

### Educational Focus:
- Demonstrates core concepts clearly
- Shows module wrapping process
- Illustrates caching mechanism
- Explains context creation

## Running the Demo

```bash
node main.js
```

This will demonstrate:
- Loading different types of modules
- Module caching behavior
- Dependency resolution
- Error handling
- Context provision

## Learning Outcomes

After studying this implementation, you should understand:
- How module systems work under the hood
- The role of module caching
- How Node.js provides context to modules
- The difference between `module.exports` and `exports`
- How file extensions are handled
- The importance of path resolution

This implementation shows that while Node.js module system seems like "magic," it's actually built on straightforward concepts: file reading, code wrapping, context provision, and caching.
