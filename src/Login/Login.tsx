import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import LoginTextBox from "./LoginTextBox";

interface Props {
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}

interface FormValue {
  [a: string]: string;
}

const passwordLength = 6;
const loginTextBoxWidth = Math.floor(12 / passwordLength);
const acceptedPassword = "012345";

const Login = ({ setIsSignedIn }: Props) => {
  const [notNumberErrorState, setNotNumberErrorState] = useState<boolean>(
    false
  );
  const [wrongPasswordState, setWrongPasswordState] = useState<boolean>(false);
  const initialFormState = {
    box0: "",
    box1: "",
    box2: "",
    box3: "",
    box4: "",
    box5: "",
  };
  const [formValue, setFormValue] = useState<FormValue>(initialFormState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedPassword: string = Object.values(formValue).join("");
    if (verifyPassword(submittedPassword)) {
      setIsSignedIn(true);
    } else {
      handleWrongPassword();
    }
  };

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    const newValue = event.currentTarget.value;
    const objKey = event.currentTarget.id;

    if (isNumber(newValue)) {
      setFormValue((prevState) => {
        return { ...prevState, [objKey]: newValue };
      });
      focusNextInput(objKey);
      setWrongPasswordState(false);
      setNotNumberErrorState(false);
    } else {
      setNotNumberErrorState(true);
    }
  };

  const handleWrongPassword = () => {
    setTimeout(() => {
      setFormValue(initialFormState);
      focusFirstInput();
      setWrongPasswordState(false);
    }, 800);

    setWrongPasswordState(true);
  };

  // This function would need to be refactored if the number of input boxes were to exceed 10
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

  const isNumber = (input: string) => {
    return !isNaN(parseInt(input));
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
  useEffect(() => {
    focusFirstInput();
  }, []);
  return (
    <Col xs={{ span: 4, offset: 4 }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter Code</Form.Label>
          <Row>{passwordInputPoxes}</Row>
        </Form.Group>
        {wrongPasswordError}
        {notNumberError}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Col>
  );
};

export default Login;
