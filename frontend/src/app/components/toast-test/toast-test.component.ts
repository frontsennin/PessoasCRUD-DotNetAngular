import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toast-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-test">
      <h3>Teste do Toastr</h3>
      <div class="test-buttons">
        <button (click)="testSuccess()" class="btn btn-success">Teste Sucesso</button>
        <button (click)="testError()" class="btn btn-error">Teste Erro</button>
        <button (click)="testWarning()" class="btn btn-warning">Teste Aviso</button>
        <button (click)="testInfo()" class="btn btn-info">Teste Info</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-test {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .test-buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 0.9em;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-success {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-error {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
      color: white;
    }

    .btn-warning {
      background: linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%);
      color: white;
    }

    .btn-info {
      background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
      color: white;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
  `]
})
export class ToastTestComponent {
  constructor(private toastr: ToastrService) {}

  testSuccess(): void {
    this.toastr.success('Operação realizada com sucesso!', 'Sucesso!');
  }

  testError(): void {
    this.toastr.error('Ocorreu um erro na operação.', 'Erro!');
  }

  testWarning(): void {
    this.toastr.warning('Atenção! Esta ação pode ter consequências.', 'Aviso!');
  }

  testInfo(): void {
    this.toastr.info('Informação importante para você.', 'Informação!');
  }
} 