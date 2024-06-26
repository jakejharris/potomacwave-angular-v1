import os
import sys

def should_ignore(file_path, ignore_dirs):
    for ignore_dir in ignore_dirs:
        if ignore_dir in file_path:
            return True
    return False

def traverse_directory(directory, ignore_dirs, max_depth=5):
    directory_map = ""
    file_contents = []
    total_files = sum([len(files) for _, _, files in os.walk(directory) if 'node_modules' not in _])
    processed_files = 0

    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root:
            continue

        level = root.replace(directory, '').count(os.sep)
        if level > max_depth:
            dirs[:] = []  # Prune deeper subdirectories
            continue

        indent = ' ' * 4 * level
        directory_map += f"{indent}{os.path.basename(root)}/\n\n"

        dirs[:] = [d for d in dirs if not should_ignore(os.path.join(root, d), ignore_dirs) and d != 'node_modules']

        for file in files:
            file_path = os.path.join(root, file)
            if not should_ignore(file_path, ignore_dirs) and (file.endswith(".tsx") or file.endswith(".ts") or file.endswith(".css") or file.endswith(".scss") or file.endswith(".html") or file.endswith(".md") or file.endswith(".json")) and file not in ["package-lock.json", "package.json"]:
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                        file_contents.append(f'\n--NEWFILE "{file_path}"--:{{"content":"{content}"}}\n\n')
                except Exception as e:
                    print(f"\nError processing file: {file_path}")
                    print(f"Error message: {str(e)}")
            processed_files += 1

    return directory_map, file_contents

def write_to_txt(directory_map, file_contents, output_file_prefix):
    output_file_num = 1
    while os.path.exists(f"{output_file_prefix}_{output_file_num:02d}.txt"):
        output_file_num += 1
    output_file = f"{output_file_prefix}_{output_file_num:02d}.txt"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("--You are an expert fluent Angular web developer. Your task is to design and develop modern, responsive, and visually appealing web applications.--\n\n")
        f.write("Your goal is to create intuitive and engaging user experiences by combining daisyUI's pre-built components with custom styling and functionality. Pay close attention to responsive design principles, ensuring that your applications adapt seamlessly to different screen sizes and devices.--\n\n")
        f.write("Stay up-to-date with the latest developments in the React ecosystem, and continuously explore new libraries and tools that can enhance your development workflow and application capabilities.--\n\n")
        f.write("Start by thoroughly reading the problem, identifying key components like inputs, outputs, and constraints. Before coding, brainstorm and outline possible solutions, considering brute force as well as optimized approaches. Prioritize clarity over cleverness in your initial solution. Test your logic with different cases, including edge cases, before refining.\n\n")
        f.write("Focus on writing readable, maintainable code; use meaningful variable names and modularize with functions where appropriate. Unless explicitly instructed otherwise or there is a glaring error, maintain the existing variable names, function names, classes, and comments to preserve the coding style and structure provided by the user.\n\n")
        f.write("For optimization, analyze time and space complexity; leverage data structures and algorithms effectively. Use the most up-to-date language features and libraries that can simplify tasks.\n\n")
        f.write("The user, Jake Harris, a Frontend Developer, Designer, and Entrepreneur, will frequently use you as an assistant in the middle of tasks. They may not outline the full task in detail every time, so it is important that you make appropriate assumptions and ask follow-up questions when necessary.\n\n")
        f.write("When asked a coding question, assume that the appropriate environment is already set up unless otherwise stated. If code is provided, always maintain the variable names and existing structure unless there is a fundamental issue or you are specifically asked to make changes.\n\n")
        f.write("Remember to apply DbC principles throughout the problem-solving process and when providing code solutions to ensure robust, reliable, and maintainable code.--\n\n")
        f.write("--BELOW THIS LINE IS THE CODE FOR THE ENTIRE JAKE HARRIS/JJH DIGITAL PORTFOLIO/WEBSITE PROJECT. PAY ATTENTION TO FILE NAMES AND THEIR CONTENT. CONNECT FILE TO FILE SO THAT YOU COMPLETELY UNDERSTAND THE PROJECT.--\n\n")
        f.write("--PAY ATTENTION TO /DEPRECATED, THESE FILES/FOLDERS ARE NOT GENERALLY USED AND ARE ONLY THERE FOR REFERENCE. WEIGHT THEM LESS SO THAN ACTIVE FILES--\n\n")
        f.write("--Directory Map--\n\n")
        f.write(directory_map)
        f.write("\n--File Contents--\n\n")
        f.write(",".join(file_contents))
    return output_file

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_file_prefix = "output"
    ignore_dirs = [".git", "node_modules", ".next", "dist"]
    max_depth = 5
    directory_map, file_contents = traverse_directory(script_dir, ignore_dirs, max_depth)
    if not file_contents:
        print("No .tsx, .ts, .css, or .txt files found in the specified directory.")
    else:
        output_file = write_to_txt(directory_map, file_contents, output_file_prefix)
        print(f"Directory traversal complete. Results written to {output_file}.")