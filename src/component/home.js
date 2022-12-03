import '../css/home.css';

import { useEffect, useState} from 'react';
import {  useNavigate } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import {RiDeleteBin4Fill } from "react-icons/ri";
import Collapsible from 'react-collapsible';

export default function Dashboard(){
    const Navigate=useNavigate()
    const [users,Setusers]=useState([]);


  	const handleLogout = () => {
      
		localStorage.clear();
		Navigate("/");
	};



    const gottonext=()=>{
Navigate("/form")
    }


    const gotomodify=(id)=>{
      Navigate("/modify/"+id)
          }



  
      const getUsers =async() => {
          const response =  await fetch('http://localhost:8000/data' ,  {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "authentication": localStorage.getItem("token"),
              "auth":localStorage.getItem("email")
            },
          });
          Setusers(await response.json());
     
      }
         useEffect(()=> {
         
             getUsers();
            
         },[]);

         const deletecard=async(id)=>{
          const res= await fetch(`http://localhost:8000/posts/${id}`,{
             method: "DELETE", 
             headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               "authentication": localStorage.getItem("token"),
               "auth":localStorage.getItem("email")
             },
           })
           const data=await res.json()
           getUsers()
           console.log(data)
         }


     
      return(
  <>
<header className="header">


<button className='logout' onClick={handleLogout}>
                   Logout
               </button>
</header>
<div id="secondsection">
<div id="secondsectionfirstpart"> 
<button className='wasnt' onClick={gottonext}>
                   ADD BOOKS
               </button>

</div>
{


   users.map(Elem=>{

               return (  
<div id="secondsectionfirstpart">


<Collapsible  className="collapsible"  trigger={Elem.title}>

<div className="content">
<button type="button" className='moddel' onClick={()=>deletecard(Elem._id)}><RiDeleteBin4Fill/></button>
  <button type="button" className='moddel' onClick={()=>gotomodify(Elem._id)} ><BsPencilSquare/></button>

  <span style={{color:"red"}}>Author:</span><span style={{color:"green"}}>{Elem.author}</span><br></br>
  <span style={{color:"red"}}>ISBN:</span><span style={{color:"green"}}>{Elem.isbn}</span><br></br>
  <span style={{color:"red"}}>Description:</span><span style={{color:"green"}}>{Elem.description}</span><br></br>
  <span style={{color:"red"}}>Publish Date:</span><span style={{color:"green"}}>{Elem.publishdate}</span><br></br>
  <span style={{color:"red"}}>Publisher:</span><span style={{color:"green"}}>{Elem.publisher}</span>
          
</div>
</Collapsible>
</div>
           )
          })
            }

</div>





  </> 
      )
  }
  
