import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import Button from '@material-ui/core/Button';
import {   makeStyles } from '@material-ui/core/styles';
import ColorButton from './ColorButton'



const styles = makeStyles({
  root:{
 
    '& span.MuiButton-label  a': {
      textDecoration:'none',
      color:'white',

    },
    '& a.navbar-brand': {               
      textDecoration:'none',
      fontSize:'30px'

    },
    '& .MuiButton-containedPrimary': {
      margin:'10px',
      backgroundColor:'purple',
      '&:hover':{
        backgroundColor:'#510751'
      }
    },
    '& .navbar-nav button': {
      margin:'5px'
    }

  }
})

function Header() {
  const nav = styles();
  return (
    <header>
      <nav className={nav.root}>
<Button variant="contained" color="primary">
        <Link className="navbar-brand" to="/">ChatOnee</Link>
        </Button>
        <div>
          {auth().currentUser
            ? <div className="navbar-nav">
               <ColorButton><Link className="nav-item nav-link" to="/chat">Profile</Link></ColorButton>
              <ColorButton onClick={() => auth().signOut()}>Logout</ColorButton>
            </div>
            : null
          }
        </div>
      </nav>
    </header>
  );
}

export default Header;