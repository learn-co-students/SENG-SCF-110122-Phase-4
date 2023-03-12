import { Route, Switch } from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'
import {useEffect, useState} from 'react'
import Home from './components/Home'
import ProductionForm from './components/ProductionForm'
import EditProductionForm from './components/EditProductionForm'
import Navigation from './components/Navigation'
import ProductionDetail from './components/ProductionDetail'
import NotFound from './components/NotFound'

function App() {
  const [productions, setProductions] = useState([])
  const [errors, setErrors] = useState(false)


  useEffect(() => {
    fetch('/productions')
    .then(res => res.json())
    .then(setProductions)
  },[])

  const addProduction = (production) => setProductions(current => [...current,production])

  const updateProduction = (updatedProduction) => setProductions(current => {
    return current.map(production => {
     if(production.id === updatedProduction.id){
       return updatedProduction
     } else {
       return production
     }
    })
  })

  const deleteProduction = (id) => setProductions(current => current.filter(p => p.id !== id)) 


  return (
    <>
    <GlobalStyle />
    <Navigation/>
      <Switch>

      <Route  path='/productions/new'>
        <ProductionForm addProduction={addProduction}/>
      </Route>
      
      <Route  path='/productions/:id/edit'>
        <EditProductionForm updateProduction={updateProduction}/>
      </Route>
     
      <Route path='/productions/:id'>
          <ProductionDetail deleteProduction={deleteProduction}/>
      </Route>
    
      <Route exact path='/'>
        <Home  productions={productions}/>
      </Route>

      <Route>
        <NotFound />
      </Route>
      </Switch>
   
    </>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
    body{
      background-color: black; 
      color:white;
    }
    `

