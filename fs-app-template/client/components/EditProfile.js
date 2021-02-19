import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  profileCard: {
      margin: theme.spacing(1),
      minWidth: 120,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 300,
      alignItems: 'center',
      textAlign: 'center',
  },

  centered: {
      width: '50vw',
      height: '75vh',

      position: 'absolute',
      top: '70px',
      bottom: '0',
      left: '0',
      right: '0',

      margin: 'auto',
  },
})



class EditProfile extends React.Component{
constructor(props){
    super(props)
    this.state = {
        email: this.props.auth?this.props.auth.email : '',
        firstName: this.props.auth?this.props.auth.firstName : '',
        lastName: this.props.auth?this.props.auth.lastName : '',
        address: this.props.auth?this.props.auth.address : '',
        state: this.props.auth?this.props.auth.state : ''
    }
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
}

async submit(evt){
    evt.preventDefault();
    const userId = this.props.auth.id;
    const user = await axios.put(`/api/users`, {...this.state, userId });
    this.props.history.push('/home');
  }

async handleChange(evt){
this.setState({
    [evt.target.name]:evt.target.value
})
}

  render(){
    const {submit,handleChange} = this
    const {email, firstName, lastName, address, state} = this.state
    const { classes, theme } = this.props

  return (
    <div id="editProfile">
    <Paper style={{overflow:"scroll"}} className={`${classes.profileCard} ${classes.centered}`}>

    <form onSubmit={submit}>
        
        <TextField style={{marginTop:'2rem'}}label="Email Address" id="outlined-basic"  variant="outlined" name='email' value={email} onChange={(evt) => handleChange(evt)}  />

        <TextField label="First Name" id="outlined-basic"  variant="outlined" name='firstName' value={firstName} onChange={(evt) => handleChange(evt)}  />
      
        <TextField label="Last Name" id="outlined-basic"  variant="outlined" name='lastName' value={lastName} onChange={(evt) => handleChange(evt)} />
      
        <TextField label="Address" id="outlined-basic"  variant="outlined" name='address' value={address} onChange={(evt) => handleChange(evt)} />
    
        <TextField label="State" id="outlined-basic"  variant="outlined" name='state' value={state} onChange={(evt) => handleChange(evt)} />
       
      
      <Button color="primary" startIcon={<SaveIcon />}variant="contained" type="submit">Save </Button>
      
    </form>
    </Paper>
    </div>
  )
  }

}

const mapState = (state) => state



export default withStyles(styles, { withTheme: true })(connect(mapState)(EditProfile))
