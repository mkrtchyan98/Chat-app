import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
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
    '& div.signUp a ': {
      textDecoration:'none',
      color:'white'
    },
    '& div.signUp button': {
      margin:'10px'
    },
    '& p': {
      color:'white'
    },
      '& h1': {
      color:'white'
    }
  }
})
 const Home =() =>  {
  const classes = styles();

    return (
      <div className={classes.root}>
        <Header></Header>
        <section>
          <div>
            <div>
              <h1 >Welcome to CHATONEE</h1>
              <p className="lead">A  place to share your thoughts with friends</p>
              <div className="signUp">
                <Button variant="contained" color="secondary" >
                <Link className="btn btn-primary" to="/signup">Create New Account</Link>
                </Button>
                <Button variant="contained" color="secondary">
                <Link className="btn" to="/login">Login to Your Account</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

export default  Home;