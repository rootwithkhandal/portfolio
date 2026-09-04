import os
import glob

# Paths to process
src_dir = '/home/nyx/Projects/portfolio/src'
files = glob.glob(src_dir + '/**/*.astro', recursive=True) + glob.glob(src_dir + '/**/*.ts', recursive=True)

# Replacements
replacements = {
    '#FFC832': '#00ed64',
    '#FFD95C': '#00b545',
    'rgba(255,200,50': 'rgba(0,237,100',
    'rgba(255, 200, 50': 'rgba(0, 237, 100'
}

for filepath in files:
    if 'color-scheme-backup.css' in filepath:
        continue
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
