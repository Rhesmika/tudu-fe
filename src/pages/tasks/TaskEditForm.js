import React, { useState, useRef, useEffect } from "react";

import Form from "react-bootstrap/Form";

import styles from "../../styles/TaskCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function TaskEditForm(props) {
  const [errors, setErrors] = useState({});
  const { id, board, setShowEditForm,  setTasks} = props;

  const fileInput = useRef(null);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    duedate: "",
    priority: "",
    status: "",
    attachment: "",
  });
  const { title, description, duedate, priority, status, attachment} = taskData;
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
        try {
          const { data } = await axiosReq.get(`/tasks/${id}/`);
          const { title, description, duedate, priority, status, attachment, is_owner } = data;

            is_owner ? setTaskData({ title, description, duedate, priority, status, attachment }) : history.push("/");
        } catch (err) {
            console.log(err);
        }
    };

    handleMount();
    }, [history, id]
  );

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
    formData.append("board", board.results[0].id);
    if (attachment?.current?.files[0]) {
      formData.append("attachment", fileInput?.current?.files[0]);
    }
    const boardId = board.results[0].id;

    try {
      await axiosReq.put(`/tasks/${id}/`, formData);
      history.push(`/boards/${boardId}/`);

      const { data } = await axiosRes.put("/tasks/", formData);
      setTasks((prevTasks) => ({
        ...prevTasks,
        results: [data, ...prevTasks.results],
      }));
      
      setTaskData("");

      setShowEditForm(false);

    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }  
    }
  };



  return (
    <Form onSubmit={handleSubmit} className={styles.Form}>
          <h3>Edit Task</h3>

      <Row>
      <Col>
      <Form.Group >
        <Form.Control
          type="title"
          placeholder="Task"
          name="title"
          value={title}
          onChange={handleChange}
          className={styles.FormField}
        />
        {errors?.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="description"
          placeholder="description"
          name="description"
          value={description}
          onChange={handleChange}
          className={styles.FormField}
        />
        {errors?.description?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
         ))}
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="date"
          name="duedate"
          value={duedate}
          onChange={handleChange}
          className={styles.FormField}
        />
        {errors?.date?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>
      </Col>

      <Col>
      <Form.Group>
        <Form.File
          id="attachment-upload"
          accept="attachment/*"
          onChange={handleChangeAttachment}
          ref={fileInput}
          className={styles.FormField}
        />
        {errors?.attachment?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>

      <Form.Group>
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
        {errors?.priority?.map((idx) => (
          <Alert variant="warning" key={idx}>
            Please select task priority
          </Alert>
        ))}
      </Form.Group>

      <Form.Group>
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
        {errors?.status?.map((idx) => (
          <Alert variant="warning" key={idx}>
            Please select task status
          </Alert>
        ))}
      </Form.Group>
      </Col>
      </Row>
      
      <Row>
        <Col>
      <Button 
        className={`${btnStyles.Button} ${btnStyles.Orange} ${btnStyles.Wide}`}
        type="submit">
        Update 
      </Button>
      </Col>
      <Col>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Orange} ${btnStyles.Wide}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
        Cancel
        </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default TaskEditForm;