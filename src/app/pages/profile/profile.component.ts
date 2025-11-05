import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(){
  }
  isEditing = false;

  user: any = {
    name: "Carlos Maldonado",
    email: "carlos@example.com",
    country: "Colombia",
    job: "FullStack Architect & Cloud Ninja 🧠⚡",
    mood: "🔥 En modo conquista",
    avatar: "https://ingedev94.com/assets/imgs/perfil.jpeg",

    roles: ["Tech Lead", "Fullstack Dev", "Cloud Builder"],
    
    stack: ["Angular", "Node", "OpenAI", "PostgreSQL", "Azure", "Docker", "Python", "Linux"],

    skills: [
      { name: "Frontend (Angular/Tailwind)", level: 95 },
      { name: "Backend Node / Python", level: 90 },
      { name: "Cloud Azure", level: 85 },
      { name: "AI / Prompt Engineering", level: 88 },
      { name: "SQL / Data Engineering", level: 92 },
    ],

    stats: {
      projects: 42,
      coffee: 80,
      codeHours: 55
    },

    projects: [
      { name: "CRM Ventas", stack: "Angular + Node" },
      { name: "ERP Industrial", stack: "Python + PostgreSQL + Azure" },
      { name: "AI Motors", stack: "OpenAI + Ionic" }
    ]
  };


  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.isEditing = false;
    alert("Perfil actualizado ✅");
  }

  uploadAvatar(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.user.avatar = reader.result;
    reader.readAsDataURL(file);
  }

  logout() {
    alert("Sesión cerrada 👋");
  }
}
