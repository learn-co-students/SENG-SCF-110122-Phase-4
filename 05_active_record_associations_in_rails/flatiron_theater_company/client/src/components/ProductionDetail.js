import  { Link, useParams, useHistory } from 'react-router-dom'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import NotFound from './NotFound'

function ProductionDetail({deleteProduction, user}) {
  const [production, setProduction] = useState({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)

  
  
  const params = useParams()
  const history = useHistory()
  useEffect(()=>{
    //GET to '/productions/:id'
    fetch(`/productions/${params.id}`)
    .then(res => { 
      if(res.ok){
        console.log('okay')
        res.json().then(data => {
          console.log(data)
          setProduction(data)
          setLoading(false)
        })
      } else {
        res.json().then(data => setErrors(data.error))
      }
    })
  },[])

  function handleDelete(){
    //DELETE to `/productions/${params.id}`
    fetch(`/productions/${params.id}`,{
      method:'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      if(res.ok){
        deleteProduction(id)
        history.push('/')
      } else {
        res.json().then(data => setErrors(Object.entries(data.errors)))
      }
    })
  }

  const handleBuy = () => {
    fetch(`/tickets`,{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({production_id:id, user_id:user, price:30.50})
    })
    .then(res => {
      if(res.ok){
        history.push(`/users/${user}`)
      } else {
        res.json().then(data => setErrors(Object.entries(data.errors)))
      }
    })
  }
  
 
  if(errors.Production === 'Not Found') return <NotFound />
  if(loading) return <h1>Loading</h1>

  const {id, title, genre, image, description, cast_list} = production 

  console.log(cast_list)
 
  return (
      <CardDetail>
        <h1>{title}</h1>
        {errors && errors.map(err => <li key={err[1]} style={{color: "red"}}>{`${err[0]}: ${err[1]}`}</li>)}
          <div className='wrapper'>
            <div>
              <h3>Genre:</h3>
              <p>{genre}</p>
              <h3>Description:</h3>
              <p>{description}</p>
              <h2>Crew Members</h2>
              <ul>
                {cast_list.map((cm, i) => <li key={i} style={{listStyleType: "none"}}>{cm}</li>)}
              </ul>
            </div>
            <img src={image}/>
          </div>
      <button><Link to={`/productions/${id}/edit`}>Edit Production</Link></button>
      <button onClick={handleDelete}>Delete Production</button>
      <button onClick={handleBuy} >Buy Ticket</button>
      </CardDetail>
    )
  }
  
  export default ProductionDetail
  const CardDetail = styled.li`
    display:flex;
    flex-direction:column;
    justify-content:start;
    font-family:Arial, sans-serif;
    margin:5px;
    h1{
      font-size:60px;
      border-bottom:solid;
      border-color:#42ddf5;
    }
    .wrapper{
      display:flex;
      div{
        margin:10px;
      }
    }
    img{
      width: 300px;
    }
    button{
      background-color:#42ddf5;
      color: white;
      height:40px;
      font-family:Arial;
      font-size:30px;
      margin-top:10px;
    }
  `