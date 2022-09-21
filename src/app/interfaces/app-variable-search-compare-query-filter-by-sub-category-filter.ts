import { AppVariableSearchCompareQueryFilter } from "./app-variable-search-compare-queryfilter";
import { AppVariableSearchGetDto } from '../models/app-variable-search-get-dto';

export interface AppVariableSearchCompareQueryFilterBySubCategory{
    
    appVariableSearchCompareQueryFilter:AppVariableSearchCompareQueryFilter[];
    
    subCategoryId:number;

}

export interface FilterProduct{
    
    filters:AppVariableSearchGetDto[];
    subCategoryId:number;
}