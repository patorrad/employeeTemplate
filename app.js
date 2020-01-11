let Employee = require("./lib/Employee");
let Engineer = require("./lib/Engineer");
let Manager  = require("./lib/Manager");
let Intern   = require("./lib/Intern");
let fs =       require("fs");
const util =   require("util");
let inquirer = require("inquirer");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

let employeeArray = [];
let cardsHTML = '';
let managerIs = false;

async function promptUser() {
    
    let choices = [];
    if (!managerIs) choices = ["Manager", "Engineer", "Intern"];
    else choices = ["Engineer", "Intern"];

    let { position } = await inquirer.prompt({
        message: "What position would you like to add?",
        type: "list",
        choices: choices,
        name: "position"
    })
    let { name } = await inquirer.prompt({
        message: "What is the employee's name?",
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
    switch (position) {
        case 'Manager':
            let { officeNumber } = await inquirer.prompt({
                message: "What is her/his office number?",
                name: "officeNumber"
            })
            employeeArray.push(new Manager(name, id, email, officeNumber));
            managerIs = true;
            break;
        case 'Engineer':
            let { github } = await inquirer.prompt({
                message: "What is her/his github?",
                name: "github"
            })
            employeeArray.push(new Engineer(name, id, email, github));
            break;
        case 'Intern':
            let { school } = await inquirer.prompt({
                message: "What is her/his school?",
                name: "school"
            })
            employeeArray.push(new Intern(name, id, email, school));
            break;
        default:
            console.log('Something weird happened. Try again.');
            break;
    };
};

async function getHTML(employees) {
    for (element of employees) {
        
        let html = await readFileAsync(`./templates/${element.getRole()}.html`, 'utf8');
        html = html
        .replace(/employeeName/,  element.getName())
        .replace(/employeeTitle/, element.getRole())
        .replace(/employeeId/,    element.getId())
        .replace(/employeeEmail/, element.getEmail());
        switch (element.getRole())
        {
            case 'Engineer': html = html.replace(/github/,       element.github);       break;
            case 'Inter':    html = html.replace(/school/,       element.school);       break;
            case 'Manager':  html = html.replace(/officeNumber/, element.officeNumber); break;
        }
        cardsHTML += html;
    }    
    let index = await readFileAsync(`./templates/index.html`, 'utf8');
    index = await index.replace(/jsHTML/, cardsHTML);
    await writeFileAsync("index.html", index, "utf8");
}

async function init() {
    
    for(;;) {
        response = await inquirer.prompt({
            type: "confirm",
            name: "choice",
            message: "Add a team member?"
        }); 
        if (!response.choice) break;
        await promptUser();
    };

    console.log("Generating HTML...");
    await getHTML(employeeArray);
    console.log("Goodbye.");
};

init();