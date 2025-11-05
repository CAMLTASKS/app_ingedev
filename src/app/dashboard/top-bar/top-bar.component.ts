import { Component } from '@angular/core';
import { DashboardService } from "../dashboard.service";
import { OpenAIService } from 'src/app/services/openai.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  constructor(private dashboard: DashboardService, private ai: OpenAIService) {
  }


  showNotifications = false;

  notifications = [
    { icon: "⚡", title: "Nueva Tarea Asignada", message: "Tienes un nuevo ticket en soporte", time: "2m" },
    { icon: "🚀", title: "Meta alcanzada", message: "Completaste tu objetivo semanal", time: "1h" },
    { icon: "📧", title: "Correo", message: "Tienes 3 nuevos correos", time: "3h" },
    { icon: "🔧", title: "Actualización", message: "Sistema actualizado correctamente", time: "Ayer" },
  ];

  showIdeas = false;
  newIdea = "";
  ideaTag = "inspiración";

  ideas: any[] = [
    { text: "Crear app IA personal 🤖", tag: "✨ Inspiración", favorite: false },
  ];

  showIdeaChat = false;
  currentMessage = "";
  chat = [
    { sender: "ai", text: "Hola 👋 Estoy listo para crear ideas contigo." }
  ];

  searchOpen = false;
  query = '';

  items = [
    { name: 'Tus ideas', icon: '💡' },
    { name: 'Proyectos', icon: '🚀' },
    { name: 'Tareas', icon: '📋' },
    { name: 'Favoritos', icon: '⭐' },
    { name: 'Configuración', icon: '⚙️' }
  ];

  filtered = [...this.items];

  openSearch() {
    this.searchOpen = true;
    this.query = '';
    setTimeout(() => {
      const input = document.querySelector('input') as HTMLInputElement;
      input?.focus();
    }, 50);
  }

  closeSearch() {
    this.searchOpen = false;
  }

  filterResults() {
    const s = this.query.toLowerCase();
    this.filtered = this.items.filter(i => i.name.toLowerCase().includes(s));
  }

  openIdeaChat() {
    this.showIdeaChat = true;
    this.showIdeas = false;

  }

  closeIdeaChat() {
    this.showIdeaChat = false;
  }

  sendIdea() {
    if (!this.currentMessage.trim()) return;

    const userMsg = this.currentMessage;
    this.chat.push({ sender: "me", text: userMsg });
    this.currentMessage = "";

    const tempIndex = this.chat.push({
      sender: "ai",
      text: "🤖 Pensando..."
    }) - 1;

    this.ai.getQuestion(userMsg).subscribe({
      next: (res) => {
        const answer = res?.choices?.[0]?.message?.content?.trim();
        this.chat[tempIndex].text = answer ?? "🤔 Sin respuesta";
      },

      error: (err) => {
        const msg = err.error?.error?.message || "";

        if (msg.includes("Please try again in")) {
          // Extraer segundos del mensaje de OpenAI
          const match = msg.match(/(\d+)s/);
          const seconds = match ? Number(match[1]) : 20;

          this.chat[tempIndex].text =
            `⚠️ OpenAI está saturado.\n⏳ Espera ${seconds}s antes de intentar otra vez.`;

          return;
        }

        this.chat[tempIndex].text = "❌ Error inesperado, inténtalo de nuevo.";
      }
    });
  }


  toggleIdeas() {
    this.showIdeas = !this.showIdeas;
  }

  addIdea() {
    if (!this.newIdea.trim()) return;

    this.ideas.unshift({
      text: this.newIdea,
      tag: this.ideaTag,
      favorite: false
    });

    this.newIdea = "";
  }



  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }


  openSidebar() {
    this.dashboard.openSidebar()
  }
}
