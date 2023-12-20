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
import styles from "../styles/login.module.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HeadName from "../components/headName";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      setIsLogin(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
        username: username,
        password: password,
      });
      console.log(response);
      if (response.data.msg == "Login successfully") {
        sessionStorage.setItem("token", response.data.token);
        return router.push("/");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setIsLogin(false);
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
      className={`min-vh-100 align-items-center d-flex justify-content-center ${styles.loginBg}`}
    >
      <HeadName title="login" />
      <Card className="bg-dark-subtle border-0 shadow-sm">
        <CardBody>
          <h3 className="text-center">LOGIN</h3>
          <Form onSubmit={Auth}>
            {!msg ? null : <Alert color="danger">{msg}</Alert>}

            <FormGroup>
              <Label for="username" hidden>
                username
              </Label>
              <Input
                id="exampleEmail"
                name="username"
                placeholder="Username"
                type="text"
                value={username}
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
            {!isLogin ? (
              <Button color="primary" style={{ width: "100%" }}>
                Login
              </Button>
            ) : (
              <Button color="primary" disabled style={{ width: "100%" }}>
                <Spinner size="sm" className="me-2"></Spinner>{" "}
                <span>login...</span>
              </Button>
            )}
          </Form>
          <br></br>
          <p>
            belum punya akun?{" "}
            <a href="/register" className="link-primary">
              daftar
            </a>{" "}
            disini{" "}
          </p>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;
