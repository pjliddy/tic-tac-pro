# tic tac pro
## Project Brief
### Project Goals
-   [ ] Build a web application from scratch using **js-template**
-   [ ] Map out the **game logic**
-   [ ] Separate **HTML, CSS,** and **JavaScript** files in your application
-   [ ] Build an application **to a spec**
-   [ ] Build a **dynamic game** that allows two players to compete (_BONUS_: compete from separate devices)
-   [ ] Craft a _**readme.md**_ file that explains your app to the world
-   [ ] Communicate with a **back-end** to store the state of your game.

#### Delivery
*   Present a working browser game hosted on **GitHub Pages,** where the rest of the world can access it.
*   Do not have any **user-facing bugs** or user interface components that do not successfully complete a task.
*   Produce documentation in the form of a **README**, which must:
    *   Link to your hosted game in the **URL section** of your Github repo.
    *   List **technologies used**
    *   **Document your planning** and **tell a story** about your development process and problem-solving strategy.
    *   List **unsolved problems** which would be fixed in future iterations.
    *   Link to **wireframes** and **user stories**.

#### Project Plan
Here's a rough sketch of what you should do and in what order:
1. Write out some **user stories** for the app. User stories are short of how a user interacts with your app, and follows the format `"As a <role>, I want to <do something>, so that <some goal>."`
2. Sketch some **rough wireframes** for how the front end will look and act.
3. **Model the entities** in your app. Draw a diagram. Use your wireframes and user stories to drive you modeling process by asking "What 'things' are a user interacting with?"
4. **Create a repo** that your project will use, and add a README to it.
5. Create a **simple front-end** with HTML and CSS, and host the front end on GitHub Pages. Use your wireframes to guide your layout.
6. Create the code to manage your **game logic**.
7. Write jQuery code to handle **browser interaction**.
8. Start **communicating** with the back-end using curl. Use this to begin writing your **AJAX** code.
9. Add any **additional features** to your app.
10. Finish your **documentation**. Make it high-quality.

### Version Control
*   Share your work through a **git repository** hosted on Github
*   Practice using version control by making **frequent, cohesive commits,** with good commit messages, dating back to the very beginning of the project

### The Game
*   Must be a **single-page application.** Do not rely on refreshing the page for any functionality.
*   Render a **game board** in the browser
*   Must use a custom **game engine** written by you.
*   **Switch turns** between X and O (or whichever markers you select), but _**DON’T** change players if an invalid move is made._
*   Assume player **X is first player** to start the game
*   **DON’T**  let players move in the same square **more than once**
*   Visually display **which side won** if a player gets three in a row or show a draw/"cat’s game" if neither wins.
*   **DON’T** let the game be playable after **finishing a game**.
*   Support playing **multiple games**, one at a time (newGame(), not simultaneously)

#### Tech Specs
*   Use **jQuery** for DOM manipulation and event handling.
*   The client will use the **API** provided by GA to communicate with the back end
*   Use **AJAX** for interacting with a provided API. Specifically, your app must:
    *   Visually **display the results** of retrieving game statistics, such as total games won by a user. `(READ)`
    *   Create **new games** on the server. `(CREATE)`
    *   **Update a game** by storing new moves. `(UPDATE)`
*   Have `login, logout,` and `change password` functionality
*   User information includes `username` and `password`
*   **DON’T** use **alerts** for anything.
*   **DON’T** display **errors** or **warnings** in the console.
*   **DON’T** display **debugging messages** in the console.
*   Use **semantic HTML.**
*   Practice **separation of concerns** by:
    *   Using the _**js-template**_ to store HTML, CSS, and JavaScript in the appropriate places.
    *   Storing DOM manipulation code and network code in _**separate files**_.
*   **KISS** (Keep It Stupidly Simple).
*   **DRY** (Don't Repeat Yourself).

#### Bonuses
Once (and only once) you've satisfied the core requirements:
*   If allowing players to compete from **separate devices**, display a _"Waiting..."_ message while users are waiting to be matched.
*   Keep track of multiple game rounds with a **win counter**.
*   Allow players to **customize their tokens** (X, O, name, picture, etc).
*   Get inventive with your **styling**, e.g. use hover effects or animations to spiff things up.
*   Add tableside **chat** to your game.
*   Use **localStorage** to persist data locally, allowing games to continue after page refresh or loss of internet connectivity.


#### Tips

-   **Break the project down into different components** (data, presentation,
    style, DOM manipulation) and brainstorm each component individually. Use
    whiteboards!
-   **Use your Development Tools** (console.log, debugger, alert statements,
    etc) to debug and solve problems.
-   Work through the lessons in class, **ask questions and schedule a 1on1**
    when you need to. Think about adding relevant code to your Tic Tac Toe game
    each night, instead of, you know... _procrastinating_.
-   **Commit early, commit often.** Don’t be afraid to break something because
    you can always go back in time to a previous version.
-   **Read documentation** (jQuery especially) at home to better understand hwo
    the tools you're using work.
-   **Don’t be afraid to write code that you know you will have to remove
    later.** Create temporary elements (buttons, links, etc) that trigger events
    if real data is not available. For example, if you’re trying to figure out
    how to change some text when the game is over but you haven’t solved the
    win/lose game logic, you can create a button to simulate that until then.
