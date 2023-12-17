import { useField, Field as FormikField } from "formik";
import { toHeaderCase } from "js-convert-case";

interface Props {
  name: string;
  type: string;
  placeholder?: string;
}
export const Field = ({ name, type, placeholder }: Props) => {
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <FormikField
        name={name}
        type={type}
        placeholder={placeholder ? placeholder : toHeaderCase(name)}
        className={`border w-full rounded-lg py-2 px-4 mb-4 ${
          meta.error ? "border-red-500" : "border-black"
        } `}
      />

      {meta.error && (
        <div className="-mt-3 mb-3 text-xs text-red-500">{meta.error}</div>
      )}
    </>
  );
};
