import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState(null)

  const originalUsers = useRef([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
    .then(res => res.json())
    .then(data => {
      setUsers(data.results)
      originalUsers.current = data.results
    })
  }, [])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortedByContry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry && filterCountry.length > 0
    ? users.filter(user => {
      return user.location.country.toLowerCase().startsWith(filterCountry.toLowerCase())
    })
    : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    return sortByCountry
    ? filteredUsers.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : filteredUsers
  }, [filteredUsers, sortByCountry])

  return (
    <>
    <h1>Users List</h1>
    <header>
      <button className='header-buttons' onClick={toggleColors}>
        Color rows
      </button>

      <button className='header-buttons' onClick={toggleSortedByContry}>
      {sortByCountry ? 'do not sort by country' : 'Sort by country'}
      </button>

      <button className='header-buttons' onClick={handleReset}>
        Reset Users
      </button>

      <input placeholder='Filter by country' onChange={(e) => {
        setFilterCountry(e.target.value)
      }} />

    </header>
    <main>
    <UsersList users={sortedUsers} showColors={showColors} deleteUser={handleDelete} />
    </main>
    </>
  )
}

export default App
