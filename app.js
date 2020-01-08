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
let cardsHTML = '';

async function promptUser() {
    let { position } = await inquirer.prompt({
        message: "What position would you like to add?",
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
            employeeArray.push(new Intern(name, id, email, school));
            break;
        default:
            console.log('Position provided does not exist. Try again.');
            
            break;
    };
};

async function getHTML(employees) {
    for (element of employees) {
        
        let html = await readFileAsync(`./templates/${element.getRole()}.html`, 'utf8');
        html = html
        .replace(/employeeName/, element.name)
        .replace(/employeeTitle/, element.getRole())
        .replace(/employeeId/, element.id)
        .replace(/employeeEmail/, element.email);
        switch (element.getRole())
        {
            case 'Engineer': html = html.replace(/github/, element.github); break;
            case 'Inter':    html = html.replace(/school/, element.school); break;
            case 'Manager':  html = html.replace(/officeNumber/, element.officeNumber); break;
        }
        cardsHTML += html;
        //console.log(element);        
        //console.log(html);
    }    
    //return html;
    console.log(cardsHTML);
    let index = await readFileAsync(`./templates/index.html`, 'utf8');
    index = await index.replace(/jsHTML/, cardsHTML);
    await writeFileAsync(
        "index.html",
        index,
        "utf8"
      );
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
    await getHTML(employeeArray);
    // let test = getHTML(employeeArray[0].getRole());
    // console.log(employeeArray[0].name);
    
    // let test1 = (await test).replace(/name/, employeeArray[0].name);
    // console.log(test1);    
};

// function init() {
//     let test = new Manager('name', 'id', 'email', 'officeNumber');
//     console.log(test.getRole());
    
// };

init();