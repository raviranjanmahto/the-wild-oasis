import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

function SignupForm() {
  const { register, formState, handleSubmit, getValues, reset } = useForm();
  const { signup, isLoading } = useSignup();

  const onSubmit = ({ fullName, email, password }) => {
    signup({ fullName, email, password }, { onSuccess: () => reset() });
  };

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={formState?.errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label='Email address' error={formState?.errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={formState?.errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Repeat password'
        error={formState?.errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: value =>
              value === getValues().password || "Password needs to matched",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button>
          {!isLoading ? (
            "Create new user"
          ) : (
            <SpinnerMini text='Create new user' />
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
