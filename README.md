# Joke Search App

This is a single page application that allows the user to search for jokes based on several filters
including category, style, flags, text and quantity. There is a search bar that takes keywords and returns
jokes that contain text that matches. The user can save their favorite jokes in a folder
and the contents of the folder can be viewed or deleted or deleted.

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

1. Search for jokes based on 6 categories, 2 styles, 6 flags, up to 7 quantities and any search term.
2. Save an individual joke or all jokes into a favorites folder.
3. Delete an individual joke or all jokes from the favorites folder.
4. Remove an individual joke or all jokes from the page.
5. Use the option to clear jokes on the page before loading favorites or searching for new jokes.
6. Display jokes from favorites folder onto the page.

## Installation

The app is a single HTML page. It is accessible through a local browser and the user data is established
on a local JSON file using relative paths. The JSON server will need to be run using 
```js
json-server --watch db.json 
```
from the terminal in order to use it through the SPA. After cloning the repository, open the 
index.html file and enjoy.

Clone the repo [from Github here](https://github.com/Bambam320/phase-1-jokeapp-project)

## Usage

The SPA's functions are described below with imagery and code to best demonstrate their use.

**Joke Search Menu**  

![](images/Search_menu.png "Search Menu")

#### The anonymous function below is a small part of the code used to take the users selection. It searches for the list of check boxes with the class name of category and returns an array of those check boxes. That array is reduced by only those checkboxes that are checked and an array of strings for those selected categories is provided. The ternary operator at the bottom is used to replace the last comma with a question mark. See the next snippet of code for an explanation of why that is.

```js
const category = function() {
    let categorySelections = Object.entries(document.getElementsByName('category'))
    let selectedCategories = categorySelections.reduce(function(accum, val) {
        return accum += val[1].checked === true ? `${val[1].id},` : ''
    }, '')
    return selectedCategories != '' ? `${selectedCategories.slice(0,-1)}?` : selectedCategories
}
```

#### The fetch API uses string interpolation to grab the strings returned from the variables for category, style etc. in the URL to build the correct address for requesting jokes. The data returned by the promise is then sent to a function for listing a single joke or several jokes.

```js
fetch(`${jokeServer}${category() === '' ? 'Any?' : category()}${flags()}${style()}${searchText != '' ? searchField : ''}${amount}`)
    .then(res => res.json())
    .then(data => amount.charAt(7) === '1' ? postListing(data) : postListings(data.jokes))
    .catch(error => alert(error.message))
```

#### The necessity for two separate functions for listing jokes comes from the failure case in which no valid jokes are returned. In a single joke search, the key ERROR's value is true. However, in a multiple joke search, the array that is expected is actually undefined. Both functions funnel to the jokeListBuilder() function.

```js
function postListing(listing) {
  if (listing.error === true) {
    return alert('No Matching Jokes Found')
  } else if(listing.error === false || listing.id != NaN) {
    jokeListBuilder(listing)
  }
}
function postListings(listings) {
  if (listings === undefined) {
    return alert('No Matching Jokes Found')
  } else {
    for (const listing of listings) {
      postListing(listing)
    }
  }
}
```

*Joke Search Menu*  

![](images/Joke_cards.png "Joke Cards")

#### Each joke card is listed by the jokeListBuilder() function. You can find it in the index.js file. The function is divided into 3 parts. The first part, creates elements that the joke card will use such as buttons and paragraphs. The second part, fills and changes the text contents, id's and classes of those elements created in the first part. The last part depicted below, is used to append the correct elements based on the joke type. Jokes retrieved from the local json server will include a delete button while jokes retrieved from the API will not include one. Jokes that are presented with a question and answer are considered two part jokes and require the extra text element.

```js
switch(true) {
    case listing.type === 'single' && listing.local === undefined:
      jokeContainer.append(joke, category, id, flags, saveButton, removeButton)
    break;
    case listing.type === 'twopart' && listing.local === undefined:
      jokeContainer.append(setup, lineBreak, delivery, category, id, flags, saveButton, removeButton)
    break;
    case listing.type === 'single' && listing.local === true:
      jokeContainer.append(joke, category, id, flags, saveButton, removeButton, deleteButton)
    break;
    case listing.type === 'twopart' && listing.local === true:
      jokeContainer.append(setup, lineBreak, delivery, category, id, flags, saveButton, removeButton, deleteButton)
    break;
  }
```

![](images/Favorite_buttons.png "Action Buttons")

#### There are several functions between lines 128 and 169 of the index.js file which handle the removal and deletion of jokes from the SPA and the json server. They are straight forward and the function depicted below is used to delete all jokes from the local server. The event listener prevents refreshing of the page and fetches with a get method, the jokes from the local json server. It then passes the data from the server to the deleteAllJokes() function which iterates over each joke and uses the delete method on each one. Then it returns an alert letting the user know all jokes have been deleted.

```js
document.querySelector('#delete_all_saved_jokes').addEventListener('click', (e) => {
  e.preventDefault()
  fetch('http://localhost:3000/Favorites')
  .then(res => res.json())
  .then(data => deleteAllJokes(data))
})
function deleteAllJokes(jokes) {
  for (const joke of jokes) {
    fetch(`http://localhost:3000/Favorites/${joke.id}`, {method: 'DELETE'})
    .then(res => res.json())
  }
  alert('All jokes have been deleted from the favorites folder!')
}
```

#### The event listener below is used to save all jokes currently listed on the SPA to the local server. It retrieves all current jokes on the SPA and checks if there are any. If there are, a fetch API gets the current jokes saved in the local server and iterates over each joke on the SPA. For each joke, its ID is compared to all the id's on the server and if none are found, the save button of that joke has a click event simulated on it, passing it to a saveThisJoke() function which uses a fetch API with a post method to save jokes to the local server.

```js
document.querySelector('#save_all_jokes').addEventListener('click', (e) => {
  e.preventDefault()
  let jokeCollection = document.getElementsByClassName('joke-card')
  if (jokeCollection.length === 0) {
    alert('There are no jokes listed to be saved.')
  } else {
    fetch('http://localhost:3000/Favorites')
    .then(res => res.json())
    .then(data => {
      for (const joke of jokeCollection) {
        const found = data.find(ele => joke.querySelector('.jokeID').id === ele.id)
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
function listFavorites(jokes) {
  if (jokes.length === 0) {
    alert('No jokes are stored in the Favorites Folder')
  } else {
    for (const joke of jokes) {
      fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${joke.joke_id}`)
      .then(res => res.json())
      .then(data => modifyAndPostListing(data))
    }  
  }
}
```

## Description

- The JokeAPI was chosen because it fit the criteria of complexity I wanted for this project as it is my first one. The use of several filters for the joke search provided the right technical difficulty I wanted to aim for.
- The use of a JSON server is a challenge I decided to pursue because of the additional methods of deleting and posting I could use. I wanted to include some of the HTTP verbs in this assignment which required a local server. Users are able to interact with a local server to delete, create and display jokes.
- This SPA uses all of the information I've recently learned in Phase 1 and bringing it all together on an interactive page was the best learning experience so far.
- Some important concepts I learned during this project:
    - How to create a README file, there is alot involved with it and even has its own language.
    - How to break down something large into steps that are necessary for the process of building such an interactive SPA.
    - How github is used to collect, display and store the projects files and information.
    - Using the same 3 index files; .js, .css, .html to control everything a user interacts with on a website while sending and receiving information from many different sources.
    - The JavaScript language offers so many options for writing the same thing that based on each application with the same function, the code can be written in vastly different ways. While writing this code, I was able to visualize different options for doing the same thing. This allowed me to understand DRY code from the writers perspective and not only the readers.

## Instructional-GIF

![](https://media.giphy.com/media/iEVHoQiil5rvuyAF43/giphy.gif) 

***Searching and Saving***

![](https://media.giphy.com/media/Cei4BQea2ESoRs12PI/giphy.gif)

***Manipulating Favorites***

## Video-Describing-Functionality

[![Watch the video](https://i.imgur.com/tFpeM1l.png)](https://youtu.be/THSd4kodg4E)

## Credits

This project uses the free API from [Joke API by sv443](https://sv443.net/jokeapi/v2/#info)

## License

MIT License

Copyright (c) 2022 Igor M.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, 
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice (including the next paragraph) shall 
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Badges

![](https://img.shields.io/github/commit-activity/w/Bambam320/phase-1-jokeapp-project)
