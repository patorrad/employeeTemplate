# employeeTemplate

## Description 

empleeTemplate is a software engineering team generator command line application. The application prompts the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and intens. The app generates a summary of the data submitted by the user in html format.

## Installation

This is a Node.js app. The following are dependencies need to be installed:

 * fs
 * util
 * inquirer
 * jest

## Usage

The app initializes with asking the user if he/she wishes to add a team member. The three choices are manager, engineer or intern. Once a team member has been added the following information is requested for all team members:

* Name
* Id
* Title
* Office Number (manager only)
* Github (engineer only)
* School (inter only)

Once the user ends adding team members the app generates an html in the directory of the app and smoothly exits.

## Tests

A series of unit test are written that the user can run to ensure functionality is intact. The following is the app structure:

```
lib/           // classes and helper code
output/        // rendered output
templates/     // HTML template(s)
test/          // jest tests
  Employee.test.js
  Engineer.test.js
  Intern.test.js
  Manager.test.js
app.js         // Runs the application
```

Each team member type has a class defined in the lib folder. A html template is avaialable for each team member type in the templates folder. 

## Credits

Thank you to Joe Rehfuss (https://github.com/Rufasa85) for his knowledge and patience. 



