interface PropertyTypeSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export function PropertyTypeSelector({ value, onChange }: PropertyTypeSelectorProps) {
    const options = [
        { label: "Комната", value: "Комната" },
        { label: "Квартира", value: "Квартира" },
        { label: "Доля", value: "Доля в квартире" },
    ]

    return (
        <div className="flex space-x-4">
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    className={`w-1/3 px-4 py-2 rounded-md border h-10 text-sm ${
                        value === option.value
                            ? "text-white border-blue-500"
                            : "border-gray-300"
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}
