import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import BoardsCreateForm from "./pages/boards/BoardsCreateForm";
import BoardPage from "./pages/boards/BoardPage";
import TasksCreateForm from "./pages/tasks/TasksCreateForm";

function App() {

  return (
    <div className={styles.App}>
      
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/boards/create" render={() => <BoardsCreateForm />} />
          <Route exact path="/boards/:id" render={() => <BoardPage />} />
          <Route exact path="/tasks/create" render={() => <TasksCreateForm />} />

          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
        </div>
  );
}

export default App;