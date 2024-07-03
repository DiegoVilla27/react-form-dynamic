import { ErrorMessageCustom } from "./components/msg-error";
import useApp from "./hooks";
import { IForm } from "./services";

function App() {
  const { data, isValid, register, errors, handleSubmit, onSubmit } = useApp();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <h1>REGISTER</h1>
      {data.map((item: IForm) => (
        <div key={item.name}>
          <input
            type={item.type}
            placeholder={item.placeholder}
            min={item.min ?? undefined}
            minLength={item.minLength ?? undefined}
            max={item.max ?? undefined}
            maxLength={item.maxLength ?? undefined}
            step={item.step ?? undefined}
            pattern={item.pattern ?? undefined}
            {...register(item.name)}
          />
          {ErrorMessageCustom(errors, item.name)}
        </div>
      ))}
      <button
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
}

export default App;
