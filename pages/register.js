import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Card,
  CardBody,
  Alert,
  Spinner,
} from "reactstrap";
import styles from "../styles/register.module.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HeadName from "../components/headName";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setIsRegister(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      });
      if (response.data.msg == "register berhasil") {
        setMsg(response.data.msg);
        return setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setIsRegister(false);
      }
    }
  };

  // to push in "/" if not logout
  const checkToken = async () => {
    const token = sessionStorage.getItem("token");
    try {
      if (token) {
        return router.push("/");
      }
    } catch (error) {
      console.log("masuk ke error");
      router.push("/");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Container
      fluid
      className={`min-vh-100 align-items-center d-flex justify-content-center ${styles.registerBg}`}
    >
      <HeadName title="register" />
      <Card className="w-25 bg-body-secondary border-0 shadow-sm">
        <CardBody>
          <h3 className="text-center">REGISTER</h3>
          <Form onSubmit={handleRegister}>
            {!msg ? null : <Alert color="danger">{msg}</Alert>}
            <FormGroup>
              <Label for="username" hidden>
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={username}
                placeholder="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword" hidden>
                Password
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword" hidden>
                Password
              </Label>
              <Input
                id="examplePassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </FormGroup>
            {!isRegister ? (
              <Button color="success" style={{ width: "100%" }}>
                Register
              </Button>
            ) : (
              <Button color="success" style={{ width: "100%" }}>
                <Spinner size="sm" className="me-2"></Spinner>{" "}
                <span>create user...</span>
              </Button>
            )}
          </Form>
          <br></br>
          <p>
            sudah punya akun?{" "}
            <a href="/login" className="link-primary">
              login
            </a>
          </p>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Register;
