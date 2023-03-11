import {Link} from 'react-router-dom'
import styled from 'styled-components'


function ProductionCard({production}) {
  const {image, id} = production
  console.log(production)
  return (
    <Card>
      <Link to={`/productions/${id}`}> <img src={image}/></Link>
    </Card>
   
  )
}

export default ProductionCard


const Card = styled.li`
  align-self: flex-start;
  margin: 25px 0;
  &:hover {
    transform: scale(1.15);
    transform-origin: top left;
  }
  a{
    text-decoration:none;
    color:white;
  }
  img {
    width: 180px;
    margin-left:20%;
    mask-image: linear-gradient(to left, rgba(0, 0, 0, .9) 80%, transparent 100%);
  }
`