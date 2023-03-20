import React, { useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {Form} from '../styled/Form'

function EditProductionForm({updateProduction}) {
  const [formData, setFormData] = useState({
    title:'',
    genre:'',
    budget:'',
    image:'',
    director:'',
    description:''
  })
  const [errors, setErrors] = useState(null)
  const {id} = useParams()
  const history = useHistory()
  useEffect(() => {
    fetch(`/productions/${id}`)
    .then(res => res.json())
    .then(setFormData)
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }


  function onSubmit(e){
    e.preventDefault()
    //PATCH to `/productions/${id}`
    fetch(`/productions/${id}`,{
      method:'PATCH',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(formData)
    })
    .then(res => {
      if(res.ok){
        res.json().then(updateProduction)
        history.push(`/productions/${id}`)
      } else {
        //Display errors
        res.json().then(data => setErrors(Object.entries(data.errors)))
      }
    })
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
      {errors && errors.map((e,i) => <h2 style={{color:'red'}} key={i}>{e[0]}: {e[1]}</h2>)}
      </div>
    )
  }
  
  export default EditProductionForm
