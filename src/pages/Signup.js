import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { signup,signInWithGoogle,signInWithGitHub } from "../helpers/auth";
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

  const Signup = () => {
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [error,setError] = useState(null);
	
	 async function  handleSubmit  (e)  {
		e.preventDefault();
		setError('');
		try {
			await signup(email,password)
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

		async function  githubSignIn () {
  try {
    await signInWithGitHub();
  } catch (error) {
  	setError(error.message)
  }
}
	const classes = styles();
			return (
		<div className={classes.root}>
		<form onSubmit={handleSubmit}>
		<h1>
		  <Button variant="contained" color="primary">
		<Link to='/'>Chatonne</Link>
		</Button>
		</h1>
		<p>Fill in the form below to create an account. </p>
		<div>
		<input 
		 placeholder="Email"
		 name="email"
		  type="email" 
		  onChange={ (e) => setEmail(e.target.value)} 
		  value={email} />

		  <input
		   placeholder="password"
		    name="password"
		     type="password" 
		     onChange={ (e) => setPassword(e.target.value)} 
		     value={password} /> 
		</div>
		{ error ? <p>{error}</p> : null}
		 <Button variant="contained" color="secondary">Sign up </Button>
		<p>Or</p>
		<div className="signUp">
 <Button variant="contained" color="secondary" onClick={googleSignIn}>
  Sign up with Google
</Button>
<Button variant="contained" color="secondary"  onClick={githubSignIn}>
  Sign up with GitHub
</Button>
		</div>
		<hr></hr>
		<p>Already have an account <Link to ="/Login">Login</Link></p>
		</form>
		</div>
		)
}

export default Signup;