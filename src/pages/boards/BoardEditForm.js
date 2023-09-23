import React, {useEffect, useState } from "react"
import { Alert, Button,  Container, Form,   } from "react-bootstrap"
import appStyles from "../../App.module.css"
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/BoardForm.module.css";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";


function BoardEditForm() {
  const [errors, setErrors] = useState({});

  const [boardData, setBoardData] = useState({
    name: "",
  });
  const { name, } = boardData;

  const history = useHistory();
  const { id } = useParams();


  useEffect(() => {
    const handleMount = async () => {
        try {
            const { data } = await axiosReq.get(`/boards/${id}/`);
            const { name, is_owner } = data;

            is_owner ? setBoardData({ name }) : history.push("/");
        } catch (err) {
            console.log(err);
        }
    };

    handleMount();
    }, [history, id]);



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
        await axiosReq.put(`/boards/${id}/`, formData);
        history.push(`/boards/${id}`);
    } catch(err){
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }  
    }
  };


    return (
    <Container className={appStyles.Container}>
        <h1 className={styles.Formtitle}>Edit Board</h1>
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
        Edit
        </Button>
        <Link to={`/boards/${id}`} className={`${btnStyles.Button} ${btnStyles.Light} ${btnStyles.Wide}`} type="submit">
        Cancel
        </Link>

      </Form>
    </Container>
  );
}
export default BoardEditForm;