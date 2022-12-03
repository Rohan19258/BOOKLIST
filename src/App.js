import{BrowserRouter,Route,Routes} from 'react-router-dom'
import Dashboard from './component/home';
import Login from "./component/loginpage"
import Register from "./component/register";
import Edit from "./component/edit"
import { PrivateRoute } from './privateroute';

import Addcards from './component/form2.js';
function App() {


  return (
    <>
    <BrowserRouter>

   <Routes>
    
   <Route path="/register" element={<Register/>}/>

<Route exact path="/home" element={ <PrivateRoute>
                                <Dashboard/>
                                </PrivateRoute>
                            
}/>
<Route path="/" element={<Login/>}/>
<Route exact path="/form" element={ <PrivateRoute>
                                   <Addcards/>
                                </PrivateRoute>                        
}/>
<Route exact path="/modify/:bookid" element={ <PrivateRoute>
                                   <Edit/>
                                </PrivateRoute>                        
}/>

{/* <Route path="/addcard" element={<Addcards/>}/>     */}
   </Routes>

    </BrowserRouter>
   
    </>
  );
}

export default App;
