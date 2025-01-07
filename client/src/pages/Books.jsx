import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Books = () => {

    const [books,setBooks] = useState([])

    useEffect (() => {
        const fecthAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books")
                console.log(res)
                setBooks(res.data)
            }catch(err) {
                console.log(err)
            }
        }
        fecthAllBooks()
    },[])
  return (
    <div>
      Books
    

    </div>
  )
}

export default Books
