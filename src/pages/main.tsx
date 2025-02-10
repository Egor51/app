import {FormSubmit} from "@/pages/form.tsx";
import {Button} from "@/components/UI/button.tsx";
import {useState} from "react";
import {publicUrl} from "@/helpers/publicUrl.ts";
import {Link} from "react-router-dom";

export function Main() {
    const [showForm, setShowForm] = useState(false);

    function show() {
        if (showForm) {
            setShowForm(false);
        } else {
            setShowForm(true);
        }
    }

    return (
        <div className="flex flex-col justify-between md:flex-row px-3">
            <div className="flex flex-col gap-3 p-4">
                {/* Заголовок */}
                <div className={'flex w-[80%] gap-3'}>
                    <img src={publicUrl('murmanclick.svg')} className={'h-14 border rounded-md p-3'}/>
                    <h1 className="text-sm text-secondary/30">
                        Продай недвижимость быстро и выгодно!
                    </h1>
                </div>

                {/* Подзаголовок */}
                <p className="text-lg">
                Привлеки тысячи заинтересованных покупателей или
                    арендаторов!
                </p>
                {/* Преимущества */}
                <ul className="text-left space-y-3 mx-auto max-w-lg text-secondary/50">
                    <li className="flex items-center">
                        <span className=" text-green-500 mr-2">✔</span>
                        <span>Размести объявление абсолютно бесплатно.</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-500 mr-2">✔</span>
                        <span>Твое объявление увидят тысячи пользователей прямо сейчас.</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-500 mr-2">✔</span>
                        <span>Простая и понятная форма для публикации. Заполни её за 2 минуты!</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-500 mr-2">✔</span>
                        <span>Продавай или сдавай быстрее благодаря нашей платформе.</span>
                    </li>
                </ul>

                {/* Призыв к действию */}
                <p className="text-lg font-semibold text-blue-300">
                    Нажми на кнопку ниже и опубликуй своё объявление!
                </p>
                <Link
                    className="block border text-center p-2 rounded-md md:hidden mx-auto w-full my-3"
                    to="/form"
                >
                    Опубликовать
                </Link>
            </div>

                <div className=" hidden md:block">
                    <FormSubmit/>
                </div>
        </div>
    );
}
