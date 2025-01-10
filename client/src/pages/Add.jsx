//? use the sortcut --- rafce
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const [book,setBook] = useState({
    title:"",
    desc:"",
    price:"",
    cover:"",
  })


  // Declare an object to hold the book data
// let book = {
//   title: "",
//   desc: "",
//   price: "",
//   cover: ""
// };

//   book: This is the state variable that holds the current state of the book object. Initially, it's an object with title, desc, price, and cover properties, all set to empty strings.

// setBook: This is the function used to update the book state variable. Whenever you call setBook, it will trigger a re-render of the component with the new state.

// useState: This hook is used to declare the book state and its update function (setBook). It takes an initial value as an argument (in this case, an object with empty strings).
   const navigate = useNavigate()//! "to navigate between the pages"


   //* this function I used as an event handler to triggered the changes from the form 
const handleChange = (e) => {
  setBook((prev) => ({...prev,[e.target.name] : e.target.value}))
  //!...prev: This is the spread operator. It creates a copy of the previous book 
}
console.log(book)

// Function to handle input changes
// function handleChange(event) {
//   const { name, value } = event.target; // Extract the input's name and value
//   book[name] = value; // Update the corresponding property in the book object
//   console.log(book); // Log the updated book object to see the changes
// }

const handleClick = async e => {
  e.preventDefault()//! that  it couse by default it refres the page 
  console.log("Book to send:", book); // Debug
  try{
    await axios.post("http://localhost:8800/books",book)
    //* at the end we call the json , book that it is create > [book,setBook]
    navigate("/")
  }catch(err) {
    console.log(err)
  }

}

  return (
    <div>
      <>
      <h1>here is where we gonna add the book</h1>
      <h1>Add new Boook</h1>
      <input type="text" placeholder='title'onChange={handleChange} name='title' />
      <input type="text" placeholder='desc'onChange={handleChange} name='desc' />
      <input type="number" placeholder='price' onChange={handleChange}name='price' />
      <input type="text" placeholder='cover'onChange={handleChange} name='cover' />
      </>
      <button className='formBtn' onClick={handleClick}>Add</button>
      
    </div>
  )
}
console.log("Book sent:", );

export default Add
