const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const theTeam = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptUser() {
    inquirer.prompt([{
        type: "list",
        name: "employeeRole",
        message: "Add a team member:",
        choices: () => {
            return ["Engineer", "Intern", "Manager"];
        }
    },
    {
        type: "input",
        name: "name",
        message: "What is the employees name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employees ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employees email?"
    },
    {
        when: response => response.employeeRole === `Engineer`,
        type: "input",
        name: "gitHub",
        message: "What is the engineers github?"
    },
    {
        when: response => response.employeeRole === `Intern`,
        type: "input",
        name: "school",
        message: "What is the interns school?"
    },
    {
        when: response => response.employeeRole === `Manager`,
        type: "input",
        name: "officeNumber",
        message: "What is the managers officeNumber?"
    },
    {
        type: "confirm",
        name: "addMore",
        message: "Do you want to add more members?",
    }
    ]).then(response => {
        //stuff to do here
        if (response.employeeRole === "Engineer") {
            theTeam.push(new Engineer(response.name, response.id, response.email, response.gitHub))
        } else if (response.employeeRole === "Intern") {
            theTeam.push(new Intern(response.name, response.id, response.email, response.school))
        } else if (response.employeeRole === "Manager") {
            theTeam.push(new Manager(response.name, response.id, response.email, response.officeNumber))
        }
        if (response.addMore) {
            promptUser();
        } else {
            const teamData = render(theTeam);
            fs.writeFile(outputPath, teamData, (err) => {
                if (err) throw err;
                console.log("Written!");
            });
        }
    }).catch(err => {
        if (err) { console.log(err) };
    })
}
promptUser();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
