import type {ComponentType, JSX} from 'react';
import {Flat} from "@/pages/flat.tsx";
import {Main} from "@/pages/main.tsx";
import {FormSubmit} from "@/pages/form.tsx";
import {PreviewPage} from "@/pages/preview.tsx";


interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: Main , title: 'Apartment' },
  { path: '/form', Component: FormSubmit, title: 'Форма объявления' },
  { path: '/preview', Component: PreviewPage, title: 'Форма объявления' },
  { path: '/flat', Component: Flat, title: 'App' },
];
