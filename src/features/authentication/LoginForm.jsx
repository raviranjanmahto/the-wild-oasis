import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoginIn, login } = useLogin();

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label='Email address'>
        <Input
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          disabled={isLoginIn}
        />
      </FormRowVertical>

      <FormRowVertical label='Password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          disabled={isLoginIn}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size='large' disabled={isLoginIn}>
          {!isLoginIn ? "Login" : <SpinnerMini text='Login' />}
        </Button>
      </FormRowVertical>

      <FormRowVertical>
        <Button
          type='button'
          size='large'
          disabled={isLoginIn}
          variation='danger'
          onClick={() =>
            login({
              email: "test@test.com",
              password: "@dcQVFz.qC5hP33",
            })
          }
        >
          Explore the demo app
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
