import { Injectable } from '@angular/core';
import { environment } from './environment';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
    async getPosts(): Promise<any>{
        const response = await fetch(environment.postsApiUrl);
        if (!response.ok) throw new Error(`HTTP error status ${response.status}`);
        const data = await response.json();
        console.log(data);
        return data;
    }
    constructor(){}
}
