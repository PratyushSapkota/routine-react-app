import React, { useState, useEffect } from "react";

function Users() {

    const [data, setData] = useState([])
    const [visibility, setVisibility] = useState(false)

    const toggle = () => {
        setVisibility(!visibility)
    }

    useEffect(() => {
        fetch('http://localhost:5000/fetchUsers').then((res) => {
            res.json().then((response) => {
                setData(response)
            })
        })
    }, []);

    return (
        <>

            <button onClick={toggle}>Show Users</button>

            {visibility && <ul>
                {data.map((item) =>
                    <li key={item.id}>username: {item.username} || password : {item.password}</li>
                )}
            </ul>}
        </>
    );
}

export default Users;
