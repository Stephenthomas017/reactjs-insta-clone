import React, {useState,useEffect} from 'react';
import './App.css';
import Post from "./Post";
import {db,auth} from './firebase'
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {Button} from "@material-ui/core";
import Input from '@material-ui/core/Input';
import ImageUploads from "./ImageUploads"

//Display Modal
function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes =useStyles();
  const [Posts,setPosts] =useState([]);
  const [modalStyle] = useState(getModalStyle);
  const [open,setOpen] =useState(false);
  const [openSignIn,setOpenSignIn] =useState(false);
  const [username,setUsername] =useState('');
  const [password,setPassword] =useState('');
  const [email,setEmail] =useState('');
  const [user,setUser] =useState(null);
  useEffect (() => {
    const unsubscribe =auth.onAuthStateChanged((authUser) =>{
      if (authUser){
        console.log(authUser);
        setUser(authUser);
       
      }else{
        setUser(null);

      }
    })
    return() =>{
      unsubscribe();
    }
    
  },[user,username]);
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc =>({
        id:doc.id,
        post:doc.data()
      })));
    })
  },[]);
  const signUp=(event) =>{
      event.preventDefault();
      auth
      .createUserWithEmailAndPassword(email,password)
      .then((authUser) =>{
        return authUser.user.updateProfile({
          displayName:username
        })
      .catch((error) =>alert(error.message))
      })
      
  }

  const signIn =(event) =>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) =>alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      
    
     
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app_signup">
        <center>
        <img
        clasName="app_headerimage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""/>
        </center>
        <Input
        className="signup_input"
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) =>setEmail(e.target.value)}
        />
        <Input
         className="signup_input"
        placeholder="username"
        type="text"
        value={username}
        onChange={(e) =>setUsername(e.target.value)}
        />
        <Input
         className="signup_input"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) =>setPassword(e.target.value)}
        />
        <Button type="submit"  onClick={signUp}>Sign Up</Button>

        
    
        </form>
     
    </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app_signup">
        <center>
        <img
        clasName="app_headerimage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""/>
        </center>
        <Input
        className="signup_input"
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) =>setEmail(e.target.value)}
        />
        
        <Input
         className="signup_input"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) =>setPassword(e.target.value)}
        />
        <Button type="submit"  onClick={signIn}>Sign In</Button>

        
    
        </form>
     
    </div>
      </Modal>

      <div className="app_header">
     <img className="app_headerimage"
      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      alt=""/>
      {user ?(
        <Button onClick={() => auth.signOut()}> LOGOUT </Button>
      ):(
        <div className="login_container">
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)}>Sign up</Button>

        </div>
      )}
      </div>
      
      
        <div className="app_posts">
        {
        Posts.map(({id,post }) =>(
          <Post key={id}  postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
        </div>
      
    {user?.displayName ? (
        <ImageUploads username={user.displayName}  />
      ):(
        <h3>Sorry you need to login to upload</h3>
      )}
         
    
    </div>
    
   
  );
}

export default App;
