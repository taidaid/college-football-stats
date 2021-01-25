import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { isNumberString } from "../utils";
import LoginTextBox from "./LoginTextBox";

interface Props {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}

interface FormValue {
  [a: string]: string;
}

const acceptedPassword = "012345";

const Login = ({ setIsSignedIn }: Props) => {
  const [notNumberErrorState, setNotNumberErrorState] = useState<boolean>(
    false
  );
  const [wrongPasswordState, setWrongPasswordState] = useState<boolean>(false);

  // allows for smaller or larger passwords
  const initialFormState = Object.assign(
    {},
    ...acceptedPassword.split("").map((_, i) => ({ [`box${i}`]: "" }))
  );

  const [formValue, setFormValue] = useState<FormValue>(initialFormState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedPassword: string = Object.values(formValue).join("");
    if (verifyPassword(submittedPassword)) {
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

  // would need to be refactored to handle more than 10 inputs
  const focusNextInput = (currentInputId: string) => {
    const boxNumber = parseInt(currentInputId[currentInputId.length - 1]);
    const nextInput: HTMLElement | null = document.querySelector(
      `#box${boxNumber + 1}`
    );

    if (nextInput !== null) {
      nextInput.focus();
    }
  };

  const verifyPassword = (password: string): boolean => {
    if (password === acceptedPassword) {
      return true;
    } else {
      return false;
    }
  };

  const passwordInputPoxes = acceptedPassword
    .split("")
    .map((_, i) => (
      <LoginTextBox
        key={i}
        id={`box${i}`}
        value={formValue[`box${i}`]}
        handleChange={handleChange}
      />
    ));

  const focusFirstInput = () => {
    const firstInput: HTMLElement | null = document.querySelector("#box0");
    if (firstInput) {
      firstInput.focus();
    }
  };

  const wrongPasswordError = wrongPasswordState ? (
    <Row>
      <Col xs={{ offset: "2", span: "8" }} className="text-center text-danger">
        Incorrect code. Please try again.
      </Col>
    </Row>
  ) : (
    ""
  );

  const notNumberError = notNumberErrorState ? (
    <Row>
      <Col xs={{ offset: "2", span: "8" }} className="text-center text-danger">
        Input must be a number.
      </Col>
    </Row>
  ) : (
    ""
  );

  // focus first input box on component mount
  useEffect(() => {
    focusFirstInput();
  }, []);

  return (
    <Row className="mt-3">
      <Col
        xs={{ span: 12 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 4, offset: 4 }}
      >
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group>
            <Form.Label>Enter Code</Form.Label>
            <Row className="my-4">{passwordInputPoxes}</Row>
          </Form.Group>
          {wrongPasswordError}
          {notNumberError}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
