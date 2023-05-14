import React, {useState } from "react"
import { Alert, Button,  Container, Form,   } from "react-bootstrap"
import styles from "../../styles/BoardsCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";


function BoardsCreateForm() {
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
    <Container className={styles.Container}>
        <h1> NEW BOARD</h1>
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
      </Form>
    </Container>
  );
}
export default BoardsCreateForm;

