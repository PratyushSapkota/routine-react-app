import Lobuche from "./Lobuche"
import Yala from "./Yala"
import Login from "./Login"
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { RequireAuth, useAuthUser, useSignOut } from "react-auth-kit"

function Logout(){
    const signout = useSignOut()
    signout()
    window.location.replace('/')
}


function Main() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/yala" element={<RequireAuth loginPath="/"> <Yala /> </RequireAuth>} />
                    <Route path="/lobuche" element={<RequireAuth loginPath="/">  <Lobuche />  </RequireAuth>} />
                    <Route path="/" element={<Login />} />
                    <Route path="/logout" element={<RequireAuth> <Logout /> </RequireAuth>} />
                </Routes>
            </BrowserRouter>
        </>
    )


}

export default Main