# Nested Block Class Name Debug Trace

## Overview
This document outlines the comprehensive debug logging added to trace why nested blocks in Columns are showing "Object" as the class name instead of their proper class names.

## Debug Logging Added

### 1. Columns.js - handleColumnDrop Method
**Location**: `/Users/jcroucher/Projects/AlpineBlocks/src/tools/Columns.js` (lines 126-185)

**Purpose**: Trace what happens when a block is dropped into a column

**Key Debug Points**:
- Input blockData and extracted toolClass
- Result of `editor.initBlock()` call
- Block state before and after adding to column
- Block state after `triggerRedraw()`

### 2. Editor.js - initBlock Method
**Location**: `/Users/jcroucher/Projects/AlpineBlocks/src/core/Editor.js` (lines 387-443)

**Purpose**: Trace block creation and class assignment

**Key Debug Points**:
- Input blockName and tool configuration
- Block constructor name before and after class assignment
- Final block object structure

### 3. Editor.js - serializeBlockConfig Method
**Location**: `/Users/jcroucher/Projects/AlpineBlocks/src/core/Editor.js` (lines 218-293)

**Purpose**: Trace serialization process that might lose class information

**Key Debug Points**:
- Each config property being processed
- Array items (nested blocks) and their class extraction
- Final serialized objects

### 4. Editor.js - blocksJSON Method  
**Location**: `/Users/jcroucher/Projects/AlpineBlocks/src/core/Editor.js` (lines 184-229)

**Purpose**: Trace main JSON export process

**Key Debug Points**:
- Each block being processed
- Class name derivation for top-level blocks
- Final JSON structure

### 5. Columns.js - getToolInstance Method
**Location**: `/Users/jcroucher/Projects/AlpineBlocks/src/tools/Columns.js` (lines 193-255)

**Purpose**: Trace tool instance creation for nested blocks

**Key Debug Points**:
- Block object passed in
- Tool class lookup and creation
- Final tool instance properties

### 6. Columns.js - updateNestedBlock Method
**Location**: `/Users/jcroucher/Projects/AlpineBlocks/src/tools/Columns.js` (lines 283-325)

**Purpose**: Trace config updates that might affect class property

**Key Debug Points**:
- Block state before and after config updates
- Block state after redraw

### 7. Columns.js - renderNestedBlocks Method
**Location**: `/Users/jcroucher/Projects/AlpineBlocks/src/tools/Columns.js` (lines 332-375)

**Purpose**: Trace rendering process

**Key Debug Points**:
- Block class properties during rendering
- State of all blocks in each column

## How to Use

### Step 1: Open Browser Console
Open Developer Tools and go to the Console tab to see debug output.

### Step 2: Test Sequence
1. Create a Columns block
2. Drag and drop a block (e.g., Paragraph) into a column
3. Try editing the nested block
4. Export blocks as JSON

### Step 3: Analyze Output
Look for debug sections marked with:
- `=== COLUMN DROP DEBUG START ===`
- `=== INITBLOCK DEBUG START ===`
- `=== SERIALIZE BLOCK CONFIG DEBUG START ===`
- `=== BLOCKS JSON DEBUG START ===`
- `=== GET TOOL INSTANCE DEBUG START ===`
- `=== UPDATE NESTED BLOCK DEBUG START ===`
- `=== RENDER NESTED BLOCKS DEBUG START ===`

## What to Look For

### 1. Class Property Consistency
Track the `block.class` and `block.constructor.name` properties through each stage:
- Should start as proper class name (e.g., "Paragraph")
- Should remain consistent through all operations
- Identify the exact point where it becomes "Object"

### 2. Common Failure Points
- **JSON serialization**: Object cloning without preserving class
- **Alpine.js reactivity**: Reactive updates modifying object structure
- **Config merging**: Operations that don't preserve class property
- **Tool instance caching**: Cached instances losing class information

### 3. Serialization Issues
Pay special attention to the `serializeBlockConfig` method as it processes nested blocks and constructs the class name for JSON output.

## Expected Findings

The debug logs should reveal one of these scenarios:

1. **Class lost during initBlock**: The Editor creates the block correctly but class gets overwritten
2. **Class lost during column storage**: Block is correct but gets corrupted when added to column
3. **Class lost during serialization**: Block is correct in memory but serialization fails
4. **Class lost during updates**: Config updates or redraws modify the object incorrectly

## Next Steps

Once you identify where the class becomes "Object":

1. **Fix the root cause** at that specific point
2. **Remove debug logging** after confirmation
3. **Add proper class preservation** logic if needed
4. **Test with multiple block types** to ensure consistency

## Files Modified

- `/Users/jcroucher/Projects/AlpineBlocks/src/tools/Columns.js`
- `/Users/jcroucher/Projects/AlpineBlocks/src/core/Editor.js`
- `/Users/jcroucher/Projects/AlpineBlocks/debug_test.html` (created)
- `/Users/jcroucher/Projects/AlpineBlocks/DEBUG_TRACE_SUMMARY.md` (this file)

Remember to remove the debug logging once the issue is resolved!