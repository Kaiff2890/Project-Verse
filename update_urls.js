const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'client', 'src');
const searchString = 'http://localhost:8800';
const replaceString = 'process.env.REACT_APP_API_URL || "http://localhost:8800"';

function replaceInFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    
    // In utils/index.js, it defines const API_URL = "http://localhost:8800";
    // We'll replace that. For other files, they might have literal strings or template literals.
    // Let's replace the literal "http://localhost:8800" with process.env.REACT_APP_API_URL
    
    let result = data.replace(/"http:\/\/localhost:8800/g, '`${process.env.REACT_APP_API_URL || "http://localhost:8800"}/').replace(/\//g, '/'); // Fix double slashes later if needed

    // Actually, a safer regex replacement:
    let modified = false;
    let newContent = data;

    if (data.includes('"http://localhost:8800"')) {
        newContent = newContent.replace(/"http:\/\/localhost:8800"/g, '(process.env.REACT_APP_API_URL || "http://localhost:8800")');
        modified = true;
    }

    if (data.includes('"http://localhost:8800/')) {
        newContent = newContent.replace(/"http:\/\/localhost:8800\//g, '`${process.env.REACT_APP_API_URL || "http://localhost:8800"}/');
        modified = true;
    }

    if (data.includes('`http://localhost:8800/')) {
        newContent = newContent.replace(/`http:\/\/localhost:8800\//g, '`${process.env.REACT_APP_API_URL || "http://localhost:8800"}/');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            replaceInFile(fullPath);
        }
    }
}

walkDir(directoryPath);
console.log('Done!');
