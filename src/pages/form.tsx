"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/UI/button.tsx"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/UI/form.tsx"
import {Input} from "@/components/UI/input.tsx"
import {PhotoUploader} from "@/components/UI/PhotoUploader.tsx";
import {Textarea} from "@/components/UI/textarea.tsx";
import {PropertyTypeSelector} from "@/components/UI/PropertyTypeSelector.tsx";
import {useNavigate} from "react-router-dom";

const formSchema = z.object({
    area: z
        .string()
        .transform((val) => parseFloat(val))
        .pipe(z.number().positive("Площадь должна быть положительным числом.")),
    areaLive: z
        .string()
        .transform((val) => parseFloat(val))
        .pipe(z.number().positive("Площадь должна быть положительным числом.")),
    areaKitchen: z
        .string()
        .transform((val) => parseFloat(val))
        .pipe(z.number().positive("Площадь должна быть положительным числом.")),
    price: z
        .string()
        .transform((val) => parseFloat(val))
        .pipe(z.number().positive("Цена должна быть положительным числом.")),

    countRoom: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int("Количество комнат должно быть целым числом.")),

    floor: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().positive("Этаж должен быть положительным числом.")),

    floorAll: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(
            z
                .number()
                .positive("Общая этажность должна быть положительным числом.")
                .max(500, "Общая этажность не может быть больше 500.")
        ),

    description: z
        .string()
        .min(10, {message: "Описание должно содержать минимум 10 символов."})
        .max(500, {message: "Описание не должно превышать 500 символов."}),

    address: z
        .string()
        .min(5, {message: "Адрес должен содержать минимум 5 символов."})
        .max(200, {message: "Адрес не должен превышать 200 символов."}),

    photos: z
        .array(
            z
                .instanceof(File)
                .refine((file) => file.size < 2 * 1024 * 1024, "Размер каждого файла не должен превышать 2MB.")
                .refine(
                    (file) => ["image/jpeg", "image/png"].includes(file.type),
                    "Допустимые форматы изображений: JPG и PNG."
                )
        )
        .nonempty("Вы должны загрузить хотя бы одно фото."),

    propertyType: z.enum(["Комната", "Квартира", "Доля в квартире"], {
        required_error: "Пожалуйста, выберите тип недвижимости.",
    }),
});


export function FormSubmit() {
    const navigate = useNavigate()
    ;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            area: 0, // Числовое значение по умолчанию
            areaLive: 0, // Числовое значение по умолчанию
            areaKitchen: 0, // Числовое значение по умолчанию
            price: 0, // Числовое значение по умолчанию
            countRoom: 0, // Числовое значение по умолчанию
            floor: 0, // Числовое значение по умолчанию
            floorAll: 0, // Числовое значение по умолчанию
            description: "", // Строка по умолчанию
            address: "", // Строка по умолчанию
            photos: [], // Пустой массив для фото
            propertyType: "Комната", // Значение по умолчанию для выбора
        },
    });


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form Data:", values)
        navigate("/preview", {state: values});

    }

    return (
        <div className={'max-w-[400px] p-4 mx-auto'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <FormField
                        control={form.control}
                        name="propertyType"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Выберите тип недвижимости</FormLabel>
                                <FormControl>
                                    <PropertyTypeSelector value={field.value} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="photos"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Загрузите фото
                                </FormLabel>
                                <FormControl>
                                    <PhotoUploader value={field.value || []} onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="countRoom"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Комнат в квартире: </FormLabel>
                                <FormControl>
                                    <Input placeholder="Комнат" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Адрес: </FormLabel>
                                <FormControl>
                                    <Input placeholder="адрес" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <p>Площадь:</p>
                    <div className={'flex gap-3'}>
                        <FormField
                            control={form.control}
                            name="area"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Общая: </FormLabel>
                                    <FormControl>
                                        <Input placeholder="площадь м/2" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="areaLive"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Жилая: </FormLabel>
                                    <FormControl>
                                        <Input placeholder="площадь м/2" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="areaKitchen"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Кухня: </FormLabel>
                                    <FormControl>
                                        <Input placeholder="площадь м/2" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={'bg-gray-400 h-[1px]'}></div>

                    <div className={'flex gap-3'}>
                        <FormField
                            control={form.control}
                            name="floor"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Этаж </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Этаж" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="floorAll"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Всего этажей: </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Этажность дома" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>


                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Описание: </FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Описание" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Цена: </FormLabel>
                                <FormControl>
                                    <Input placeholder="Цена" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={form.formState.isSubmitting} className={'w-full'}>
                        {form.formState.isSubmitting ? "Submitting..." : "Далее"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
