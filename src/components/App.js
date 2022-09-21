//functional imports
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//component imports
import NavBar from './NavBar';
import Home from "./Home"
//Outlet for rendering current selected component
import { Outlet } from 'react-router-dom'

//material imports
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function App() {

  const eng101 = ['OL4444289M', 'OL32520899M', 'OL24777120M', 'OL26639962M', 'OL39222415M']
  const eng202 = ['OL26339938M', 'OL32838419M', 'OL26491056M', 'OL32238679M', 'OL6514878M']
  const eng303 = ['OL13972886M', 'OL30728742M', 'OL26639962M', 'OL13983741M', 'OL16521070M']
  const eng404 = ['OL33990002M', 'OL37027591M', 'OL3693769M', 'OL24156400M', 'OL6977704M']
  const eng505 = ['OL23238391M', 'OL39221187M', 'OL26238737M', 'OL9317140M', 'OL25098005M'] 

// function run () {
//     const course = 'eng505'
//     const readingMaterial = eng505[4]
//     fetch(`https://openlibrary.org/api/books.json?bibkeys=OLID:${readingMaterial}&jscmd=data&format=json`)
//       .then((r) => r.json())
//       .then((bookData) => postBook(bookData, readingMaterial, course))
//   }

//   function postBook(bookData, readingMaterial, course) {
    
//     const post = {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({...bookData, 
//         chapters: {
//           chapter_1: {
//             name: "Chapter 1",
//             content: "The principle of distribution of the subject-matter between the two works is far from obvious, and has been much debated. Not much can be gathered from their titles, which in any case were not given to them by their author. Nor do these titles suggest any very compact unity in the works to which they are applied: the plural forms, which survive so oddly in English (Ethic_s_, Politic_s_), were intended to indicate the treatment within a single work of a _group_ of connected questions."
//           },
//           chapter_2 : {
//             name: "Chapter 2",
//             content: "The _Ethics_ of Aristotle is one half of a single treatise of which his _Politics_ is the other half. Both deal with one and the same subject. This subject is what Aristotle calls in one place the “philosophy of human affairs;” but more frequently Political or Social Science. In the two works taken together we have their author’s whole theory of human conduct or practical activity, that is, of all human activity which is not directed merely to knowledge or truth."
//           },
//           chapter_3 : {
//             name: "Chapter 3",
//             content: "Nevertheless each work aims at a relative completeness, and it is important to observe the relation of each to the other. The distinction is not that the one treats of Moral and the other of Political Philosophy, nor again that the one deals with the moral activity of the individual and the other with that of the State, nor once more that the one gives us the theory of human conduct, while the other discusses its"
//           },
//           chapter_4: {
//             name: "Chapter 4",
//             content: "We must, however, remember that the production of good character is not the end of either individual or state action: that is the aim of the one and the other because good character is the indispensable condition and chief determinant of happiness, itself the goal of all human doing. The end of all action, individual or collective, is the greatest happiness of the greatest number. There is, Aristotle insists, no difference of kind between the good of one and the good of many or all."
//           },
//           chapter_5: {
//             name: "Chapter 5",
//             content: "Looking forward, then, to the life of the State as that which aids support, and combines the efforts of the individual to obtain happiness, Aristotle draws no hard and fast distinction between the spheres of action of Man as individual and Man as citizen. Nor does the division of his discussion into the _Ethics_ and the _Politics_ rest upon any such distinction. The distinction implied is rather between two stages in the life of the civilised man—the stage of preparation for the full life of the adult citizen, and the stage of the actual exercise or enjoyment of citizenship."
//           }
//         }
//       })
//     }
//     fetch(`http://localhost:3001/${course}`, post)
//     .then((r) => r.json())
//   }

  return (
    <div>
      <NavBar />
        {/* <button onClick={postBook}> postBook </button><br></br>
         <button onClick={run}> run function </button> */}
      <Outlet />
    </div>
  )
  
}

export default App;

// function run () {
  //   const course = 'eng505'
  //   const readingMaterial = eng505[4]
  //   fetch(`https://openlibrary.org/api/books.json?bibkeys=OLID:${readingMaterial}&jscmd=data&format=json`)
  //     .then((r) => r.json())
  //     .then((bookData) => postBook(bookData, readingMaterial, course))
  // }

  // function postBook(bookData, readingMaterial, course) {
    
  //   const post = {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({...bookData, 
  //       chapters: {
  //         chapter_1: {
  //           name: "Chapter 1",
  //           content: "The principle of distribution of the subject-matter between the two works is far from obvious, and has been much debated. Not much can be gathered from their titles, which in any case were not given to them by their author. Nor do these titles suggest any very compact unity in the works to which they are applied: the plural forms, which survive so oddly in English (Ethic_s_, Politic_s_), were intended to indicate the treatment within a single work of a _group_ of connected questions."
  //         },
  //         chapter_2 : {
  //           name: "Chapter 2",
  //           content: "The _Ethics_ of Aristotle is one half of a single treatise of which his _Politics_ is the other half. Both deal with one and the same subject. This subject is what Aristotle calls in one place the “philosophy of human affairs;” but more frequently Political or Social Science. In the two works taken together we have their author’s whole theory of human conduct or practical activity, that is, of all human activity which is not directed merely to knowledge or truth."
  //         },
  //         chapter_3 : {
  //           name: "Chapter 3",
  //           content: "Nevertheless each work aims at a relative completeness, and it is important to observe the relation of each to the other. The distinction is not that the one treats of Moral and the other of Political Philosophy, nor again that the one deals with the moral activity of the individual and the other with that of the State, nor once more that the one gives us the theory of human conduct, while the other discusses its"
  //         },
  //         chapter_4: {
  //           name: "Chapter 4",
  //           content: "We must, however, remember that the production of good character is not the end of either individual or state action: that is the aim of the one and the other because good character is the indispensable condition and chief determinant of happiness, itself the goal of all human doing. The end of all action, individual or collective, is the greatest happiness of the greatest number. There is, Aristotle insists, no difference of kind between the good of one and the good of many or all."
  //         },
  //         chapter_5: {
  //           name: "Chapter 5",
  //           content: "Looking forward, then, to the life of the State as that which aids support, and combines the efforts of the individual to obtain happiness, Aristotle draws no hard and fast distinction between the spheres of action of Man as individual and Man as citizen. Nor does the division of his discussion into the _Ethics_ and the _Politics_ rest upon any such distinction. The distinction implied is rather between two stages in the life of the civilised man—the stage of preparation for the full life of the adult citizen, and the stage of the actual exercise or enjoyment of citizenship."
  //         }
  //       }
  //     })
  //   }
  //   fetch(`http://localhost:3001/${course}`, post)
  //   .then((r) => r.json())
  // }

  // <button onClick={postBook}> postBook </button><br></br>
  // <button onClick={run}> run function </button>