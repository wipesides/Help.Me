import { Injectable } from '@angular/core';
import { environment } from './environment';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
    async getNews(): Promise<any>{
        const response = await fetch(environment.newsApiUrl);
        if (!response.ok) throw new Error(`HTTP error status ${response.status}`);
        const data = await response.json();
        console.log(data)
        return data;
    }
    constructor(){}
}
