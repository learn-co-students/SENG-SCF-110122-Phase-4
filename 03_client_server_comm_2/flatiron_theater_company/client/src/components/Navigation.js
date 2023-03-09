import { useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'

function Navigation() {
 const [menu, setMenu] = useState(false)

 const closeStyles = {marginBottom: 4, border: '1.5px solid pink', borderRadius: 3,width: 14, textAlign:'center', cursor: 'pointer'}
  
    return (
        <Nav> 
         <NavH1>Flatiron Theater Company</NavH1>
         <Menu>

           {!menu ?
           <div onClick={() => setMenu(x => !x)}>
             <GiHamburgerMenu size={30}/> 
           </div>:
           <ul>
            <li onClick={() => setMenu(x => !x)} style={closeStyles}>x</li>
            <li><Link to='/productions/new'>New Production</Link></li>
            <li><Link to='/'> Home</Link></li>
           </ul>
           }
         </Menu>

        </Nav>
    )
}

export default Navigation


const NavH1 = styled.h1`
font-family: 'Splash', cursive;
`
const Nav = styled.div`
  display: flex;
  justify-content:space-between;
  
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  a{
    text-decoration: none;
    color:white;
    font-family:Arial;
  }
  a:hover{
    color:pink
  }
  ul{
    list-style:none;
  }
  
`;
