import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { signin,signInWithGoogle,signInWithGitHub } from "../helpers/auth";
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';


const styles = makeStyles({
  root:{
 backgroundColor: 'black',
   minHeight: '100vh',
   display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
       color:'white',

    '&  a ':{
      textDecoration:'none',
      color:'white'

    },


    '& div button': {
      margin:'10px',
    },
    ' & h1 button': {
      fontSize:'30px',
      backgroundColor:'purple',
      '&:hover':{
        backgroundColor:'#510751'
      }
    },
    '& input ': {
  color:'#fff',
  background:'#333',
  border: 0 ,
  borderRadius:' 0.25rem',
  height:'1rem',
  padding: '0.9rem 1.25rem 0',
  margin:'1px'
}

    }
  })


const Login = () => {
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [error,setError] = useState(null)
	

	async function  handleSubmit(e) {
		e.preventDefault();
		setError('');
		try {
			await signin(email,password);
		}
		catch(error) {
			setError(error.message)
		}

	}
			 async function  googleSignIn  ()  {
			try {
				await signInWithGoogle();
			}
			catch(error) {
				setError(error.message);
			}
		}
		 async function  githubSignIn ()  {
  try {
    await signInWithGitHub();
  } catch (error) {
  	setError(error.message)
  }
}

  const classes = styles();
	    return (
      <div className={classes.root}>
     
          <h1>
            Login to
            <Button variant="contained" color="primary">
            <Link to="/">
              Chatonee
            </Link>
            </Button>
          </h1>
          <p>
            Fill in the form below to login to your account.
          </p>
          <div>
             <p>Log in with any of these services</p>
                <Button variant="contained" color="secondary"  onClick={googleSignIn}>
            Sign in with Google
          </Button>
              <Button variant="contained" color="secondary"  onClick={githubSignIn}>
            Sign in with GitHub
          </Button>
          </div>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
      </div>
    );
    }

export default Login
