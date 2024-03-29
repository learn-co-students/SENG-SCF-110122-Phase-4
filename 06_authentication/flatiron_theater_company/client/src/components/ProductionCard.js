import {Link} from 'react-router-dom'
import styled from 'styled-components'


function ProductionCard({production}) {
    const {image, id} = production
    // console.log(production)
    return (
      <Card>
      <Link to={`/productions/${id}`}>
        {" "}
        <img src={image} />
      </Link>
    </Card>
     
    );
  }
  
  export default ProductionCard


  const Card = styled.li`
    display:flex;
    flex-direction:row;
    justify-content:start;
    font-family:Arial, sans-serif;
    margin:10px;
    &:hover {
      transform: scale(1.15);
      transform-origin: top left;
    }
    a{
      text-decoration:none;
      color:white;
    }
    img{
      width: 180px;
      margin-left:20%;
      mask-image: linear-gradient(to left, rgba(0, 0, 0, .9) 80%, transparent 100%);
    }
    position:relative;
    div{
     position:absolute;
    
    }
  `