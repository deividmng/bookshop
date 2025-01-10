//? use the sortcut --- rafce
import React, { useEffect, useState } from 'react'
import axios from 'axios' //It allows to ask api rqs
import { Link } from 'react-router-dom'

///In React, useState is a Hook that allows you to add state to functional components. It provides a way to store, update, and manage data that changes over time within your component.

const Books = () => {

    const [books,setBooks] = useState([])

    useEffect (() => {
      //! rmb async cause we are making a api request, if I dont punt async it dont work 
        const fecthAllBooks = async () => {
          //
            try {
              //! as is a asysnc function we need to await 
                const res = await axios.get("http://localhost:8800/books")
                console.log(res)
                setBooks(res.data)
            }catch(err) {
                console.log(err)
            }
        }
        fecthAllBooks()
    },[])//[] to run just one time 


   //? here i gonna in js 

//    document.addEventListener('DOMContentLoaded', () => {
//     const booksContainer = document.getElementById('books-container'); // Assuming you have a container to show books

//     const fetchAllBooks = async () => {
//         try {
//             const response = await fetch('http://localhost:8800/books');
//             const books = await response.json();
//             console.log(books); // To verify the books in the console

//             // Clear the container before adding the books
//             booksContainer.innerHTML = '';

//             // Iterate over the books and append them to the container
//             books.forEach(book => {
//                 const bookElement = document.createElement('div');
//                 bookElement.classList.add('book'); // Optional, you can add a class for styling
                
//                 bookElement.innerHTML = `
//                     <h3>${book.title}</h3>
//                     <p>${book.desc}</p>
//                     <p>Price: $${book.price}</p>
//                     <img src="${book.cover}" alt="${book.title} cover" />
//                 `;
                
//                 booksContainer.appendChild(bookElement);
//             });

//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // Call the function to fetch books when the page loads
//     fetchAllBooks();
// });



    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8800/books/${id}`); 
        window.location.reload(); // refres the page 
      } catch (err) {
        console.log(err); // In case of error  
      }
    };
    


  return (
    <div>
      
    <h1>Book Shoop </h1>
    <div className="books" >
    {/* If we use map, we need to have a unique id */}
      {books.map(book=> (
        <div className='book' key={book.id}>
   {book.cover &&  <img src={book.cover} alt="" />}
  {/* I will try to add the img later */}
   <h2>{book.title}</h2>
    {/* {book.title} on this way we acces to the data  */}
   <p>{book.desc}</p>
   <span>{book.price}£</span>
   <button className='delete' onClick={()=> handleDelete(book.id)}>Delete</button>

{/* The link is coming from react-router-dom. To access the exact item, don't forget to include the ID. */} 
   <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
 
        </div>
      ))}
    </div>
    <button><Link to="/add">Add a new book </Link></button>
     {/* that lisnk is the same as a href  is commig from react dom*/}

    </div>
  )
}


export default Books





























// id	name	license_id	address_number	address_street_name	ssn
// 14887	Morty Schapiro	118009	4919	Northwestern Dr	111564949


// Jeremy Bowers
// Tushar Chandra
// 16371	Annabel Miller	490173	103	Franklin Ave	318771143



// Northwestern Dr

// Annabel LIVES SOMEWHERE Franklin Ave





// SELECT * FROM get_fit_now_check_in WHERE membership_id LIKE "48Z%"

// 48Z55	20180109	1530	1700


// id	age	height	eye_color	hair_color	gender	plate_number	car_make	car_model
// 183779	21	65	blue	blonde	female	H42W0X	Toyota	Prius
// 423327	30	70	brown	brown	male	0H42W2	Chevrolet	Spark LS
// 664760	21	71	black	black	male	4H42WR	Nissan	Altima

// date that i need  January the 9th and  plate that included "H42W"