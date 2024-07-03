import { ErrorMessage } from "@hookform/error-message";
import { ReactElement } from "react";
import { FieldErrors, ValidateResult } from "react-hook-form";
import ItemMsgError from "./item";

const HTMLError: (type: string, message: ValidateResult) => ReactElement = (
  type: string,
  message: ValidateResult
) => {
  return (
    <ItemMsgError
      key={type}
      message={message}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ErrorMessageCustom = (errors: FieldErrors<any>, name: any) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) => {
        return messages
          ? Object.entries(messages).map(
              ([type, message]: [string, ValidateResult]) =>
                HTMLError(type, message)
            )
          : null;
      }}
    />
  );
};
