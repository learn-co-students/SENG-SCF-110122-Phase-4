import { useParams, Link } from 'react-router-dom'
import {useEffect, useState} from 'react'
import styled from 'styled-components'

function ProductionDetail() {
  const [production, setProduction] = useState({crew_members:[], performers_and_roles:[]})
  const [ error, setError ] = useState(null)
  const { id } = useParams()
  // console.log(params)
  console.log(error)
  
  useEffect(()=>{
    //GET to '/productions/:id'
    fetch(`/productions/${id}`)
    .then(r => {
      if(r.ok) {
        r.json()
        .then(x => setProduction(x))
      } else {
        console.log(r)
        // parse my response
        r.json()
        // set state on some errors and render them to the screen
        .then(r => setError(r))
      }
    })
  },[])
  
 
 
  const {title, genre, image,description} = production 
  //Place holder data, will be replaced in the assosiations lecture. 
  const crew_members = ['Lily-Mai Harding', 'Cathy Luna', 'Tiernan Daugherty', 'Giselle Nava', 'Alister Wallis', 'Aishah Rowland', 'Keiren Bernal', 'Aqsa Parrish', 'Daanyal Laing', 'Hollie Haas']

  if(error) return <h3>{error.error}. <Link to='/'> Please try again. </Link></h3>

  return (
      <CardDetail>
        {/* {error && <h3>{error.error}. Please try again.</h3>} */}
        <h1>{title}</h1>
          <div className='wrapper'>
            <div>
              <h3>Genre:</h3>
              <p>{genre}</p>
              <h3>Description:</h3>
              <p>{description}</p>
              <h2>Crew Members</h2>
              <ul>
                {crew_members.map(crew => <li>{crew}</li>)}
              </ul>
            </div>
            <img src={image}/>
          </div>
      <button> Buy Ticket</button>
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