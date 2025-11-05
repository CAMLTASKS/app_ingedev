import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  constructor(private http: HttpClient) { }

  getMotivation(animo = 'motivado') {
    const url = "https://api.openai.com/v1/chat/completions";

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${environment.OPENAI_API_KEY}`
    });

    const body = {
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "soy un mi estado de animo es " + animo + " Solo responde con la frase dentro de \"\" la frase debe ser de 50 palabras Frases motivacionales con las siguientes caracteristicas de mi vida (Soy desarrollador de software, estudio ingenieria en sistemas y ciberseguridad, amo las motos soy deportista de motovelocidad en colombia, soy muy organizado, soy crisitano y amo a Dios por encima de todo, dame frases o versiculos de la biblia tambien de manera aleatoria)" },
      ],
      temperature: 0.9
    };

    return this.http.post<any>(url, body, { headers });
  }

  getQuestion(prompt: any){
        const url = "https://api.openai.com/v1/chat/completions";

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${environment.OPENAI_API_KEY}`
    });

    const body = {
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: prompt },
      ],
      temperature: 0.9
    };

    return this.http.post<any>(url, body, { headers });
  }
}
