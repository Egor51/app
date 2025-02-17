import {useLocation} from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/UI/carousel";
import {Button} from "@/components/UI/button.tsx";

export function PreviewPage() {
    const location = useLocation();
    const adData = location.state;
    const title = getTitle(adData.propertyType, adData.countRoom, adData.address);

    function getTitle(propertyType: string, countRoom: number, address: string) {
        switch (propertyType) {
            case 'Доля в квартире':
                return `Доля в ${countRoom} ком.кв, ${address}`;
            case 'Комната':
                return `Комната в ${countRoom} ком.кв, ${address}`;
            case 'Квартира':
                return `${countRoom} ком.кв, ${address}`;
            default:
                return 'Объявление';
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center ">
                Ваше объявление
            </h1>

            {/* Карусель для фотографий */}
            <div className="relative w-full max-w-md mx-auto mb-8">
                <Carousel className="w-full max-w-md">
                    <CarouselContent>
                        {adData.photos.map((file: File, index: number) => (
                            <CarouselItem key={index}>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Фото ${index + 1}`}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"/>
                    <CarouselNext
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"/>
                </Carousel>
            </div>
            <p className="text-xl text-green-500">
                {adData.price} руб.
            </p>
            {/* Информация об объявлении */}
            <div className=" ">
                <p className="text-lg">
                    {title}
                </p>
                <div className={'bg-secondary h-[1px] my-2'}></div>
                <p className="text-lg">
                    {adData.area}/{adData.areaLive}/{adData.areaKitchen} м²
                </p>
                <p className="text-lg">
                    {adData.floor}/{adData.floorAll}
                </p>
                <p className="text-lg">
                    {adData.description}
                </p>
            </div>
            <Button className={'w-full my-3'}>Опубликовать</Button>
        </div>
    );
}
