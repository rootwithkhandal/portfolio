import os

files_to_check = [
    'src/data/researches.ts',
    'src/data/projects.ts',
    'src/layouts/Layout.astro',
    'src/layouts/ErrorLayout.astro',
    'src/pages/405.astro',
    'src/pages/403.astro',
    'src/pages/index.astro',
    'src/components/Projects.astro'
]

for file_path in files_to_check:
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace em dash with spaced hyphen, and en dash with hyphen
    new_content = content.replace('—', '-').replace('–', '-')
    
    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

