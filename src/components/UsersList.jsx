export function UsersList ({ users, showColors, deleteUser }) {
    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Last name</th>
                    <th>Country</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        const backgroundColor = index % 2 === 0 ? '#333' : '#555'
                        const color = showColors ? backgroundColor : 'transparent'
                        return (
                            <tr key={user.email} style={{backgroundColor: color}}>
                                <td>
                                    <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
                                </td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button onClick={() => deleteUser(user.email)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}