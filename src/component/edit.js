import '../css/form2.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"


const Edit = () => {
    // state variables
   const [title,settitle]=useState("")
    const [author, setauthor] = useState("");
    const [publisher, setpublisher] = useState("");
    const [description, setdescription] = useState("");
    const { bookid } = useParams();
    const Navigate=useNavigate();
    const [user,setUser]=useState("")

    // const [username,setUsername]=useState({})

    const getUsers =async() => {
        const response =  await fetch(`http://localhost:8000/data/${bookid}` ,  {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "authentication": localStorage.getItem("token"),
              "auth":localStorage.getItem("email")
            },
          });
        let res= await response.json();
  settitle(res.title)
  setdescription(res.description)
  setauthor(res.author)
  setpublisher(res.publisher)
  setUser(res.isbn)
//  let date=res.publishdate.split("T")
//  setUsername(date[0])
//  console.log(date[0])
        }




    useEffect(() => {
    
getUsers()
        // fetch(`http://localhost:8000/data/:${bookid}`).then((res) => {
        //     return res.json();
        // }).then((res) => {
        //     console.log(res.title);
     
        //     // idchange(res.id);
        //     // namechange(res.name);
        //     // rolechange(res.role);
        //     // salarychange(res.salary);
        // }).catch((err) => {
        //     console.log(err.message);
        // })
    }, []);

    const handleSubmit=(e)=> { // Once the form has been submitted, this function will post to the backend
        e.preventDefault();
  
    
    const newNote={
    
    title:title.title,
    isbn:user.isbn,
     author:author.author,
     description:description.description,
    publisher:publisher.publisher
 
    
    
    }
    console.log(newNote)
    if(newNote){
    
        axios.put(`http://localhost:8000/posts/${bookid}`, newNote,{
         method: "PUT",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
           "authentication": localStorage.getItem("token"),
           "auth":localStorage.getItem("email")
         },
       })
        .then(res=>{
         //  console.log(res.status)
         alert("changed successfully")
         if(res.status===200){
             // console.log("hiiiiihii")
              Navigate("/home")
         } 
       })
       }
       else{
       alert("invalid input")
       }
       
    }

    return(
        <>
<div className="container" id="dfr">

<h1>UPDATE BOOK DETAILS</h1>
<form action="" onSubmit={handleSubmit}>

    <div className="inputBox">
        <span>Title of book</span>
        <input type="text" value={title} className="card-holder-input"  name="title" onChange={(e)=>settitle({...title,title:e.target.value})} required />
    </div>

    <div className="inputBox">
        <span>ISBN</span>
        <input type="text" value={user} maxLength="10" className="card-number-input" name="isbn" pattern="[0-9]*" inputmode="numeric" onChange={(e)=>setUser({...user,isbn:e.target.value})} required/>
    </div>
    <div className="inputBox">
        <span>Description</span>
        <input type="text" value={description} maxLength="16" className="card-holder-input"  name="description" onChange={(e)=>setdescription({...description,description:e.target.value})} required />
    </div>

    <div className="inputBox">
        <span>Author</span>
        <input type="text" value={author} className="card-holder-input"  name="author" onChange={(e)=>setauthor({...author,author:e.target.value})} required />
    </div>
    {/* <div className="inputBox">
        <span>Publish date</span>
        <input type="date" value={username} className="card-holder-input"  name="publishdate" onChange={(e)=>setUsername({...username,publishdate:e.target.value})} required />
    </div> */}
    <div className="inputBox">
        <span>Publisher</span>
        <input type="text" value={publisher} className="card-holder-input"  name="publisher" onChange={(e)=>setpublisher({...publisher,publisher:e.target.value})} required />
    </div>

    <input type="submit" value="submit" className="submit-btn"/>
</form>

</div>    
        </>
    )
}

export default Edit;