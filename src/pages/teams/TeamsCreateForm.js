import React from "react"
import { Button, Col, Container, Form, Image, } from "react-bootstrap"
import styles from "../../styles/TeamsCreateForm.module.css";
import btnStyles from "../../styles/Button.module.css";


function TeamCreateForm() {
  return (
    <Container className={styles.Container}>
      <Form >

        <Form.Row>
          <Col lg={2}>
            <Form.Group>
                <Image src="https://res.cloudinary.com/dmg2ncvzm/image/upload/v1675520384/default_team_mi0sbj.png" rounded height="100"/>
              <Form.Label  className="d-none">Update Photo:</Form.Label>
              <Form.File id="image" className={styles.Image} />
            </Form.Group>
          </Col>

          <Col>
              <Form.Group controlId="name">
                <Form.Label className="d-none">Team Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Team Name" />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label className="d-none">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description of team"
                  />
              </Form.Group>
          </Col>
        </Form.Row>

        <Form.Group controlId="members">
          <Form.Label >Members</Form.Label>
          <Form.Control as="select" multiple>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>

        <Button
        variant="primary"
        type="submit"
        className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Orange}`}
        >
          Create Team
        </Button>
      </Form>
    </Container>
  );
}
export default TeamCreateForm;

