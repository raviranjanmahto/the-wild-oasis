import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

import { useCreateGuest } from "./useCreateGuest";
import { useEditGuest } from "./useEditGuest";

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { createGuest, isCreating } = useCreateGuest();
  const { editGuest, isEditing } = useEditGuest();

  const isSubmitting = isCreating || isEditing;

  const onSubmit = async data => {
    // Fetch country flag if nationality is provided
    let countryFlagValue = null;
    if (data.nationality) {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${data.nationality}?fullText=true`
        );
        const countryData = await response.json();
        countryFlagValue = countryData[0]?.flags?.svg;
      } catch (error) {
        console.error("Error fetching country flag:");
      }
    }

    // Include countryFlag in the data being saved
    const newData = {
      ...data,
      countryFlag: countryFlagValue,
    };
    if (isEditSession)
      editGuest(
        { newGuestData: { ...newData }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createGuest(
        { ...newData },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  };

  return (
    <Form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow
        label='Guest full name'
        error={formState?.errors?.fullName?.message}
      >
        <Input
          type='text'
          id='fullName'
          disabled={isSubmitting}
          autoComplete='off'
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label='Email address' error={formState?.errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isSubmitting}
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
        label='National ID'
        error={formState?.errors?.nationalID?.message}
      >
        <Input
          type='text'
          id='nationalID'
          disabled={isSubmitting}
          {...register("nationalID", {
            required: "This field is required",
            minLength: { value: 4, message: "Please provide a valid ID" },
          })}
        />
      </FormRow>

      <FormRow
        label='Country name'
        error={formState?.errors?.nationality?.message}
      >
        <Input
          type='text'
          id='nationality'
          disabled={isSubmitting}
          {...register("nationality", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isSubmitting}>
          {isEditSession ? "Edit guest" : "Create new guest"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
