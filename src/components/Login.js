import React, { useEffect, useState } from 'react'
import { useSignIn, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const signIn = useSignIn()
    const navigate = useNavigate()
    const auth = useAuthUser()

    if (auth() != null && auth().section == 'yala') {
        window.location.replace('/yala')
    } else if (auth() != null && auth().section == 'lobuche') {
        window.location.replace('/lobuche')
    }

    const handleChange = (e) => {

        if(e.target.id == 'pass'){
            setPassword(e.target.value)
        }else if(e.target.id = 'uname'){
            setUsername(e.target.value)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response
        try {
            await fetch('https://cyan-worm-sari.cyclic.cloud/auth/users', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password
                })
            }).then( async (res) => {
                response = await res.json()
            })
            
            if(response.logged){
                signIn({
                    expiresIn: 10080,
                    authState: { section : response.section },
                })

                if(response.section == 'yala'){
                    navigate('/yala')
                }else if(response.section == 'lobuche'){
                    navigate('/lobuche')
                }
            }



        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <form style={{
                marginTop: '10%',
                marginLeft: '30%',
                marginRight: '30%'
            }} onSubmit={handleSubmit}>
                <div className="form-group " >

                    <input type="text" id='uname' className="form-control" placeholder="Username" onChange={handleChange} />

                    <br />

                    <input type="password" id='pass' className="form-control" placeholder="Password" onChange={handleChange} />

                    <br />
                    <div style={{ textAlign: 'center' }}>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

                </div>
            </form>

        </>
    )
}
