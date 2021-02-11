import React from 'react'
import { Field, reduxForm } from 'redux-form'

let ProductForm = (props) => {
  const { handleSubmit } = props
  return (
      <div>
    <h1>Create a new product!</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Product Name</label>
        <Field name="name" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="price">Product Price</label>
        <Field name="price" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

ProductForm = reduxForm({
    form: 'product'
})(ProductForm)

export default ProductForm

