import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environments';
import { Feed } from '../interfaces/feed.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _feed = signal<Feed[]>([]);

  //! Al mundo exterior
  public feedAll = computed(() => this._feed());

  constructor() {
    this.find().subscribe();
  }


  private find() {
    const url = `${this.baseUrl}/api/post`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Feed[]>(url,{headers}).pipe(
      map((feeds) => {
        this._feed.set(feeds)
      })
    )
  }

  save(content: string, title: string) {
    const url = `${this.baseUrl}/api/post`;
    const body = { content, title };
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Feed>(url,body,{headers}).pipe(
      map((feed) => {
        console.log(feed);
        
      })
    )
  }

}
