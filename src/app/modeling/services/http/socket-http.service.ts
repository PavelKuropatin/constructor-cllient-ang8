import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ModelingSettings} from '../../../domain/modeling-settings';

@Injectable({
  providedIn: 'root'
})
export class SocketHttpService {

  private readonly socketUrl: string;

  constructor(private http: HttpClient) {
    this.socketUrl = `${environment.apiUrl}/api/socket`;
  }

  startGetState(modelingSettings: ModelingSettings): Observable<string> {
    return this.http.post<string>(this.socketUrl, modelingSettings.params);
  }

  stopMonitor(cmdUuid: string) {
    this.http.delete(`${this.socketUrl}/${cmdUuid}`);
  }
}
