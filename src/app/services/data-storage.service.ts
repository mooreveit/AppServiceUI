import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

    constructor() { }
    
    //Save
    public save(key: string, value: string) { 
               
        localStorage.setItem(key, value);
    
    }

    //Save
    public saveObject(key: string, value: any) {

        let data: string = JSON.stringify(value)

        localStorage.setItem(key, data);

    }

    //Read
    public read(key: string): any {
        let data: any = localStorage.getItem(key); 
        return data;
    }

    //Read
    public readDataAsJSON(key: string) {
        
        let data: any = localStorage.getItem(key);

        let json = JSON.parse(data)
        
        return json;
    }


}
