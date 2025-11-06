interface PostFormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  name: string;
  rows?: number;
  errors?: string[];
}

const INPUT_CLASS =
  'w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300';

export default function RenderPostFormInput({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = '',
  className = '',
  name,
  rows = 4,
  errors,
}: PostFormInputProps) {
  const isTextarea = type === 'textarea';
  return (
    <div className={className}>
      <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide dark:text-gray-300">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          className={INPUT_CLASS}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          name={name}
          rows={rows || 4}
        />
      ) : (
        <input
          type={type}
          className={INPUT_CLASS}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          name={name}
        />
      )}
      {errors && errors.length > 0 && (
        <div className="mt-1 text-sm text-red-600 dark:text-red-400">
          {errors.map((error: string, index: number) => {
            const elementId = `${name}-error-${String(index)}`;
            return <p key={elementId}>{error}</p>;
          })}
        </div>
      )}
    </div>
  );
}
