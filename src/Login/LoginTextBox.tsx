import React from "react";
import { Col, Form } from "react-bootstrap";

interface Props {
  id: string;
  value: string;
  handleChange: any;
}

const LoginTextBox = ({ id, value, handleChange }: Props) => {
  return (
    <Col>
      <Form.Control
        id={id}
        size="lg"
        type="text"
        maxLength={1}
        value={value}
        onChange={handleChange}
        className="text-center"
      />
    </Col>
  );
};

export default LoginTextBox;
