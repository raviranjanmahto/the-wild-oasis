import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useEditGuest } from "../guests/useEditGuest";
import { useCreateGuest } from "../guests/useCreateGuest";
import { useCabins } from "../cabins/useCabins";
import Select from "../../ui/Select";
import { toast } from "react-toastify";

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { createGuest, isCreating } = useCreateGuest();
  const { editGuest, isEditing } = useEditGuest();
  const { cabins } = useCabins();

  const isSubmitting = isCreating || isEditing;

  const onSubmit = async data => {
    return toast.info("Not implemented yet!");
    // if (isEditSession)
    //   editGuest(
    //     { newGuestData: { ...data }, id: editId },
    //     {
    //       onSuccess: () => {
    //         reset();
    //         onCloseModal?.();
    //       },
    //     }
    //   );
    // else
    //   createGuest(
    //     { ...data },
    //     {
    //       onSuccess: () => {
    //         reset();
    //         onCloseModal?.();
    //       },
    //     }
    //   );
  };

  return (
    <Form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label='Choose cabin' error={formState?.errors?.cabin?.message}>
        <Select type='select' id='select' options={cabins} />
      </FormRow>

      <FormRow
        label='Choose starting date'
        error={formState?.errors?.startDate?.message}
      >
        <Input
          type='datetime-local'
          id='startDate'
          disabled={isSubmitting}
          {...register("startDate", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label='Choose starting date'
        error={formState?.errors?.endDate?.message}
      >
        <Input
          type='datetime-local'
          id='endDate'
          disabled={isSubmitting}
          {...register("endDate", { required: "This field is required" })}
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
          {isEditSession ? "Edit booking" : "Create new booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
