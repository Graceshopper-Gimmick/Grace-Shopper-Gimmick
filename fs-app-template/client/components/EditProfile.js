import React, { useState } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class EditProfile extends React.Component{
constructor(props){
    super(props)
    this.state = {
        email: this.props.auth?this.props.auth.email : ''
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
    const {email} = this.state
    console.log(this.props);
  return (
      <div>
    <form onSubmit={submit}>
      <div>
        <label>User Email</label>
        <input name='email' value={email} onChange={(evt) => handleChange(evt)} />
      </div>      
      <button type="submit">Update</button>
    </form>
    </div>
  )
  }

}

const mapState = (state) => state



export default connect(mapState)(EditProfile)