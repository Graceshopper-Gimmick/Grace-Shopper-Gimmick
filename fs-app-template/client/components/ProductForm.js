import React, { useState } from 'react'
import axios from 'axios'
import { Button, Paper, TextField, withStyles } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import { connect } from 'react-redux'

const styles = (theme) => ({
  profileCard: {
      margin: theme.spacing(1),
      minWidth: 120,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 300,
      justify: 'right',
      textAlign: 'center',
  },

  centered: {
      width: '50vw',
      height: '77vh',

      position: 'absolute',
      top: '60px',
      bottom: '0',
      left: '',
      right: '200px',

      margin: 'auto',
  },
})


const ProductForm = (props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnailImgUrl, setImgUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const { classes, theme } = props
  const submit = async(evt) => {
    evt.preventDefault();
    const product = await axios.post('api/products', {name, price, category, thumbnailImgUrl, description});
    props.history.push('/home');
}
//<TextField label="First Name" id="outlined-basic"  variant="outlined" name='firstName' value={firstName} onChange={(evt) => handleChange(evt)}  />
//<TextField style={{marginTop:'2rem'}}label="Email Address" id="outlined-basic"  variant="outlined" name='email' value={email} onChange={(evt) => handleChange(evt)}  />
  return (
      <div>
        <Paper style={{overflow:"scroll"}} className={`${classes.profileCard} ${classes.centered}`}>
    <h2>Create Product</h2>
    <form onSubmit={submit}>        
        <TextField label="Name" id="outlined-basic" variant="outlined" name="name" value={name} onChange={(evt)=>setName(evt.target.value)} />
        <TextField  label="Price" id="outlined-basic" variant="outlined" name="price"  value={price} onChange={(evt)=>setPrice(evt.target.value)} />
        <TextField label="Category" id="outlined-basic" variant="outlined" name="category" value={category} onChange={(evt)=>setCategory(evt.target.value)}  />
        <TextField label="Image" id="outlined-basic" variant="outlined" name="thumbnailImgUrl" value={thumbnailImgUrl} onChange={(evt)=>setImgUrl(evt.target.value)}  />
        <TextField label="Description" id="outlined-basic" variant="outlined" name="description" value={description} onChange={(evt)=>setDescription(evt.target.value)} />
        <Button color="primary" startIcon={<SaveIcon />} variant="contained" type="submit">Create </Button>
    </form>
      </Paper>
    </div>
  )
}
const mapState = state => state

export default withStyles(styles, { withTheme: true })(connect(mapState)(ProductForm))