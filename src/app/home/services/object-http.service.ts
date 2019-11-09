import {Injectable} from '@angular/core';
import {Diagram} from '../../domain/diagram';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {State} from '../../domain/state';
import {Variable} from '../../domain/variable';

@Injectable({
  providedIn: 'root'
})
export class ObjectHttpService {

  private readonly apiUrl: string;
  private readonly diagramUrl: string;
  private readonly stateUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.diagramUrl = `${this.apiUrl}/api/diagram`;
    this.stateUrl = `${this.apiUrl}/api/state`;
  }

  deleteState(diagramUuid: string, stateUuid: string) {
    this.http.delete(`${this.diagramUrl}/${diagramUuid}/state/${stateUuid}`);
  }

  createState(diagramUuid: string): Observable<State> {
    return this.http.post<State>(`${this.diagramUrl}/${diagramUuid}/state`, {});
  }

  getDiagrams(): Observable<Diagram[]> {
    return this.http.get<Diagram[]>(this.diagramUrl);
  }

  saveDiagram(diagram: Diagram): Observable<Diagram> {
    return this.http.post<Diagram>(this.diagramUrl, diagram);
  }

  updateDiagram(diagram: Diagram): Observable<Diagram> {
    return this.http.put<Diagram>(`${this.diagramUrl}`, diagram);
  }

  getDiagram(uuid: string): Observable<Diagram> {
    return this.http.get<Diagram>(`${this.diagramUrl}/${uuid}`);
  }

  createNewDiagram(): Observable<Diagram> {
    return this.http.post<Diagram>(`${this.diagramUrl}/new`, {});
  }

  createVariable(stateUuid: string, variable: Variable): Observable<State> {
    return this.http.post<State>(`${this.stateUrl}/${stateUuid}/container/create`, variable);
  }

  deleteVariable(stateUuid: string, variable: Variable): Observable<State> {
    return this.http.request<State>('delete', `${this.stateUrl}/${stateUuid}/container/delete`, {body: variable});
  }

  deleteDiagram(diagramUuid: string): Observable<object> {
    return this.http.delete(`${this.diagramUrl}/${diagramUuid}`);
  }
}