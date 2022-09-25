
# Joke Search App

  

This is a single page application that allows the user to look at a random selection of books available in the courses offered at the mini-school from the home page. There is functionality which allows creating an account with a teacher or student role as well as a login page to change the users rights. There are two components, one for faculty members and one for students, that allows the user to display all books in all courses. The faculty members can assign questions to each book and the students can answer all assignments assigned to a book.
  

## Table of Contents


- [Features](#Features)

- [Installation](#installation)

- [Usage](#usage)

- [Description](#Description)

- [Instructional-GIF](#Instructional-GIF)

- [Video-Describing-Functionality](#Video-Describing-Functionality)

- [Credits](#Credits)

- [License](#License)

- [Badges](#Badges)

  

## Features

  

1. From the home page, the user can view a random book from each of the 5 English courses available from the SPA. Upon render of the home page, a new random number selects a different book from each course and displays it as a card. Clicking on each card will direct the user to the login page. Each card has a link that will direct the user **outside of the SPA** to a website with a pdf of the book.

2. The login page offers a link to a signup page. The signup page checks for a valid password and upon a successful sign up will redirect to the login page. The login page takes a username, password and user role, then will redirect to the correct users page, either faculty or student.

3. The faculty page lists a menu for all courses, expanding the course item will list a menu of each book in the course. Each book item in the expanded list is a link to render a card including that books information. The information for the card is derived from the parameters of the URL. Each card allows the teacher to enter a question and submit to the curriculum for that book.

4. The student page lists a menu for all courses, expanding the course item will list a menu of each book in the course. Each book item in the expanded list is a link to render a card including the books information. The information for the card is derived from the parameters of the URL. Each card allows the student to list the next question assigned to the book that has not been answered. The student is then able to submit an answer to that question.

  

## Installation

  

This is an SPA that simulates a learning experience on canvas or a similar online school. Clone the repository to your machine and run the node installation command below to install the necessary dependencies.
```js
npm install
```
It is built with the React framework and must be initialized by running the following command.
```js
npm start
```
It is accessible through a local browser and the data is established on a local JSON file using relative paths. The JSON server must be started before use by running the following command.
```js
npm run server
```
Now you're ready to learn or teach.

Clone the repo [from Github here](https://github.com/Bambam320/phase-2-miniSchool-project)

  

## Usage

  

The SPA's functions are described below with imagery and code to best demonstrate their use.

  

**Joke Search Menu**

  

![](images/Search_menu.png  "Search Menu")

  

#### The anonymous function below is a small part of the code used to take the users selection. It searches for the list of check boxes with the class name of category and returns an array of those check boxes. That array is reduced by only those checkboxes that are checked and an array of strings for those selected categories is provided. The ternary operator at the bottom is used to replace the last comma with a question mark. See the next snippet of code for an explanation of why that is.

  

```js

const  category = function() {

let  categorySelections = Object.entries(document.getElementsByName('category'))

let  selectedCategories = categorySelections.reduce(function(accum, val) {

return  accum += val[1].checked === true ? `${val[1].id},` : ''

}, '')

return  selectedCategories != '' ? `${selectedCategories.slice(0,-1)}?` : selectedCategories

}

```

  

#### The fetch API uses string interpolation to grab the strings returned from the variables for category, style etc. in the URL to build the correct address for requesting jokes. The data returned by the promise is then sent to a function for listing a single joke or several jokes.

  

```js

fetch(`${jokeServer}${category() === '' ? 'Any?' : category()}${flags()}${style()}${searchText != '' ? searchField : ''}${amount}`)

.then(res  =>  res.json())

.then(data  =>  amount.charAt(7) === '1' ? postListing(data) : postListings(data.jokes))

.catch(error  =>  alert(error.message))

```

  

#### The necessity for two separate functions for listing jokes comes from the failure case in which no valid jokes are returned. In a single joke search, the key ERROR's value is true. However, in a multiple joke search, the array that is expected is actually undefined. Both functions funnel to the jokeListBuilder() function.

  

```js

function  postListing(listing) {

if (listing.error === true) {

return  alert('No Matching Jokes Found')

} else  if(listing.error === false || listing.id != NaN) {

jokeListBuilder(listing)

}

}

function  postListings(listings) {

if (listings === undefined) {

return  alert('No Matching Jokes Found')

} else {

for (const  listing  of  listings) {

postListing(listing)

}

}

}

```

  

*Joke Search Menu*

  

![](images/Joke_cards.png  "Joke Cards")

  

#### Each joke card is listed by the jokeListBuilder() function. You can find it in the index.js file. The function is divided into 3 parts. The first part, creates elements that the joke card will use such as buttons and paragraphs. The second part, fills and changes the text contents, id's and classes of those elements created in the first part. The last part depicted below, is used to append the correct elements based on the joke type. Jokes retrieved from the local json server will include a delete button while jokes retrieved from the API will not include one. Jokes that are presented with a question and answer are considered two part jokes and require the extra text element.

  

```js

switch(true) {

case  listing.type === 'single' && listing.local === undefined:

jokeContainer.append(joke, category, id, flags, saveButton, removeButton)

break;

case  listing.type === 'twopart' && listing.local === undefined:

jokeContainer.append(setup, lineBreak, delivery, category, id, flags, saveButton, removeButton)

break;

case  listing.type === 'single' && listing.local === true:

jokeContainer.append(joke, category, id, flags, saveButton, removeButton, deleteButton)

break;

case  listing.type === 'twopart' && listing.local === true:

jokeContainer.append(setup, lineBreak, delivery, category, id, flags, saveButton, removeButton, deleteButton)

break;

}

```

  

![](images/Favorite_buttons.png  "Action Buttons")

  

#### There are several functions between lines 128 and 169 of the index.js file which handle the removal and deletion of jokes from the SPA and the json server. They are straight forward and the function depicted below is used to delete all jokes from the local server. The event listener prevents refreshing of the page and fetches with a get method, the jokes from the local json server. It then passes the data from the server to the deleteAllJokes() function which iterates over each joke and uses the delete method on each one. Then it returns an alert letting the user know all jokes have been deleted.

  

```js

document.querySelector('#delete_all_saved_jokes').addEventListener('click', (e) => {

e.preventDefault()

fetch('http://localhost:3000/Favorites')

.then(res  =>  res.json())

.then(data  =>  deleteAllJokes(data))

})

function  deleteAllJokes(jokes) {

for (const  joke  of  jokes) {

fetch(`http://localhost:3000/Favorites/${joke.id}`, {method:  'DELETE'})

.then(res  =>  res.json())

}

alert('All jokes have been deleted from the favorites folder!')

}

```

  

#### The event listener below is used to save all jokes currently listed on the SPA to the local server. It retrieves all current jokes on the SPA and checks if there are any. If there are, a fetch API gets the current jokes saved in the local server and iterates over each joke on the SPA. For each joke, its ID is compared to all the id's on the server and if none are found, the save button of that joke has a click event simulated on it, passing it to a saveThisJoke() function which uses a fetch API with a post method to save jokes to the local server.

  

```js

document.querySelector('#save_all_jokes').addEventListener('click', (e) => {

e.preventDefault()

let  jokeCollection = document.getElementsByClassName('joke-card')

if (jokeCollection.length === 0) {

alert('There are no jokes listed to be saved.')

} else {

fetch('http://localhost:3000/Favorites')

.then(res  =>  res.json())

.then(data  => {

for (const  joke  of  jokeCollection) {

const  found = data.find(ele  =>  joke.querySelector('.jokeID').id === ele.id)

if (found === undefined) {

joke.querySelector('#save_button').click()

} else {

alert(`The joke with ID : ${joke.querySelector('.jokeID').id} has already been saved`)

}

}

})

}

})

```

  

#### The favorites button has an event listener attached to it. It fetches the jokes from the local server and passes that data to the listFavorites() function. It checks the length of data and determines if there are any jokes saved to the local server. If there are, it iterates over the joke id's stored on the local server and fetches each joke from the joke API and passes that joke to the modeifyAndPostListing() function which adds a key value pair to the joke and passes it back to the jokeListBuilder() function. That key adds a value which lets the function know it's a local joke and needs the button to delete it from the local server added to it's jokecard.

  

```js

function  listFavorites(jokes) {

if (jokes.length === 0) {

alert('No jokes are stored in the Favorites Folder')

} else {

for (const  joke  of  jokes) {

fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${joke.joke_id}`)

.then(res  =>  res.json())

.then(data  =>  modifyAndPostListing(data))

}

}

}

```

  

## Description

  

- I chose the openLibrary API because each book had the perfect kind of information that I could use to build, "courses" in the mini-school SPA. I had to add some additional information to it to fit the needs of assigning questions and answers to each books. 

- The client-side routing involved in this SPA was mostly educational. The nested routes were not required but they proved to be very valuable in supporting the mental model I now have of them. I also had to react router version 6 because version 5 was not compatible with the framework. That proved to be another challenge as several changes were made between version 5 and 6 which changed which components I would import from the router.

- This SPA uses the Material ui framework which makes it the best looking website that I have ever created. I used some of the readily available examples from the Material ui docs and altered some of them because I needed additional styling or functionality. Using the API docs for components to obtain the correct props was a great learning experience.

- I chose to use the GET, POST and PATCH HTTP methods to provide all of the functionality in assigning information to a JSON object. The teacher is able to create a question and POST it as a new object while a student is able to PATCH the answer to that question to the same object where the question was declared.

- This SPA uses all of the information I've recently learned in Phase 2 to provide a teaching and learning experience using several hooks, routes and components.

  

## Instructional-GIF

  

![](https://media.giphy.com/media/iEVHoQiil5rvuyAF43/giphy.gif)

  

***Searching and Saving***

  

![](https://media.giphy.com/media/Cei4BQea2ESoRs12PI/giphy.gif)

  

***Manipulating Favorites***

  

## Video-Describing-Functionality

  

[![Watch the video](https://i.imgur.com/tFpeM1l.png)](https://youtu.be/THSd4kodg4E)

  

## Credits

  

This project uses the free API from [openLibrary](https://openlibrary.org/developers)

  

## License

  

MIT License
Copyright (c) 2022 Igor M.  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice (including the next paragraph) shall be included in all copies or substantial portions of the Software.

  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  

## Badges

![](https://img.shields.io/github/commit-activity/w/Bambam320/phase-2-miniSchool-project)