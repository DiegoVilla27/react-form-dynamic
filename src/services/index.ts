export interface IMessageError {
  type: string;
  message: string;
}

export interface IForm {
  name: string;
  value: string;
  placeholder: string;
  type: string;
  required: boolean;
  messagesError: IMessageError[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface IFormResponse {
  data: IForm;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFormDynamic = async (): Promise<any> => {
  try {
    const response = await fetch(`/form.json`, {
      method: "GET"
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: IFormResponse = await response.json();
    return data.data;
  } catch (error) {
    alert(`Error call form: ${error}`);
  }
};
