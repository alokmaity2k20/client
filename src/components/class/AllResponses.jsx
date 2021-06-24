import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getResponses } from "../../services/classService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";

const AllResponses = ({ match }) => {
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const responses = await getResponses(match.params.id);
      setResponses(responses);
    };
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Roll</th>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Date Of Submission</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((r) => {
            return (
              <tr key={r._id}>
                <td>{r.studentRoll}</td>
                <td>{r.studentName}</td>
                <td>{r.studentEmail}</td>
                <td>{r.dateOfSub}</td>
                <td>
                  <a
                    className="btn btn-warning"
                    href={`http://localhost:8000/${r.assignFile}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </a>
                </td>
                <td>
                  <a
                    className="btn btn-success"
                    href={"http://localhost:8000/" + r.assignFile}
                    download
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AllResponses;
