type Option = {
  label: string;
  value: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
};

export default function Select({ label, options, ...props }: SelectProps) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>

      <select
        {...props}
        className="w-full mt-1 px-2 py-1.5 rounded bg-gray-800 outline-none text-sm text-white"
      >
        <option value=""></option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
