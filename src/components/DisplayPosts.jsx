import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const DisplayPosts = ({ currentItems }) => {
  const navigate = useNavigate();

  return (
    <div className="employees">
      <Row xs={1} md={4} className="g-3">
        {currentItems.map((val, key) => (
          <Col key={key}>
            <Card className="h-100">
              {val.postImag && <Card.Img variant="top" src={val.postImag} />}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-2">
                  {val.topicName || "ไม่มีหัวข้อ"}
                </Card.Title>

                <Card.Text className="flex-grow-1">
                  {(val.postDetail || "").substring(0, 100)}...
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">👍 {val.likes || 0}</small>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/post/${val.postID}`)}
                  >
                    อ่านต่อ
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DisplayPosts;