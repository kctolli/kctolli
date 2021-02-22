/* Lesson 2 */

/* VARIABLES */

// Step 1: declare and instantiate a variable to hold your name
const myName = "Kyle Tolliver";

// Step 2: place the value of the name variable into the HTML file (hint: document.querySelector())
document.querySelector('#name').textContent = myName;

// Step 3: declare and instantiate a variable to hold the current year

const year = 2020;

// Step 4: place the value of the current year variable into the HTML file
document.querySelector('#year').textContent = year;

// Step 5: declare and instantiate a variable to hold the name of your picture
// Step 6: copy your image into the "images" folder

const mypic = './images/me.jpg';

// Step 7: place the value of the picture variable into the HTML file (hint: document.querySelector().setAttribute())

document.querySelector('img').setAttribute('src', mypic)

/* ARRAYS */

// Step 1: declare and instantiate an array variable to hold your favorite foods
const foods = ['tacos', 'meatloaf', 'lemon cookies'];

// Step 2: place the values of the favorite foods variable into the HTML file
document.querySelector('#food').textContent = foods;

// Step 3: declare and instantiate a variable to hold another favorite food
const favoriteFood = 'Cheesecake';

// Step 4: add the variable holding another favorite food to the favorite food array
foods.push(favoriteFood);

// Step 5: repeat Step 2
document.querySelector('#food').textContent = foods;

// Step 6: remove the first element in the favorite foods array
foods.shift();

// Step 7: repeat Step 2
document.querySelector('#food').textContent = foods;

// Step 8: remove the last element in the favorite foods array
foods.pop();

// Step 7: repeat Step 2
document.querySelector('#food').textContent = foods;