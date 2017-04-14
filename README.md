# tic tac toe

## Table of Contents
- [Project Demo](#project-demo)
- [Approach](#approach)
- [Technology](#technology)
- [Unsolved Problems](#unolved-problems)
- [Next Steps](#next-steps)


## Project Demo
**tic tac pro** is available to try on [GitHub Pages](https://pjliddy.github.io/tic-tac-pro/)

## Approach
My approach to creating **tic tac pro** focused on simplicity and modularity. The application architecture leverages view states to keep the level of complexity of the game application to a minimum. The game display is be structured as four layout components that manage their own content based on which view the application is expecting. These view states are determined by the user's authentication status, the current state of game play, and any relevant user input. This structure results in simple system of components that can respond to state changes without requiring a full page load..

The project plan for **tic tac pro** is available at [https://github.com/pjliddy/tic-tac-pro/blob/master/scope.md](https://github.com/pjliddy/tic-tac-pro/blob/master/scope.md#7-game-over)

## Technology
These technologies were used to create **tic tac pro:**
- **HTML5, CSS3, & JavaScript** are the core technologies
- **SASS** is used build cascading style sheets
- A custom **Bootstrap** theme delivers styling and interactivity on the presentation layer
- **jQuery** manages DOM manipulation and controlling of custom view states
- **AJAX** requests are used to access user and game databased through the API library

## Application Template and View States
**tic tac pro** uses this template structure to define its content view states to update them as views change.

<a href="https://s3.amazonaws.com/pliddy-ga/tic-tac-toe/wireframes/00-template.png" target="_blank"><img src="https://s3.amazonaws.com/pliddy-ga/tic-tac-toe/wireframes/00-template.png" width="50%"></a>

The template consists of four elements:
- **Header:** content depends on authentication state of the user
- **Content:** fixed size area for showing game play and dialog boxes for user input
- **Message:** element for showing game messages to the player(s)
- **Footer:** static footer containing copyright information

## Unsolved Problems
While **tic tac pro** meets the requirements for this project, there are still several things that can be improved upon:

- A more consistent styling across the application, managed through a custom compiled Bootstrap theme (see: [http://getbootstrap.com/customize](http://getbootstrap.com/customize))
- Creation of an basic artifical intelligence that can maximize the potential outcome of its decisions using expected value, rather than a set of conditional rules
- Implementation a true single-page application templating system to facilitate changes to view states

## Wireframes & User Stories
A complete set of user stories and corresponding wireframes can be [viewed here:](https://github.com/pjliddy/tic-tac-pro/blob/master/scope.md#user-stories-and-wireframes)
  - [US 1: Public View](https://github.com/pjliddy/tic-tac-pro/blob/master/scope.md#1-public-view)
  - [US 2: Sign Up](https://github.com/pjliddy/tic-tac-pro/blob/master/scope.md#2-sign-up)
  - [US 3: Sign In](https://github.com/pjliddy/tic-tac-pro/blob/master/scope.md#3-sign-in)
  - [US 4: Change Password](https://github.com/pjliddy/tic-tac-pro/blob/master/scope.md#4-change-password)
  - [US 5: Start New Game](https://github.com/pjliddy/tic-tac-pro/blob/master/scope.md#5-start-new-game)
  - [US 6: Play Game](https://github.com/pjliddy/tic-tac-pro/blob/master/scope.md#6-play-game)
  - [US 7: Game Over](https://github.com/pjliddy/tic-tac-pro/blob/master/scope.md#7-game-over)
