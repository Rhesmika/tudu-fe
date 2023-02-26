import React, { useRef, useState } from "react"
import { Button, Col, Container, Form, Image  } from "react-bootstrap"
import styles from "../../styles/TeamsCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";


function TeamCreateForm() {
  const [setErrors] = useState({});

  const [teamData, setTeamData] = useState({
    name: "",
    description: "",
    image: "",
    // members: "",
  });
  const { name, description, image,} = teamData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setTeamData({
      ...teamData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    const formData = new FormData();

    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', imageInput.current.files[0])

    try {
      const {data} = await axiosReq.post('/teams/', formData);
      history.push(`/teams/${data.id}`);
    } catch(err){
      console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data)
      }  
    }
  }

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setTeamData({
        ...teamData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  return (
    <Container className={styles.Container}>
      <Form onSubmit={handleSubmit}>

        <Form.Row>
          <Col lg={2}>
            <Form.Group>
                <Image src="https://res.cloudinary.com/dmg2ncvzm/image/upload/v1675520384/default_team_mi0sbj.png" rounded height="100"/>
              <Form.Label  className="d-none">Update Photo:</Form.Label>
              <Form.File
              className={styles.Image}
              id="image-upload"
              accept="image/*"
              onChange={handleChangeImage}
              ref={imageInput}/>
            </Form.Group>
          </Col>

          <Col>
              <Form.Group controlId="name">
                <Form.Label className="d-none">Team Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Team Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label className="d-none">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description of team"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  />
              </Form.Group>
          </Col>
        </Form.Row>

        {/* <Form.Group controlId="members">
          <Form.Label >Members</Form.Label>
          <Form.Control 
          as="select"
          multiple
          name="members"
          value={members}
          onChange={handleChange}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group> */}

        <Button className={`${btnStyles.Button} ${btnStyles.Orange} ${btnStyles.Wide}`} type="submit">
        Create
        </Button>
      </Form>
    </Container>
  );
}
export default TeamCreateForm;

