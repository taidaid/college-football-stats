import React from "react";
import { Form, Col, Button } from "react-bootstrap";

interface Props {
  searchValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  showSearchError: boolean;
}

const SearchForm = ({
  searchValue,
  handleChange,
  handleSubmit,
  showSearchError,
}: Props) => {
  const searchError = showSearchError ? (
    <Form.Row>
      <Col>
        <span className="text-danger">Please enter a valid search term</span>
      </Col>
    </Form.Row>
  ) : (
    ""
  );

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group>
        <Form.Row className="align-items-center">
          <Col xs="8">
            <Form.Label srOnly>Search</Form.Label>
            <Form.Control
              id={"search"}
              size="lg"
              type="text"
              placeholder="Search Schools"
              value={searchValue}
              onChange={handleChange}
            />
          </Col>
          <Col xs="4">
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Form.Row>
        {searchError}
      </Form.Group>
    </Form>
  );
};

export default SearchForm;
