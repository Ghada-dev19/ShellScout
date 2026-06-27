const assert = require('assert');
const { parseCommand, DATABASE, TRANSLATIONS } = require('./parser.js');

console.log('Running ShellScout Parser Tests...');

// Test 1: Base command parsing (cd)
const res1 = parseCommand('cd /home/user', 'eng');
assert.strictEqual(res1.tokens[0].text, 'cd');
assert.strictEqual(res1.tokens[0].type, 'command');
assert.strictEqual(res1.explanations[0].name, 'cd');
assert.strictEqual(res1.explanations[0].desc, 'Change Directory: Used to navigate between system folders.');

// Test 2: Target Path argument recognition
assert.strictEqual(res1.tokens[1].text, '/home/user');
assert.strictEqual(res1.tokens[1].type, 'argument');
assert.strictEqual(res1.explanations[1].desc, 'Target Path: directory or file destination for this operation.');

// Test 3: Composite flag decomposition (ls -la)
const res2 = parseCommand('ls -la', 'eng');
assert.strictEqual(res2.tokens[1].text, '-la');
assert.strictEqual(res2.tokens[1].type, 'flag');
// Should map to -la description directly if defined, or split
assert.ok(res2.explanations[1].desc.includes('Combines long listing'));

// Test 4: Dynamic Arabic translations (pwd)
const res3 = parseCommand('pwd', 'ara');
assert.strictEqual(res3.explanations[0].desc, 'طباعة دليل العمل الحالي: يظهر المسار الكامل للمجلد الذي تقف فيه الآن.');

// Test 5: Source vs Destination argument recognition for cp
const res4 = parseCommand('cp file1.txt file2.txt', 'eng');
assert.strictEqual(res4.tokens[1].type, 'source');
assert.strictEqual(res4.explanations[1].desc, 'Source File: the source file or directory for this operation.');
assert.strictEqual(res4.tokens[2].type, 'destination');
assert.strictEqual(res4.explanations[2].desc, 'Destination File: the target destination file or directory for this operation.');

// Test 6: French translations (cd)
const res5 = parseCommand('cd /home/user', 'fra');
assert.strictEqual(res5.explanations[0].desc, 'Changer de répertoire: Utilisé pour naviguer entre les dossiers du système.');

console.log('All tests passed successfully!');
