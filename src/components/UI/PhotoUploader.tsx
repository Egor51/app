import {useState} from "react";

interface PhotoUploaderProps {
    value: File[]; // Текущее значение
    onChange: (files: File[]) => void; // Обработчик обновления
}

export function PhotoUploader({ value, onChange }: PhotoUploaderProps) {
    const [previews, setPreviews] = useState<string[]>(() =>
        value.map((file) => URL.createObjectURL(file))
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...newPreviews]);
        onChange([...value, ...files]); // Обновляем значения
    };

    const handleRemove = (index: number) => {
        const newFiles = value.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setPreviews(newPreviews);
        onChange(newFiles); // Обновляем значения
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
                <label
                    htmlFor="file-upload"
                    className="w-32 h-32 flex flex-col items-center justify-center border rounded-md cursor-pointer bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    <span className="text-sm mt-1">Добавить фото</span>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
                {previews.map((src, index) => (
                    <div key={index} className="relative w-32 h-32 border rounded-md">
                        <img
                            src={src}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover rounded-md"
                        />
                        <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                            onClick={() => handleRemove(index)}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
