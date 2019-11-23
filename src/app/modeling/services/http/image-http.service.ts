import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageHttpService {

  private readonly imageUrl: string;

  constructor(private http: HttpClient) {
    this.imageUrl = `${environment.apiUrl}/api/image`;
  }

  uploadImage(image): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);
    console.log(formData);
    return this.http.post<string>(this.imageUrl, formData);
  }

  getImages(): Observable<string[]> {
    return this.http.get<string[]>(this.imageUrl);
  }
}
