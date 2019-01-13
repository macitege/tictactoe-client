# In-Browser Tic-Tac-Toe Game
#### Created by Macit Ege ERCAN

## Features
- This game lets a user play tic-tac-toe with an opponent on the same computer.
- User can/must create an account.
- Once signed in, user's past games are being saved.
- Users can change their password, fetch all past games, show individual games,
see total games played.

### Technologies Used
- For the front end of this website, `html5`, `SASS` and `bootstrap` have been
used.
- Game engine is built using `JavaScript`.
- For some animations and DOM manipulation `jQuery` has been used.
- For history of games and account operations, General Assembly's tic-tac-toe
game API has been used.

### Story of Creation
After this project was assigned, the first thing I have done was to read
requirements for the final version. Then I have updated my user stories that I
had written before. And created a basic pseudo code to see my path. It included
small steps under these titles:
- creating a basic layout on html using a bit of css,
- creating a javascript code to represent game board and do calculations on the
result
- use jQuery to show actions for the player
- create informative messages for the player
- create api connections for authorization
- create api connections for games

Although I didn't have many problems, after having several modules for the
actions, creation process became slover because of the complexity of connections
between actions. And the biggest problem for me was hitting to circular requirements
problem, which is not supported by Node.
I usually solved my problems by giving a break and writing my file and function
connections down. 99% percent of the time, that worked, however sometimes I needed
to sleep.
Also, I had problem about my layout, I dreamed of creating a superb layout, however
I realized that I didn't planned everything well.. When I tried to create the
layout I have dreamed, all my code got so complicated and I switched to another,
easier idea.


### Unsolved but should be Solved
- I planned to create a logic in javascript to let users play against computer,
 but I didn't have time to finish.
- I made 'join game' and 'watch game' connections with api for remote multiplayer
games, but then I got stuck and had to leave it for the sake of reaching to mvp.
- I have dreamed some css animations, but couldn't do because I didn't have enough
time.
- I also want to add 'Stretch Goals' given in project document.

### Initial Project
#### Wire Frame:
[TIC TAC TOE Wire Frame](https://i.imgur.com/6unEmJc.jpg)
#### User Stories:
- As a player, I want to create an account.
- As a player, I want be able to change my password.
- As a player, I want see the game history that I have played.
- As a player, I want show the info of a past game that I have played.
- As a player, I want to see whose turn it is, so that I will know I should wait or play.
- As a player, I don't want to be allowed to click on a cell that is containing an 'x' or an 'o'
- As a player, I want to restart the game after a session finishes, so that I don't have to refresh the page and sign in again.
- As a player, if a game is over, I don't want to be allowed to put more 'x's or 'o's on the game board.
