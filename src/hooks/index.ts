import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getFormDynamic, IForm, IMessageError } from "../services";

const LIST_TEXTS: string[] = ["text", "password", "email"];

const useApp = () => {
  const [data, setData] = useState<IForm[]>([]);
  const [schema, setSchema] = useState(yup.object().shape({}));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Record<string, any>>({
    resolver: yupResolver(schema),
    criteriaMode: "all",
    mode: "all"
  });

  const onSubmit = (value: Record<string, any>) => {
    // eslint-disable-next-line no-console
    console.log({
      value
    });
  };

  /**
   * Call service to get data from
   */
  const getForm = async () => await getFormDynamic();

  useEffect(() => {
    getForm().then((form: IForm[]) => {
      setData(form);
      loadDataForm(form);
      setValidatorsForm(form);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Load data form in react-hook-form
   * @param form
   */
  const loadDataForm = (form: IForm[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newDefaultValues: Record<string, any> = {};
    form.forEach(
      (input: IForm) => (newDefaultValues[input.name] = input.value)
    );
    reset(newDefaultValues);
  };

  /**
   * Set validators to all inputs in form dinamically
   * @param form
   */
  const setValidatorsForm = (form: IForm[]) => {
    const validationSchema = createValidationSchema(form);
    setSchema(validationSchema);
    reset({}, { keepValues: true });
  };

  /**
   * Create validations schema to inputs
   * @param form
   * @returns
   */
  const createValidationSchema = (form: IForm[]) => {
    const shape: Record<string, yup.AnySchema> = {};

    form.forEach((field: IForm) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let validator: any = yup;

      if (LIST_TEXTS.includes(field.type)) {
        if (field.type === "email")
          validator = yup.string().email("Email invalid");
        else validator = yup.string();
      }
      if (field.type === "number") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator = yup
          .number()
          .transform((value: any, originalValue: any) =>
            originalValue.trim() === "" ? null : value
          )
          .typeError("Age must be a number");
      }

      field.messagesError &&
        field.messagesError.forEach((error: IMessageError) => {
          if (error.type === "required") {
            validator = validator.required(error.message);
          }
          if (error.type === "min") {
            validator = validator.min(field.min!, error.message);
          }
          if (error.type === "minlength") {
            validator = validator.min(field.minLength!, error.message);
          }
          if (error.type === "max") {
            validator = validator.max(field.max!, error.message);
          }
          if (error.type === "maxlength") {
            validator = validator.max(field.maxLength!, error.message);
          }
          if (error.type === "pattern" && field.type !== "number") {
            validator = validator.matches(
              new RegExp(field.pattern!),
              error.message
            );
          }
        });

      shape[field.name] = validator;
    });
    return yup.object().shape(shape);
  };

  return {
    data,
    isValid,
    register,
    errors,
    handleSubmit,
    onSubmit
  };
};

export default useApp;
