import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { focusNextInput, focusFirstInput } from "../utils/LoginUtils";
import { isNumberString } from "../utils/utils";
import LoginTextBox from "./LoginTextBox";

interface Props {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}

interface FormValue {
  [a: string]: string;
}

const Login = ({ setIsSignedIn }: Props) => {
  const [notNumberErrorState, setNotNumberErrorState] = useState<boolean>(
    false
  );
  const [wrongPasswordState, setWrongPasswordState] = useState<boolean>(false);

  const acceptedPasscode = "012345";

  // allows for smaller or larger passwords
  const initialFormState = Object.assign(
    {},
    ...acceptedPasscode.split("").map((_, i) => ({ [`box${i}`]: "" }))
  );

  const [formValue, setFormValue] = useState<FormValue>(initialFormState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedPasscode: string = Object.values(formValue).join("");
    if (submittedPasscode === acceptedPasscode) {
      setIsSignedIn(true);
    } else {
      handleWrongPassword();
    }
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const newValue = event.currentTarget.value;
    const objKey = event.currentTarget.id;

    // only allow number or empty string
    if (isNumberString(newValue) || newValue === "") {
      setFormValue((prevState) => {
        return { ...prevState, [objKey]: newValue };
      });
      if (newValue !== "") focusNextInput(objKey);
      setWrongPasswordState(false);
      setNotNumberErrorState(false);
    } else {
      setNotNumberErrorState(true);
    }
  };

  const handleWrongPassword = () => {
    // if password is wrong, show error, then clear form and error after delay and focus first input
    setWrongPasswordState(true);
    setTimeout(() => {
      setFormValue(initialFormState);
      focusFirstInput();
      setWrongPasswordState(false);
    }, 800);
  };

  const handleShowPassword = () => {
    window.alert("The passcode is 012345");
  };

  const passwordInputPoxes = acceptedPasscode
    .split("")
    .map((_, i) => (
      <LoginTextBox
        key={i}
        id={`box${i}`}
        value={formValue[`box${i}`]}
        handleChange={handleChange}
      />
    ));

  const wrongPasswordError = wrongPasswordState ? (
    <Row>
      <Col className="text-center text-danger">
        Incorrect code. Please try again.
      </Col>
    </Row>
  ) : (
    ""
  );

  const notNumberError = notNumberErrorState ? (
    <Row>
      <Col className="text-center text-danger">Input must be a number.</Col>
    </Row>
  ) : (
    ""
  );

  // focus first input box on component mount
  useEffect(() => {
    focusFirstInput();
  }, []);

  return (
    <Row className="mt-5">
      <Col
        xs={{ span: 12 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 4, offset: 4 }}
      >
        <Card className="shadow-lg">
          <Card.Header>
            <Card.Title className="text-center">Enter Passcode</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row className="mt-3">
              <Col>
                <Form onSubmit={handleSubmit} className="mt-3">
                  <Form.Group>
                    <Form.Label srOnly>Passcode</Form.Label>
                    <Row className="my-4">{passwordInputPoxes}</Row>
                  </Form.Group>
                  {wrongPasswordError}
                  {notNumberError}
                  <Row>
                    <Col>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <p onClick={handleShowPassword} className="btn">
                        <u>Forgot Passcode?</u>
                      </p>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
