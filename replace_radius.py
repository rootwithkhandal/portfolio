import os
import glob

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.astro'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace('border-radius: 6px;', 'border-radius: 4px;')
                
            if content != new_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file_path}")
