import React,{ useState,useEffect } from 'react'
import {auth} from '../services/firebase';
import {db} from '../services/firebase';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';

const styles = makeStyles ({
  root:{
     color:'white',
   minHeight: '100vh',
   display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position:'fixed',
  width:'100%',
  height:'100%',
  '& textarea ': {
  color:'#fff',
  background:'#333',
  border: 0 ,
  borderRadius:' 0.25rem',
  padding: '0.9rem 1.25rem 0',
  margin:'1px',
  position:'relative',
  top:'10px'
  },
  '& button': {
    margin:'2px'
  },
  '& div.chats': {
    height:'100%',
    width:'100%',
    overflow:'hidden scroll'
  },
  '& div.container':{
    display:'flex',
    width:'50%',
    height:'100%',
    flexDirection:'column',
    justifyContent:'space-between'
  },
  '& div.settingBrightness': {
    position:'absolute',
    top:0,
    right:0,
  },
  '& div p.userName':{
    opacity: 0.7,
position: 'relative',
right: '90px',
  },
    '& div p.chats_time':{
    opacity: 0.7,
    fontSize:'13px'
  },
  
  '& div span.MuiSwitch-track':{
    backgroundColor:'white'
  }
}
})

const white = {
  'background': 'aliceblue',
  'color':'black'
 
};

const defaultColor = {
   'background': 'black',

};


const Chat = () => {
  const classes = styles();
 const [chats,setChats] = useState([]);
 const [user,setUser]= useState(auth().currentUser);
 const [content,setContent] = useState('');
 const [readError,SetreadError] = useState(null);
 const [writeError,SetwriteError] = useState(null);
 const [color,setColor] = useState(defaultColor);



async function PushData() {
SetreadError(null);
  try {
    db.ref("chats").on("value",snapshot => {
      let chats = [];
      snapshot.forEach((snap) => {
        chats.push(snap.val());
      })
      setChats(chats);
    })

  }
  catch(error) {
    SetreadError(error.message)
  }
 }

  useEffect(() => {
   PushData();
 	
 },[])
async function handleSubmit(e) {
	e.preventDefault();
	SetwriteError(null);
	try {
    await db.ref("chats").push({
      content: content,
      timestamp: Date.now(),
      uid:user.uid,
      displayName:user.displayName
    });
    setContent('');
}
catch(error) {
	SetwriteError(error.message)
}
}

async function logOut() {
  await auth().signOut();
  setUser(null)
}

  const handleChange = (event) => {
    setColor(event.target.checked ? white : defaultColor);
  };




 return (
    <div className={classes.root} style={color}>
       <div className="settingBrightness">
       <FormControlLabel
        control={
          <Switch
            checked={color === white}
            onChange={handleChange}
            color="secondary"
            
          />
        }
        label="Change Mode"
      />
       </div>
       <div className="container">
       <div className="chats">
      {readError ? <p>{readError}</p> : null }
        {chats.map(chat => {
          return   <div className="chat_nodes">
          <p key ={user.displayName} className="userName"> {chat.displayName}</p>
          <p key={chat.uid}>{chat.content}</p>
          <p key ={chat.timestamp} className="chats_time">{moment.utc(chat.timestamp).fromNow()} </p>
          </div>
        })}
        </div>
       
      <form onSubmit={handleSubmit}>
        <textarea onChange={(e)=>setContent(e.target.value)} value={content} ></textarea>
        {writeError ? <p>{writeError}</p> : null}
        <Button
        variant="contained"
        color="primary"
        type="submit"
      >
      <SendIcon />
      </Button>
        <Button  
         variant="contained"
         color="primary"
         type="submit"
         onClick={logOut}>
         <MeetingRoomIcon />
         </Button>

      </form>
      <div>
        Login in as: <strong>{user.email}</strong>
      </div>
    </div>
    </div>
  );
}

export default Chat ;