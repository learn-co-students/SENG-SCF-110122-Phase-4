import { useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'

function Navigation() {
 const [menu, setMenu] = useState(false)

 const user = 1

 const closeStyles = {
  marginBottom: 4,
  border: "1.5px solid pink",
  borderRadius: 3,
  width: 14,
  textAlign: "center",
  cursor: "pointer",
};
  
    return (
        <Nav> 
         <NavLink to="/">
        <h1>Flatiron Theater Company</h1>
      </NavLink>
         <Menu>
           {!menu?
           <div onClick={() => setMenu(!menu)}>
             <GiHamburgerMenu size={30}/> 
           </div>:
           <ul>
            <li onClick={() => setMenu(!menu)} style={closeStyles}>x</li>
            <li><Link to={`/users/${user}`}>User Page</Link></li>
            <li><Link to='/users/new'>Sign Up</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/productions/new'>New Production</Link></li>
            <li><Link to='/'> Home</Link></li>
           </ul>
           }
         </Menu>

        </Nav>
    )
}

export default Navigation


const NavLink = styled(Link)`
  text-decoration: none;
  h1 {
    font-family: "Splash", cursive;
    color: #42ddf5;
      &:hover {
      color: pink;
    }
  }
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
