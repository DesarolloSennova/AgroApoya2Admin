import { HttpClient } from '@angular/common/http';
import { MetodosglobalesService } from './metodosglobales.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InteraccionMenyChat {

    constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

    url_servidor = this.metodosglobales.SeleccionAmbiente();

    infoUserManyChat(Body: any) {
        return this.http.post<any>(this.url_servidor + 'infoUserManyChat', Body)
    }
    modmanychatcreateuser(Body: any) {
        return this.http.post<any>(this.url_servidor + 'modmanychatcreateuser', Body)
    }
    ActualizaIdManyChat(Bandera: string, Body: any) {
        return this.http.post<any>(this.url_servidor + 'ActualizaIdManyChat/' + Bandera, Body)
    }
}