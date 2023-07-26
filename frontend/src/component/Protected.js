import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Protected(props) {
    const {Component, name} = props;
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user);
    useEffect(()=>{
     console.log(name);
        if(name=== "NewProduct" && userData.email !== "pachourisuhani@gmail.com"){
            navigate('/login') 
        }
        else if(userData.email === ""){
            navigate('/login')
          }
    }, [])
  return (
    <div><Component/></div>
  )
}
