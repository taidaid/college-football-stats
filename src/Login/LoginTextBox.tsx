import React from "react";
import { Col, Form } from "react-bootstrap";

interface Props {
  id: string;
  width: number;
  value: string;
  handleChange: any;
}

const LoginTextBox = ({ id, width, value, handleChange }: Props) => {
  return (
    <Col lg={width}>
      <Form.Control
        id={id}
        size="lg"
        type="text"
        maxLength={1}
        value={value}
        onChange={handleChange}
      />
    </Col>
  );
};

export default LoginTextBox;
