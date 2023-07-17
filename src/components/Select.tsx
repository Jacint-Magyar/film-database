"use client";

type SelectProps = {
  options: [string, string][];
} & React.ComponentProps<"select">;

export function Select(props: SelectProps) {
  const { options, children, ...rest } = props;

  return (
    <select
      className="rounded px-4 py-2 bg-slate-600 border border-slate-600 hover:border-slate-400 focus-within:bg-slate-500 outline-none"
      {...rest}
    >
      {children}
      {options.map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  );
}
