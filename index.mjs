// import readline from 'readline';
// import { spawn } from 'child_process';
// import chalk from 'chalk';
// import os from 'os';
// import fs from 'fs';
// import path from 'path';

// // Initialize readline interface for command input
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     prompt: chalk.green(`${os.userInfo().username}@nodezsh:${process.cwd()}$ `), // Custom prompt
//     completer: (line) => {
//         const completions = fs.readdirSync(process.cwd()); // Autocompletion for current directory
//         const hits = completions.filter((c) => c.startsWith(line));
//         return [hits.length ? hits : completions, line];
//     },
// });

// // Command History
// let commandHistory = [];
// let historyIndex = -1;

// // Display the prompt
// rl.prompt();

// rl.on('line', (line) => {
//     const command = line.trim();

//     if (!command) {
//         rl.prompt();
//         return;
//     }

//     // Store the command in history
//     commandHistory.push(command);
//     historyIndex = commandHistory.length;

//     const args = command.split(' ');
//     const cmd = args[0];
//     const cmdArgs = args.slice(1);

//     // Handle the 'exit' command
//     if (cmd === 'exit') {
//         console.log(chalk.blue('Exiting...'));
//         process.exit(0);
//     }

//     // Spawn a child process to execute the command
//     const child = spawn(cmd, cmdArgs, { stdio: 'inherit', shell: true });

//     // After the command execution completes, display the prompt again
//     child.on('close', () => {
//         rl.prompt();
//     });
// });

// // Handle the SIGINT signal (Ctrl+C)
// rl.on('SIGINT', () => {
//     console.log(chalk.red('\nUse "exit" to leave.'));
//     rl.prompt();
// });

// // Handle readline close event
// rl.on('close', () => {
//     console.log(chalk.blue('Goodbye!'));
//     process.exit(0);
// });




import readline from 'readline';  // Import readline for interactive terminal input
import chalk from 'chalk';        // Import chalk for color output
import figlet from 'figlet';      // Import figlet for generating ASCII art
import os from 'os';             // Import os to fetch system info
import path from 'path';         // Import path for working with file paths
import fs from 'fs';             // Import fs for working with the filesystem
import { setTimeout } from 'timers/promises'; // For adding delay (animations)

// Create a readline interface for terminal interaction
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.green(`${os.userInfo().username}@nodezsh:${process.cwd()}$ `),
});

// Function for generating ASCII art with a typing animation
async function typeGreeting() {
    const greeting = figlet.textSync('CH4R17Y', { font: 'Standard' });
    const animationSpeed = 50; // Speed of typing effect
    let index = 0;
    
    // Clear the console before typing
    process.stdout.write('\x1b[2J\x1b[0;0H'); // Clear screen and reset cursor position
    
    // Type out the ASCII art character by character with animation
    while (index < greeting.length) {
        process.stdout.write(chalk.cyan(greeting[index]));
        index++;
        await setTimeout(animationSpeed); // Wait for the animation speed
    }

    console.log(); // New line after typing out greeting
    rl.prompt();
}

// List directory contents (simple `ls` command)
function listDirectory() {
    fs.readdir(process.cwd(), (err, files) => {
        if (err) {
            console.error(chalk.red('Error reading directory.'));
        } else {
            files.forEach(file => {
                console.log(chalk.green(file));
            });
        }
        rl.prompt();
    });
}

// Clear the screen (simple `clear` command)
function clearScreen() {
    process.stdout.write('\x1b[2J\x1b[0;0H'); // Clears the terminal screen and moves cursor to top
    rl.prompt();
}

// Print the current working directory (simple `pwd` command)
function printWorkingDirectory() {
    console.log(chalk.green(process.cwd()));
    rl.prompt();
}

// Change the directory (simple `cd <dir>` command)
function changeDirectory(directory) {
    const newPath = path.join(process.cwd(), directory);
    fs.access(newPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(chalk.red(`No such directory: ${directory}`));
        } else {
            process.chdir(newPath);
            console.log(chalk.green(`Changed directory to: ${process.cwd()}`));
        }
        rl.prompt();
    });
}

