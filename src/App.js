import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import BoardsCreateForm from "./pages/boards/BoardsCreateForm";
import BoardPage from "./pages/boards/BoardPage";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";
import BoardsPage from "./pages/boards/BoardsPage";
import BoardEditForm from "./pages/boards/BoardEditForm";
import TaskEditForm from "./pages/tasks/TaskEditForm";

function App() {


  return (
    <div className={styles.App}>
      
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          
          <Route
            exact
            path="/boards"
            render={() => (
              <BoardsPage
                message="No results found. Adjust the search keyword or create a board."
              />
            )}
          />

          <Route exact path="/boards/create" render={() => <BoardsCreateForm />} />
          <Route exact path="/boards/:id" render={() => <BoardPage />} />
          <Route exact path="/boards/:id/edit" render={() => <BoardEditForm />} />

          <Route exact path="/tasks/create" render={() => <TaskCreateForm />} />
          <Route exact path="/tasks/:id/edit" render={() => <TaskEditForm />} />


          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
        </div>
  );
}

export default App;