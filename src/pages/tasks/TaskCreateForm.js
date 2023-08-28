import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";

import appStyles from "../../App.module.css";
import styles from "../../styles/TaskCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosRes } from "../../api/axiosDefaults";
import { Alert, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function TaskCreateForm(props) {
  const [errors, setErrors] = useState({});
  const { board, setBoard, setTasks} = props;

  const fileInput = useRef(null);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    duedate: "",
    priority: "",
    status: "",
    attachment: "",
  });
  const { title, description, duedate, priority, status, attachment,} = taskData;
  const history = useHistory();

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeAttachment= (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(attachment);
      setTaskData({
        ...taskData,
        attachment: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("duedate", duedate);
    formData.append("priority", priority);
    formData.append("status", status);
    formData.append("board", board);
    formData.append("attachment", fileInput.current.files[0]);


    try {
      const { data } = await axiosRes.post("/tasks/", formData);
      history.push(`/tasks/${data.id}`);
      setTasks((prevTasks) => ({
        ...prevTasks,
        results: [data, ...prevTasks.results],
      }));
      setBoard((prevBoard) => ({
        results: [
          {
            ...prevBoard.results[0],
            tasks_count: prevBoard.results[0].tasks_count + 1,
          },
        ],
      }));
      setTaskData("");
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }  
    }
  };

  return (
    <Container >
    <Form onSubmit={handleSubmit} className={styles.Form}>
        <Form.Row>
            <Form.Group>
                <Form.Control
                    type="title"
                    placeholder="Task"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    className={styles.FormField}
                />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                    {message}
                    </Alert>
                ))}

            <Form.Group>
                <Form.Control
                    type="description"
                    placeholder="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    className={styles.FormField}

                />
            </Form.Group>
            {errors?.description?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                    {message}
                    </Alert>
                ))}

            <Form.Group>
                <Form.Control
                    type="date"
                    name="duedate"
                    value={duedate}
                    onChange={handleChange}
                    className={styles.FormField}

                />
            </Form.Group>
            {errors?.date?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                    {message}
                    </Alert>
                ))}
        </Form.Row>

        <Form.Row>
            <Form.Group controlId="priority">
                <Form.Control
                    as="select"
                    name="priority"
                    value={priority}
                    onChange={handleChange}
                    defaultValue={"placeholder"}
                    className={styles.FormField}

                    >
                <option value={"placeholder"}>Select Priority</option>
                <option value="0">Low</option>
                <option value="1">Medium</option>
                <option value="2">High</option>
                </Form.Control>
            </Form.Group>
            {errors?.priority?.map((idx) => (
                    <Alert variant="warning" key={idx}>
                    Please select task priority
                    </Alert>
                ))}
 
            <Form.Group controlId="status">
                <Form.Control
                    as="select"
                    name="status"
                    value={status}
                    onChange={handleChange}
                    defaultValue={"placeholder"}
                    className={styles.FormField}

                >
                <option value={"placeholder"}>Select Status</option>
                <option value="0">Todo</option>
                <option value="1">In progress</option>
                <option value="2">Completed</option>
                </Form.Control>
            </Form.Group>
            {errors?.status?.map((idx) => (
                    <Alert variant="warning" key={idx}>
                    Please select task status
                    </Alert>
                ))}
        </Form.Row>

        <Form.Row>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.File
        id="attachment-upload"
        accept="attachment/*"
        onChange={handleChangeAttachment}
        ref={fileInput}
        className={styles.FormField}

        />
        </Form.Group>
        {errors?.attachment?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                    {message}
                    </Alert>
                ))}
        </Form.Row>

    <Button className={`${btnStyles.Button} ${btnStyles.Orange} ${btnStyles.Wide}`} type="submit">
        create task
      </Button>
    </Form>
  </Container>
  );
}

export default TaskCreateForm;