// Display the contents of a file (simple `cat <file>` command)
function displayFileContent(fileName) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log(chalk.red(`Error reading file: ${fileName}`));
        } else {
            console.log(chalk.green(data));
        }
        rl.prompt();
    });
}

// Echo text to the terminal (simple `echo` command)
function echoText(text) {
    console.log(chalk.green(text));
    rl.prompt();
}

// Create a new empty file (simple `touch` command)
function createFile(fileName) {
    fs.open(fileName, 'w', (err, file) => {
        if (err) {
            console.log(chalk.red(`Error creating file: ${fileName}`));
        } else {
            console.log(chalk.green(`File ${fileName} created.`));
        }
        rl.prompt();
    });
}

// Remove a file (simple `rm` command)
function removeFile(fileName) {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.log(chalk.red(`Error deleting file: ${fileName}`));
        } else {
            console.log(chalk.green(`File ${fileName} deleted.`));
        }
        rl.prompt();
    });
}

// Display current date and time (simple `date` command)
function showDate() {
    console.log(chalk.green(new Date().toLocaleString()));
    rl.prompt();
}

// Create a new directory (simple `mkdir` command)
function createDirectory(directory) {
    fs.mkdir(directory, { recursive: true }, (err) => {
        if (err) {
            console.log(chalk.red(`Error creating directory: ${directory}`));
        } else {
            console.log(chalk.green(`Directory ${directory} created.`));
        }
        rl.prompt();
    });
}

// Function to apply color themes
function changeColorScheme() {
    rl.question('Select a color scheme (1- Green, 2- Blue, 3- Red, 4- Yellow): ', (choice) => {
        switch (choice) {
            case '1':
                rl.setPrompt(chalk.green(`${os.userInfo().username}@nodezsh:${process.cwd()}$ `));
                break;
            case '2':
                rl.setPrompt(chalk.blue(`${os.userInfo().username}@nodezsh:${process.cwd()}$ `));
                break;
            case '3':
                rl.setPrompt(chalk.red(`${os.userInfo().username}@nodezsh:${process.cwd()}$ `));
                break;
            case '4':
                rl.setPrompt(chalk.yellow(`${os.userInfo().username}@nodezsh:${process.cwd()}$ `));
                break;
            default:
                console.log(chalk.red('Invalid choice, keeping default.'));
                break;
        }
        rl.prompt();
    });
}

// Display basic help
function showHelp() {
    console.log(`
Available Commands:
- 'help'   : Show this help message.
- 'exit'   : Exit the terminal.
- 'clear'  : Clear the terminal screen.
- 'ls'     : List files in the current directory.
- 'pwd'    : Show the current directory path.
- 'cd <dir>' : Change to the specified directory.
- 'cat <file>' : Display contents of a file.
- 'echo <text>' : Display text.
- 'touch <file>' : Create a new file.
- 'rm <file>' : Remove a file.
- 'date'   : Show the current date and time.
- 'mkdir <dir>' : Create a new directory.
- 'color'  : Change terminal color scheme.
    `);
    rl.prompt();
}

// Function to handle user input and execute commands
rl.on('line', (input) => {
    input = input.trim(); // Remove leading/trailing whitespace

    const [command, ...args] = input.split(' ');

    switch (command) {
        case 'exit':
            console.log(chalk.red('Goodbye!'));
            rl.close();
            break;
        case 'help':
            showHelp();
            break;
        case 'clear':
            clearScreen();
            break;
        case 'ls':
            listDirectory();
            break;
        case 'pwd':
            printWorkingDirectory();
            break;
        case 'cd':
            changeDirectory(args[0]);
            break;
        case 'cat':
            displayFileContent(args[0]);
            break;
        case 'echo':
            echoText(args.join(' '));
            break;
        case 'touch':
            createFile(args[0]);
            break;
        case 'rm':
            removeFile(args[0]);
            break;
        case 'date':
            showDate();
            break;
        case 'mkdir':
            createDirectory(args[0]);
            break;
        case 'color':
            changeColorScheme();
            break;
        default:
            console.log(chalk.yellow(`Command not recognized: ${input}`));
            rl.prompt();
            break;
    }
}).on('close', () => {
    process.exit(0); // Exit the process when readline is closed
});

// Start the terminal with a greeting
typeGreeting();
