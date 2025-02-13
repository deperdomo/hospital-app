import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cita } from "../models/cita";

@Injectable({
    providedIn: 'root'
})
export class CitaService {
    
    private apiUrl = 'http://localhost:8090/cita';

    constructor(private http: HttpClient) {}

    getMisCitas(): Observable<Cita[]> {
        return this.http.get<Cita[]>(`${this.apiUrl}/misCitas`);
    }
}