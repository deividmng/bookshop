
//? use the sortcut --- rafce
import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Update = () => {
  const [book,setBook] = useState({
    title:"",
    desc:"",
    price:"",
    cover:"",
  })

  const navigate = useNavigate()
  const location = useLocation()
  // const bookId = (location.pathname.split("/")[2])
  //* '/update/14', search: '', hash: '', state: null, key: '9mf9e1ke'} use the pathname.split to acces the id, to know exactly the id 
  const bookId = location.pathname.split("/")[2];
  console.log("Book ID:", bookId);
  console.log(location)
  
  // const navigate = useNavigate();
  // navigate('/about'); // Redirige al usuario a "/about".
  

const handleChange = (e) => {
  setBook((prev) => ({...prev,[e.target.name] : e.target.value}))
}
console.log(book)


const handleClick = async (e) => {
  e.preventDefault();
  console.log("Book to send:", book); // Debug
  try {

    await axios.put(`http://localhost:8800/books/${bookId}`, book); 
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className='form'>
      <>
      <h1>Update the Boook</h1>
      <input type="text" placeholder='title'onChange={handleChange} name='title' />
      <input type="text" placeholder='desc'onChange={handleChange} name='desc' />
      <input type="number" placeholder='price' onChange={handleChange}name='price' />
      <input type="text" placeholder='cover'onChange={handleChange} name='cover' />
      </>
      <button className='formBtn' onClick={handleClick}>Update</button>
      
    </div>
  )
}
console.log("Book sent:", );

export default Update
