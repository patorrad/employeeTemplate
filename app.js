let Employee = require("./lib/Employee");
let Engineer = require("./lib/Engineer");
let Manager  = require("./lib/Manager");
let Intern   = require("./lib/Intern");
let fs = require("fs");
const util = require("util");
let inquirer = require("inquirer");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let employeeArray = [];

async function promptUser() {
    let { position } = await inquirer.prompt({
        message: "What position would you like to add?",
        name: "position"
    })
    let { name } = await inquirer.prompt({
        message: "What is the manager's name?",
        name: "name"
    })
    let { id } = await inquirer.prompt({
        message: "What is her/his id?",
        name: "id"
    })
    let { email } = await inquirer.prompt({
        message: "What is her/his email?",
        name: "email"
    })
    position = position.toLowerCase();
    
    switch (position) {
        case 'manager':
            let { officeNumber } = await inquirer.prompt({
                message: "What is her/his office number?",
                name: "officeNumber"
            })
            employeeArray.push(new Manager(name, id, email, officeNumber));
            break;
        case 'engineer':
            let { github } = await inquirer.prompt({
                message: "What is her/his github?",
                name: "github"
            })
            employeeArray.push(new Engineer(name, id, email, github));
            break;
        case 'intern':
            let { school } = await inquirer.prompt({
                message: "What is her/his school?",
                name: "school"
            })
            employeeArray.push(new Engineer(name, id, email, school));
            break;
        default:
            break;
    };
};

async function getHTML(employeeRole) {
    console.log(employeeRole);
    
    //let { html } = await readFileAsync(`./templates/${employeeRole}.html`, 'utf8');
    //return html;
}

function generateHTML(employees) {
    try {
        employees.forEach(element => {
           console.log(getHTML(element.getRole));
        });        
    } catch (err) {
        console.log(err);        
    }
    return ``
}

async function init() {
    let prompt = true;
    while(prompt) {
        response = await inquirer.prompt({
            type: "confirm",
            name: "choice",
            message: "Add a team member?"
        }); 
        if (response.choice) {
            await promptUser();
        }
        else {
            prompt = false;
            console.log("Goodbye.");
        }        
    };
    generateHTML(employeeArray);    
};

init();