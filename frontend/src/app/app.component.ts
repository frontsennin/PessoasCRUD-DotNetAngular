import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <header class="header">
        <h1>💜 Sistema de Pessoas CRUD</h1>
        <p>Backend .NET Core + Frontend Angular 17</p>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .header h1 {
      margin: 0;
      font-size: 2.5em;
      font-weight: 300;
    }
    
    .header p {
      margin: 10px 0 0 0;
      font-size: 1.1em;
      opacity: 0.9;
    }
  `]
})
export class AppComponent {
  title = 'Sistema de Pessoas CRUD';
} 