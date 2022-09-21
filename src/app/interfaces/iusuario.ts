import { PageMenu } from '../models/page-menu-dto';
export interface IUsuario {

    user: string;
    password: string;
    token: string;
    validate: string;
    id?: string;
    role: string;
    Page: number;
    ResultsCount: number;
    TotalPages: number;

    pageMenuDto: PageMenu;

    //Paginacion
    PageSize: number;

    PageNumber: number;
}
