var inquirer = require('inquirer');
var _ = require('lodash');
var musicLibraryController = require('./src/MusicLibraryController');

// executes the command
function executeCommand(obj) {
    var command = obj.command;
    if (_.isEqual(command, 'quit')) {
        process.exit();
    } else {
        musicLibraryController.run(command);
        return inquirer.prompt;
    }
}

// object for the prompt
var questions = [
    {
        name: 'command',
        message: 'Enter command:'
    }
];

// initializes the prompt with recursion to prompt after each enter
function enterCommand() {
    inquirer.prompt(questions).then(function (command) {
        executeCommand(command);
    }).then(enterCommand);
}

enterCommand();
