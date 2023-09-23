import { Col, Container, Image, Row } from "react-bootstrap";
import SignUpForm from "./auth/SignUpForm";
import styles from "./../styles/Home.module.css"

const Home = () => {

    return(
        <Container>
        <Row>
        <Col> <h1 className={styles.h1}><b>Bring your tasks together and track your progress</b></h1>
            </Col>
        <Col xs={6}>
        <Image
          className={`${styles.ChecklistImage}`}
            src={"https://res.cloudinary.com/dmg2ncvzm/image/upload/v1695510641/Checklist_pvsihf.png"}
        />        </Col>
        </Row>
        <br></br>

        <Row className={styles.Bottom}>
            <Col>
                <SignUpForm />
            </Col>
        </Row>

        </Container>
     );
};
export default Home;