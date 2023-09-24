import React, {useState } from "react"

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import styles from "../../styles/BoardForm.module.css";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useRedirect } from "../../hooks/useRedirect";


function BoardsCreateForm() {
  useRedirect("loggedOut");

  const [errors, setErrors] = useState({});

  const [boardData, setBoardData] = useState({
    name: "",
  });
  const { name, } = boardData;

  const history = useHistory();

  const handleChange = (event) => {
    setBoardData({
      ...boardData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('name', name)

    try {
      const {data} = await axiosReq.post('/boards/', formData);
      console.log(data)
      history.push(`/boards/${data.id}/`);
    } catch(err){
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }  
    }
  };


    return (
    <Container className={appStyles.Container}>
        <h1 className={styles.Formtitle}>
          New Board</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Row>
            <Form.Group controlId="name">
                <Form.Label className="d-none">Board Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Board Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  />
            </Form.Group>
                {errors?.name?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                    {message}
                    </Alert>
                ))}
        </Form.Row>
        
        <Button className={`${btnStyles.Button} ${btnStyles.Orange} ${btnStyles.Wide}`} type="submit">
        Create
        </Button>
        <Link to="/boards" className={`${btnStyles.Button} ${btnStyles.Light} ${btnStyles.Wide}`} type="submit">
        Cancel
        </Link>

      </Form>
    </Container>
  );
}
export default BoardsCreateForm;

