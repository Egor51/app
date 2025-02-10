import {  miniApp, useSignal} from '@telegram-apps/sdk-react';
import {useEffect, useState} from "react";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {routes} from "@/navigation/routes.tsx";

export function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true); // Добавлено состояние для загрузки

  const isDark = useSignal(miniApp.isDark);
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }
  }, [isDark]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setIsLoading(false); // Отключаем индикатор загрузки
  //   }, 1500); // Устанавливаем время загрузки 1.5 секунды
  //   return () => clearTimeout(timeout); // Чистим таймаут при размонтировании
  // }, []);
  //
  //
  // if (isLoading) {
  //   return (
  //       <Loading/>
  //   );
  // }
  return (
      <HashRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path="*" element={<Navigate to="/apps"/>}/>
        </Routes>
      </HashRouter>
  );
}
