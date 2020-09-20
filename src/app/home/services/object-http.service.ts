import {Injectable} from '@angular/core';
import {Schema} from '../../domain/schema';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Block} from '../../domain/block';
import {Variable} from '../../domain/variable';
import {Settings} from '../../domain/settings';
import {Action} from '../../domain/action';

@Injectable({
  providedIn: 'root'
})
export class ObjectHttpService {

  private readonly apiUrl: string;
  private readonly diagramUrl: string;
  private readonly stateUrl: string;
  private readonly settingsUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.diagramUrl = `${this.apiUrl}/api/diagram`;
    this.stateUrl = `${this.apiUrl}/api/state`;
    this.settingsUrl = `${this.apiUrl}/api/settings`;
  }

  deleteState(diagramUuid: string, stateUuid: string) {
    return this.http.delete(`${this.diagramUrl}/${diagramUuid}/state/${stateUuid}`);
  }

  createState(diagramUuid: string): Observable<Block> {
    return this.http.post<Block>(`${this.diagramUrl}/${diagramUuid}/state`, {});
  }

  getDiagrams(): Observable<Schema[]> {
    return this.http.get<Schema[]>(this.diagramUrl);
  }

  saveDiagram(diagram: Schema): Observable<Schema> {
    return this.http.post<Schema>(this.diagramUrl, diagram);
  }

  updateDiagram(diagram: Schema): Observable<Schema> {
    return this.http.put<Schema>(`${this.diagramUrl}/${diagram.uuid}`, diagram);
  }

  getDiagram(uuid: string): Observable<Schema> {
    return this.http.get<Schema>(`${this.diagramUrl}/${uuid}`);
  }

  createNewDiagram(): Observable<Schema> {
    return this.http.post<Schema>(`${this.diagramUrl}/new`, {});
  }

  createVariable(stateUuid: string, variable: Variable): Observable<Block> {
    return this.http.post<Block>(`${this.stateUrl}/${stateUuid}/container/create`, variable);
  }

  deleteVariable(stateUuid: string, variable: Variable): Observable<Block> {
    return this.http.request<Block>('delete', `${this.stateUrl}/${stateUuid}/container/delete`, {body: variable});
  }

  deleteDiagram(diagramUuid: string): Observable<object> {
    return this.http.delete(`${this.diagramUrl}/${diagramUuid}`);
  }

  saveStateSettings(stateUuid: string, settings: Settings): Observable<Settings> {
    return this.http.post<Settings>(`${this.settingsUrl}/${stateUuid}`, settings);
  }

  deleteSettingsAction(stateUuid: string, actionUuid: string): Observable<any> {
    return this.http.delete(`${this.settingsUrl}/${stateUuid}/action/${actionUuid}`);
  }

  getStateSettings(stateUuid: string): Observable<Settings> {
    return this.http.get<Settings>(`${this.settingsUrl}/${stateUuid}`);
  }

  addSettingsAction(stateUuid) {
    return this.http.post<Settings>(`${this.settingsUrl}/${stateUuid}/action`, new Action('false', 'load_image'));
  }
}
