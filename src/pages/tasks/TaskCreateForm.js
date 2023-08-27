import React, { useState } from "react";

import Form from "react-bootstrap/Form";

// import styles from "../../styles/TaskCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { Alert, Button } from "react-bootstrap";

function TaskCreateForm(props) {
  const [errors, setErrors] = useState({});
  const { board, setBoard, setTasks} = props;

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    duedate: "",
    priority: "",
    status: "",
    attachment: "",
  });
  const { title, description, duedate, priority, status, attachment,} = taskData;

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
        file: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/tasks/", {
        title,
        description,
        duedate,
        priority,
        status,
        attachment,
        board,
      });
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
    <Form onSubmit={handleSubmit}>
        <Form.Row>
            <Form.Group>
                <Form.Control
                    type="title"
                    placeholder="Task"
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

            <Form.Group>
                <Form.Control
                    type="description"
                    placeholder="description"
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

            <Form.Group>
                <Form.Control
                    type="date"
                    name="duedate"
                    value={duedate}
                    onChange={handleChange}
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
        <Form.Control
        type="file"
        name="attachment"
        value={attachment}
        onChange={handleChangeAttachment}
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
  );
}

export default TaskCreateForm;