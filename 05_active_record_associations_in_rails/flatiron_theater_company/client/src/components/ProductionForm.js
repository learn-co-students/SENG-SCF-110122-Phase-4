import React, { useState} from 'react'
import styled from 'styled-components'


function ProductionForm({handlePost, addProduction}) {
  const [formData, setFormData] = useState({
    title:'',
    genre:'',
    budget:'',
    image:'',
    director:'',
    description:''
  })
  const [errors, setErrors] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function onSubmit(e){
    e.preventDefault()
    
    fetch('/productions',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({...formData, ongoing:true})
    })
    .then(res => {
      if(res.ok){
        res.json().then(addProduction)
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
  
  export default ProductionForm

  const Form = styled.form`
    display:flex;
    flex-direction:column;
    width: 400px;
    margin:auto;
    font-family:Arial;
    font-size:30px;
    input[type=submit]{
      background-color:#42ddf5;
      color: white;
      height:40px;
      font-family:Arial;
      font-size:30px;
      margin-top:10px;
      margin-bottom:10px;
    }
  `