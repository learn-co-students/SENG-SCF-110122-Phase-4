import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'
import {Form, ERR_DIV} from '../styled/Form'


function ProductionForm({addProduction}) {
  const [formData, setFormData] = useState({
    title:'',
    genre:'',
    budget:'',
    image:'',
    director:'',
    description:''
  })
  const [errors, setErrors] = useState(null)
console.log("new form errors: ", errors)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const history = useHistory()

  function onSubmit(e){
    e.preventDefault()
    
    fetch('/productions',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({...formData, ongoing:true})
    })
    .then(res => {
      if(res.ok){
        res.json().then((prod) => {
          addProduction(prod)
          history.push(`/productions/${prod.id}`)
        })
      } else {
        //Display errors
        res.json().then(data => setErrors(Object.entries(data.errors).flat()))
      }
    })
  }
  
  const renderErrors = (e) => {
    const str = e.map((err, i) => i % 2 === 0 ? `${err}: ` : `${err} 🎭 `)
    return str.join(" ").toUpperCase()
  }

    return (
      <div className='App'>
      <Form onSubmit={onSubmit}>
        <label>Title </label>
        <input type='text' name='title' value={formData.title} onChange={handleChange} />
        
        <label> Genre</label>
        <input type='text' name='genre' value={formData.genre} onChange={handleChange} />
      
        <label>Budget</label>
        <input type='number' name='budget' value={formData.budget} onChange={handleChange} />
      
        <label>Image</label>
        <input type='text' name='image' value={formData.image} onChange={handleChange} />
      
        <label>Director</label>
        <input type='text' name='director' value={formData.director} onChange={handleChange} />
      
        <label>Description</label>
        <textarea type='text' rows='4' cols='50' name='description' value={formData.description} onChange={handleChange} />
      
        <input type='submit' value='Update Production' />
      </Form>
      {errors && <ERR_DIV><h4>🎭 {renderErrors(errors)}</h4></ERR_DIV>}
      </div>
    )
  }
  
  export default ProductionForm

