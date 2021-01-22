import React from "react";
import { Form, Col, Button } from "react-bootstrap";

interface Props {
  searchValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm = ({ searchValue, handleChange, handleSubmit }: Props) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Row className="align-items-center">
          <Col xs="8">
            <Form.Label srOnly>Search</Form.Label>
            <Form.Control
              id={"search"}
              size="lg"
              type="text"
              placeholder="Search All Teams"
              value={searchValue}
              onChange={handleChange}
            />
          </Col>
          <Col xs="4">
            {" "}
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Form.Row>
      </Form.Group>
    </Form>
  );
};

export default SearchForm;