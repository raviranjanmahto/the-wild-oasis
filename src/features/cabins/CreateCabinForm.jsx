import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const isSubmitting = isCreating || isEditing;

  const onSubmit = data => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
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
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label='Cabin name' error={formState?.errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isSubmitting}
          autoComplete='off'
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label='Maximum capacity'
        error={formState?.errors?.maxCapacity?.message}
      >
        <Input
          type='number'
          id='maxCapacity'
          disabled={isSubmitting}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow
        label='Regular price'
        error={formState?.errors?.regularPrice?.message}
      >
        <Input
          type='number'
          id='regularPrice'
          min={1}
          disabled={isSubmitting}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={formState?.errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          min={0}
          disabled={isSubmitting}
          {...register("discount", {
            required: "This field is required",
            validate: value =>
              (+value >= 0 && +value <= +getValues().regularPrice) ||
              "Discount should be 0 or less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={formState?.errors?.description?.message}
      >
        <Textarea
          type='text'
          id='description'
          disabled={isSubmitting}
          defaultValue=''
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={formState?.errors?.image?.message}>
        <FileInput
          id='image'
          disabled={isSubmitting}
          accept='image/*'
          {...register("image", {
            required: isEditSession ? false : "This field is required",
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
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
