import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: error => toast.error(error.message),
  });

  return (
    <Form
      onSubmit={handleSubmit(data =>
        mutate({ ...data, image: data?.image?.[0] })
      )}
    >
      <FormRow label='Cabin name' error={formState?.errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
          defaultValue=''
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={formState?.errors?.image?.message}>
        <FileInput
          id='image'
          disabled={isPending}
          accept='image/*'
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Clear form
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
