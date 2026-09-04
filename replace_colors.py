import os
import glob

# Mapping vivid to pastel
replacements = {
    '#e53935': '#ff8a80',
    '#69f0ae': '#b9f6ca',
    '#ff9800': '#ffcc80',
    '#ce93d8': '#e1bee7',
    '#80cbc4': '#b2dfdb',
    '#f06292': '#f8bbd0',
    '#4dd0e1': '#b2ebf2'
}

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.astro', '.ts')):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old_c, new_c in replacements.items():
                new_content = new_content.replace(old_c, new_c)
                
            if content != new_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file_path}")
