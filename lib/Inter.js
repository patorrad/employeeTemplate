const Employee = require('./Employee');

class Inter extends Employee {
    constructor(school) {
        this.school = school;
    }
    getSchool();
    getRole();// Overridden to return 'Intern'
};