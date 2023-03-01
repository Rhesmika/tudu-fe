import React, {useState } from "react"
import { Alert, Button,  Container, Form,   } from "react-bootstrap"
import styles from "../../styles/BoardsCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import BoardDropdown from "../../components/BoardDropdown";

function TasksCreateForm() {
  const [errors, setErrors] = useState({});

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    duedate: "",
    status: "",
    priority: "",
    board:"",


  });
  const { title, description, duedate, status, priority, board} = taskData;

  const history = useHistory();

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title)
    formData.append('description', description)
    formData.append('duedate', duedate)
    formData.append('status', status)
    formData.append('priority', priority)
    formData.append('board', board)



    try {
      const {data} = await axiosReq.post('/tasks/', formData);
      history.push(`/tasks/${data.id}`);
    } catch(err){
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }  
    }
  };


    return (
    <Container className={styles.Container}>
        <BoardDropdown />
        <h1> NEW TASK</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Row>
            <Form.Group controlId="title">
                <Form.Label className="d-none">Task Name</Form.Label>
                <Form.Control
                  type="title"
                  placeholder="Task title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                    {message}
                    </Alert>
                ))}

            <Form.Group controlId="description">
                <Form.Label className="d-none">Description</Form.Label>
                <Form.Control
                  type="description"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  />
            </Form.Group>
                {errors?.description?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                    {message}
                    </Alert>
                ))}

            <Form.Group controlId="deadline">
                <Form.Label className="d-none">duedate</Form.Label>
                <Form.Control
                  type="date"
                  name="duedate"
                  value={duedate}
                  onChange={handleChange}
                  />
            </Form.Group>
                {errors?.duedate?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                    {message}
                    </Alert>
                ))}


            <Form.Group controlId="priority">
                <Form.Label className="d-none">Priority</Form.Label>
                <Form.Control
                    as="select"
                    name="priority"
                    value={priority}
                    onChange={handleChange}
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>

                </Form.Control>
            </Form.Group>
                {errors?.status?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                    {message}
                    </Alert>
                ))}


            <Form.Group controlId="status">
                <Form.Label className="d-none">Status</Form.Label>
                <Form.Control
                    as="select"
                    name="status"
                    value={status}
                    onChange={handleChange}
                >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Complete</option>

                </Form.Control>
            </Form.Group>
                {errors?.status?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                    {message}
                    </Alert>
                ))}

            <Form.Group controlId="board">
                <Form.Label className="d-none">Board</Form.Label>
                <Form.Control
                    as="select"
                    name="board"
                    value={board}
                    onChange={handleChange}
                >
                <option>
                    {/* {boards.name} */}
                </option>

                </Form.Control>
            </Form.Group>



            {/* <Form.Group controlId="attachment">
                <Form.Label className="d-none">Attachment</Form.Label>
                <Form.File
                label="attachment"
                type="attachment"
                name="attachment"
                value={attachment}
                onChange={handleChange}
                />
            </Form.Group> */}


        </Form.Row>


        <Button className={`${btnStyles.Button} ${btnStyles.Orange} ${btnStyles.Wide}`} type="submit">
        Create
        </Button>
      </Form>
    </Container>
  );
}
export default TasksCreateForm;

