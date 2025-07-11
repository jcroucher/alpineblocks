#!/usr/bin/env node

/**
 * Test runner for AlpineBlocks
 * Runs all tests and generates coverage report
 */

const { execSync } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n${description}`, 'cyan');
  log(`Running: ${command}`, 'blue');
  
  try {
    const output = execSync(command, { 
      stdio: 'inherit', 
      cwd: path.join(__dirname, '..') 
    });
    log(`✓ ${description} completed successfully`, 'green');
    return true;
  } catch (error) {
    log(`✗ ${description} failed`, 'red');
    console.error(error.message);
    return false;
  }
}

function main() {
  log('🧪 AlpineBlocks Test Suite', 'bright');
  log('========================', 'bright');
  
  const testCommands = [
    {
      command: 'npm test',
      description: 'Running all tests'
    },
    {
      command: 'npm run test:coverage',
      description: 'Generating coverage report'
    }
  ];
  
  let allPassed = true;
  
  for (const { command, description } of testCommands) {
    const passed = runCommand(command, description);
    if (!passed) {
      allPassed = false;
    }
  }
  
  log('\n📊 Test Results', 'bright');
  log('================', 'bright');
  
  if (allPassed) {
    log('✅ All tests passed!', 'green');
    log('📈 Coverage report generated in ./coverage/', 'cyan');
    process.exit(0);
  } else {
    log('❌ Some tests failed!', 'red');
    log('🔍 Check the output above for details', 'yellow');
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { runCommand, log };