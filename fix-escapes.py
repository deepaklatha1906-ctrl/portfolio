#!/usr/bin/env python3
import re
from pathlib import Path

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix escaped backticks in template literals
    content = re.sub(r'\\`', '`', content)
    content = re.sub(r'\\\$\{', '${', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ Fixed {filepath}")

# Fix all JSX files
for jsx_file in Path('src').rglob('*.jsx'):
    fix_file(jsx_file)

print("\n✅ All files fixed! Restart your dev server: npm run dev")