import  { Link, useParams, useHistory } from 'react-router-dom'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import NotFound from "./NotFound"

function ProductionDetail({deleteProduction}) {

//  save data as state (useState)
// conditionally render error ONLY if state saved is truthy

  const [production, setProduction] = useState({crew_members:[], performers_and_roles:[]})
  const [foundError, setFoundError] = useState(null)
  
  const { id }  = useParams()
  const history = useHistory()
  useEffect(()=>{
    //GET to '/productions/:id'
    fetch(`/productions/${id}`)
    .then(res => { 
      if(res.ok){
        res.json().then(data => setProduction(data))
      } else {
        //Add Error handling 
        res.json()
        .then(data => setFoundError(data))
      }
    })
  },[])

  function handleDelete(){
    //DELETE to `/productions/${params.id}`
    fetch(`/productions/${id}`,{
      method: "DELETE"
    })
    .then(resp => {
      if(resp.ok) {
        deleteProduction(parseInt(id))
        history.push("/")
      } else {
        setFoundError(true)
      }
    })
  }
  

  const {title, budget, genre, image,description} = production 
  //Place holder data, will be replaced in the associations lecture. 
  const crew_members = ['Lily-Mai Harding', 'Cathy Luna', 'Tiernan Daugherty', 'Giselle Nava', 'Alister Wallis', 'Aishah Rowland', 'Keiren Bernal', 'Aqsa Parrish', 'Daanyal Laing', 'Hollie Haas']

  if(foundError) return (<NotFound />);

  return (
      <CardDetail>
        <h1>{title}</h1>
          <div className='wrapper'>
            <div>
              <h3>Genre:</h3>
              <p>{genre}</p>
              <h3>Description:</h3>
              <p>{description}</p>
              <h2>Crew Members</h2>
              <ul>
                {crew_members.map(crew => <li key={crew}>{crew}</li>)}
              </ul>
            </div>
            <img src={image}/>
          </div>
      <button><Link to={`/productions/${id}/edit`}>Edit Production</Link></button>
      <button onClick={handleDelete}>Delete Production</button>
      <button >Buy Ticket</button>
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