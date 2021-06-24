import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getAssignments, getStudentRes } from "../../services/classService";
import Input from "../common/Input";
import Loader from "../common/Loader";

const StudentAssign = ({ match, history, user }) => {
  const [assign, setAssign] = useState({
    assignClass: "",
    assignName: "",
    assignFile: "",
  });
  const [loader, setLoader] = useState(true);
  const [formData, setFormData] = useState("");
  const [studentAssign, setStudentAssign] = useState({
    studentRoll: "",
    studentName: "",
    studentEmail: "",
    assignId: "",
  });

  useEffect(() => {
    const getData = async () => {
      const assignment = await getAssignments(match.params.id);

      setAssign(assignment[0]);
      if (assignment[0] !== undefined) {
        studentAssign.assignId = assignment[0]._id;
      }
      setLoader(false);
    };
    getData();
    // eslint-disable-next-line
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentAssign({ ...studentAssign, [name]: value });
  };

  const Upload = ({ target: { files } }) => {
    let data = new FormData();
    data.append("assignFile", files[0]);
    data.append("assignId", studentAssign.assignId);
    data.append("studentRoll", studentAssign.studentRoll);
    data.append("studentName", studentAssign.studentName);
    data.append("studentEmail", studentAssign.studentEmail);
    setFormData(data);
  };
  const handleSubmit = async () => {
    await getStudentRes(formData);
    history.push("/dash");
  };

  return (
    <>
      {assign === undefined ? (
        <>
          <h2 className="text-center fw-bold">No Assignment pending</h2>
          <div className="d-flex justify-content-center">
            <Button
              className="btn btn-warning"
              onClick={() => {
                history.goBack();
              }}
            >
              Go Back
            </Button>
          </div>
        </>
      ) : (
        <>
          {loader ? (
            <Loader />
          ) : (
            <Container>
              <Row className="justify-content-md-center mt-2">
                <Col xs={12} md={6}>
                  <h2>Assignment: {assign.assignName}</h2>
                </Col>
                <Col>
                  <a
                    className="btn btn-success"
                    href={"http://localhost:8000/" + assign.assignFile}
                    download={assign.assignName}
                  >
                    Download
                  </a>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form onSubmit={(e) => e.preventDefault()}>
                    <h2>Send Your Response</h2>
                    <Input
                      label="Student Roll"
                      type="text"
                      placeholder="Enter Roll"
                      name="studentRoll"
                      value={studentAssign.studentRoll}
                      handleChange={handleChange}
                    />
                    <Input
                      label="Student Name"
                      type="text"
                      placeholder="Enter Name"
                      name="studentName"
                      value={studentAssign.studentName}
                      handleChange={handleChange}
                    />
                    <Input
                      label="Student Email"
                      type="email"
                      placeholder="Enter Email"
                      name="studentEmail"
                      value={studentAssign.studentEmail}
                      handleChange={handleChange}
                    />
                    <Form.Group className="mb-3">
                      <Form.Label>Choose an assignment</Form.Label>
                      <Form.Control type="file" onChange={Upload} />
                    </Form.Group>
                    <Button
                      onClick={handleSubmit}
                      variant="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default StudentAssign;
