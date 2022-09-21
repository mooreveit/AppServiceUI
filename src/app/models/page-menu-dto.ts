export interface Children {
    title: string;
    url: string;
    icon: string;
    pageMenuId: number;
}

export interface PageMenu {
    id: number
    role: number;
    title: string;
    url: string;
    icon: string;
    children: Children[];
}