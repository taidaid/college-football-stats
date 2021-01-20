import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import LoginTextBox from "./LoginTextBox";

interface Props {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}

interface FormValue {
  [a: string]: string;
}

const pinLength = 6;
const loginTextBoxWidth = Math.floor(12 / pinLength);
const acceptedPassword = "012345";

const Login = ({ setIsSignedIn }: Props) => {
  const [formValue, setFormValue] = useState<FormValue>({
    box0: "",
    box1: "",
    box2: "",
    box3: "",
    box4: "",
    box5: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const submittedPassword: string = Object.values(formValue).join("");
    if (verifyPassword(submittedPassword)) {
      setIsSignedIn(true);
    }
  };

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    const newValue = event.currentTarget.value;
    const objKey = event.currentTarget.id;
    setFormValue((prevState) => {
      return { ...prevState, [objKey]: newValue };
    });
    focusNextInput(objKey);
  };

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
        width={loginTextBoxWidth}
        value={formValue[`box${i}`]}
        handleChange={handleChange}
      />
    ));
  return (
    <Col xs={{ span: 4, offset: 4 }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter PIN</Form.Label>
          <Row>{passwordInputPoxes}</Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Col>
  );
};

export default Login;
