import { Component, AfterViewInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OpenAIService } from '../../services/openai.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements AfterViewInit {


  motivation = "Cargando Frase .... ";
  loading = false;

  moods = [
    { name: "Motivado", icon: "🔥" },
    { name: "Feliz", icon: "😄" },
    { name: "Creativo", icon: "💡" },
    { name: "Enfocado", icon: "🎯" },
    { name: "Cansado", icon: "😴" },
    { name: "Triste", icon: "😔" },
    { name: "Orgulloso", icon: "😍" }


  ];
  animo = "Motivado"
  currentMood = "Motivado";



  setMood(mood: string) {
    this.currentMood = mood;
    this.animo = mood;
    this.fetchPhrase(this.animo);
  }


  constructor(private ai: OpenAIService) { }

  goTo(app: string) {
    switch (app) {
      case 'crm': window.open('https://tusistema.com/crm', '_blank'); break;
      case 'erp': window.open('https://tusistema.com/erp', '_blank'); break;
      case 'contabilidad': window.open('https://tusistema.com/contabilidad', '_blank'); break;
      case 'soporte': window.open('https://tusistema.com/soporte', '_blank'); break;
      case 'proyectos': window.open('https://tusistema.com/proyectos', '_blank'); break;
    }
  }

  ngOnInit() {
    this.fetchPhrase();
  }

  fetchPhrase(animo = "motivado") {
    this.loading = true;

    this.ai.getMotivation(animo).subscribe({
      next: (res) => {
        this.motivation = res.choices[0].message.content.trim();
        this.loading = false;
      },
      error: () => {
        this.motivation = "Dale con ganas, siempre has podido con todo, tu puedes con cualquier reto si tienes a Dios con tigo la paz siempre estara.";
        this.loading = false;
      }
    });
  }


  searchFrase() {
    this.fetchPhrase();
  }

  ngAfterViewInit() {
    const moto = document.getElementById("motoRun");
    let pos = 0;
    let direction = 1;

    setInterval(() => {
      pos += 1 * direction;
      moto!.style.transform = `translateX(${pos}px)`;

      if (pos > 40 || pos < 0) direction *= -1;
    }, 30);
  }
}
