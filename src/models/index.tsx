import { LayoutType, Photo } from "react-photo-album";

type Image = {
    url: string;
    description: string;
    info: string
}

type Link = {
    url: string;
    name: string;
}

type SettingsProps = {
    photos: Photo[];
    layout: LayoutType;
    targetRowHeight: number;
    columns: number;
    spacing: number;
    padding: number;
    width: number;
};

type Category = {
    id:number;
    name: string;
}

export type { Image, Link, SettingsProps, Category };