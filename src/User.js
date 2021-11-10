import React,{useState,useEffect} from 'react'
import {Table} from 'react-bootstrap'

export default function User()
{
    const [data,setDate]=useState([])
    const [mode,setMode]=useState("online")
    useEffect(()=>{
        let url="https://jsonplaceholder.typicode.com/users";
        fetch(url).then((response)=>{
            response.json().then((result)=>{
                console.warn("result",result);
                setDate(result)
                localStorage.setItem('userDetails',JSON.stringify(result));
            })
        }).catch((error)=>{
            let collection =   localStorage.getItem('userDetails');
            setDate(JSON.parse(collection));
            setMode("offline");
            console.warn("error ");
        })
    },[])
    return (
        <div>
            {
                mode==='offline'?
                         <div class="alert alert-warning" role="alert">
                               You are offline
                        </div>
                  
                :null
            }
            User Page
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    
                            {
                                data.map((item)=>(

                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>  
                                        <td>{item.email}</td>
                                        <td>{item.address.street}</td>  
                                    </tr>                                               
                                    ) 
                                 )

                            }
                                            

                   
                    
                </tbody>
                </Table>
        </div>
    )
}