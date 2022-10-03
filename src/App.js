import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'


const getUsers = () => {
return axios.get('http://localhost:3001/users')
}

function App() {
const [users, setUsers] = useState([])
const [name, setName] = useState('')
const [number, setNumber] = useState('')

useEffect(() => {
  getUsers().then(res => setUsers(res.data))
}, [])

 

const addUser = (e) => {     
 e.preventDefault()
    const newUsers = {
      name,
      number
    } 
    axios.post('http://localhost:3001/users', newUsers)
    .then(res => {setUsers(users.concat(res.data))}) // для автоматического обноления на фронте
}
  return (
    <div>
        <h1>Контактная книга</h1>
        <form onSubmit={addUser}>
          <input type="text" placeholder='введите имя' value={name} onChange={e => setName(e.target.value)} />
          <input type="number" placeholder='введите номер' value={number} onChange={e => setNumber(e.target.value)} />
          <button type='submit'>Отправить</button>
        </form>
        <div className='contacts-wrapper'>
              {
                users.map((user) => {
                  return <div className='contact'>
                    <h2 className='user-name'>{user.name}</h2>  
                    <p className='user-number'>{user.number}</p>
                    </div>
                })
              }
        </div>
    </div>
  );
}

export default App;
