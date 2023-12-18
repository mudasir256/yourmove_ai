import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useField, Field as FormikField } from "formik";
import { toHeaderCase } from "js-convert-case";

interface Props {
  name: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
}
export const Field = ({ name, type, placeholder, disabled }: Props) => {
  const [field, meta, helpers] = useField(name);
  return (
    <div className="relative">
      <FormikField
        name={name}
        type={type}
        disabled={disabled}
        placeholder={placeholder ? placeholder : toHeaderCase(name)}
        className={`border w-full rounded-lg py-2 px-4 mb-4 ${
          meta.error ? "border-red-500" : "border-black"
        } ${disabled ? "bg-gray-100 text-gray-500" : "bg-white"}`}
      />

      {disabled && (
        <LockClosedIcon className="text-gray-400 h-6 w-6 absolute right-0 top-0 bottom-0 mr-2 mt-2 stroke-2" />
      )}

      {meta.error && (
        <div className="-mt-3 mb-3 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
};
