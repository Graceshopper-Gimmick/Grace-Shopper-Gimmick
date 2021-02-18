import React, { useState } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

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
    console.log(this.props);
  return (
      <div>
    <form onSubmit={submit}>
      <div>
        <label>Email Address</label>
        <input name='email' value={email} onChange={(evt) => handleChange(evt)} />
      </div>
      <div>
        <label>First Name</label>
        <input name='firstName' value={firstName} onChange={(evt) => handleChange(evt)} />
      </div>
      <div>
        <label>Last Name</label>
        <input name='lastName' value={lastName} onChange={(evt) => handleChange(evt)} />
      </div>
      <div>
        <label>Address</label>
        <input name='address' value={address} onChange={(evt) => handleChange(evt)} />
      </div>
      <div>
        <label>State</label>
        <input name='state' value={state} onChange={(evt) => handleChange(evt)} />
      </div>      
      <button type="submit">Update</button>
    </form>
    </div>
  )
  }

}

const mapState = (state) => state



export default connect(mapState)(EditProfile)