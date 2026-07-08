#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

console.log(chalk.magenta.bold(`
██╗   ██╗██╗██████╗ ███████╗██████╗ ██╗   ██╗██████╗ ██████╗ 
██║   ██║██║██╔══██╗██╔════╝██╔════╝██║   ██║██╔══██╗██╔══██╗
██║   ██║██║██████╔╝█████╗  ██║     ██║   ██║██████╔╝██████╔╝
╚██╗ ██╔╝██║██╔══██╗██╔══╝  ██║     ██║   ██║██╔══██╗██╔══██╗
 ╚████╔╝ ██║██████╔╝███████╗╚██████╗╚██████╔╝██║  ██║██████╔╝
  ╚═══╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ 
`));
console.log(chalk.gray('The Anti-Slop Skills | by Lohit\n'));

const questions = [
    {
        type: 'checkbox',
        name: 'skills',
        message: 'Select constraints to inject (space to toggle):',
        choices: [
            { name: 'awwwards-hero (Cinematic & Spatial Designs)', value: 'awwwards-hero' },
            { name: 'awwwards-motion (GSAP/Spring Physics)', value: 'awwwards-motion' },
            { name: 'imagegen-frontend (Premium Aesthetic Inference)', value: 'imagegen-frontend' },
            { name: 'pixel-perfect (Strict Image-to-Code replication)', value: 'pixel-perfect' },
            { name: 'visual-redesign (Non destructive React CSS Surgery)', value: 'visual-redesign' }
        ],
    },
];

inquirer.prompt(questions).then((answers) => {
    if (answers.skills.length === 0) {
        console.log(chalk.red('[-] No skills selected. Aborting.'));
        process.exit(1);
    }

    const spinner = ora('Injecting constraints into .cursorrules...').start();

    setTimeout(() => {
        // 1. Create the base .agents/skills directory in the user's project
        const baseDir = path.join(process.cwd(), '.agents', 'skills');
        if (!fs.existsSync(baseDir)) {
            fs.mkdirSync(baseDir, { recursive: true });
        }

        // 2. Loop through selected skills and create separate folders/files
        answers.skills.forEach(skill => {
            try {
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                const skillPath = path.join(__dirname, 'skills', skill, 'SKILL.md');
                const skillContent = fs.readFileSync(skillPath, 'utf8');

                // Create the specific skill folder (e.g., .agents/skills/awwwards-hero)
                const targetDir = path.join(baseDir, skill);
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }

                // Write the individual SKILL.md file
                fs.writeFileSync(path.join(targetDir, 'SKILL.md'), skillContent);

            } catch (err) {
                console.log(chalk.red(`\n[-] Error loading ${skill}: Could not find source file.`));
            }
        });

        spinner.succeed(chalk.green.bold(' Modular Injection Complete!'));
        console.log(chalk.yellow('\n[+] Skills successfully deployed to .agents/skills/'));
        console.log(chalk.gray('↳ @ mention the specific SKILL.md file you need in your IDE.\n'));
    }, 1500);
});