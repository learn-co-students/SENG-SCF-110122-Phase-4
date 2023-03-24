import { Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import ProductionForm from "./components/ProductionForm";
import EditProductionForm from "./components/EditProductionForm";
import Navigation from "./components/Navigation";
import ProductionDetail from "./components/ProductionDetail";
import UserPage from "./components/UserPage";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

function App() {
  const [productions, setProductions] = useState([]);
  const [errors, setErrors] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  console.log(productions);

  useEffect(() => {
    console.log("checking auth")
    fetch("/auth").then((r) => {
      if (r.ok) r.json().then((data) => setUser(data))
    });
  }, []);

  const fetchProductions = async () => {
    const resp = await fetch("/productions");
    if (resp.ok) {
      const result = await resp.json();
      setProductions(result);
    } else {
      const errors = await resp.json();
      setErrors(errors.errors);
    }
  };

  useEffect(() => {
    fetchProductions();
    console.log("productions fetched!")
  }, [user])

  const addProduction = (production) =>
    setProductions((current) => [...current, production]);

  const updateProduction = (updatedProduction) =>
    setProductions((current) => {
      return current.map((production) => {
        if (production.id === updatedProduction.id) {
          return updatedProduction;
        } else {
          return production;
        }
      });
    });

  const deleteProduction = (id) =>
    setProductions((current) => current.filter((p) => p.id !== id));

  const addToCart = (ticket) => setCart((cart) => [...cart, ticket]);
  if (errors) return <h1>{errors}</h1>;

  const updateUser = (x) => setUser(x);

  return (
    <>
      <GlobalStyle />
      <Navigation cart={cart} user={user} updateUser={updateUser} />

      {!user ? (
        <Switch>
          <Route path="/login">
            <Login updateUser={updateUser} />
          </Route>
          <Route path="/users/new">
            <SignUp />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/productions/new">
            <ProductionForm addProduction={addProduction} />
          </Route>

          <Route path="/productions/:id/edit">
            <EditProductionForm updateProduction={updateProduction} />
          </Route>

          <Route path="/productions/:id">
            <ProductionDetail
              addToCart={addToCart}
              deleteProduction={deleteProduction}
            />
          </Route>

          <Route path="/users/:id">
            <UserPage />
          </Route>

          <Route exact path="/">
            <Home productions={productions} />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
    body{
      background-color: black; 
      color:white;
    }
    `;
