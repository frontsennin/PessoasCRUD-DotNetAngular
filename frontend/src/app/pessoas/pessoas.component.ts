import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../services/pessoa.service';
import { Pessoa } from '../models/pessoa';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pessoas-container">
      <!-- Formulário -->
      <div class="form-section">
        <h2>{{ editando ? 'Editar' : 'Adicionar' }} Pessoa</h2>
        <form (ngSubmit)="onSubmit()" #pessoaForm="ngForm" class="pessoa-form">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              [(ngModel)]="pessoa.nome" 
              required 
              class="form-control"
              placeholder="Digite o nome completo">
          </div>

          <div class="form-group">
            <label for="endereco">Endereço:</label>
            <input 
              type="text" 
              id="endereco" 
              name="endereco" 
              [(ngModel)]="pessoa.endereco" 
              required 
              class="form-control"
              placeholder="Digite o endereço completo">
          </div>

          <div class="form-group">
            <label for="dataNascimento">Data de Nascimento:</label>
            <input 
              type="date" 
              id="dataNascimento" 
              name="dataNascimento" 
              [(ngModel)]="pessoa.dataNascimento" 
              required 
              class="form-control">
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="!pessoaForm.valid">
              {{ editando ? 'Atualizar' : 'Adicionar' }}
            </button>
            <button type="button" class="btn btn-secondary" (click)="cancelar()" *ngIf="editando">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Lista de Pessoas -->
      <div class="list-section">
        <h2>Lista de Pessoas</h2>
        <div class="pessoas-list">
          <div *ngFor="let p of pessoas" class="pessoa-card">
            <div class="pessoa-info">
              <h3>{{ p.nome }}</h3>
              <p><strong>Endereço:</strong> {{ p.endereco }}</p>
              <p><strong>Data de Nascimento:</strong> {{ p.dataNascimento | date:'dd/MM/yyyy' }}</p>
            </div>
            <div class="pessoa-actions">
              <button class="btn btn-edit" (click)="editar(p)">
                ✏️ Editar
              </button>
              <button class="btn btn-delete" (click)="excluir(p.id!)">
                🗑️ Excluir
              </button>
            </div>
          </div>
        </div>
        
        <div *ngIf="pessoas.length === 0" class="empty-state">
          <p>Nenhuma pessoa cadastrada ainda.</p>
          <p>Adicione uma nova pessoa usando o formulário acima!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pessoas-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-top: 20px;
    }

    .form-section, .list-section {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #333;
      margin-bottom: 20px;
      font-size: 1.5em;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }

    .pessoa-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    label {
      font-weight: 600;
      color: #555;
      font-size: 0.9em;
    }

    .form-control {
      padding: 12px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 1em;
      transition: border-color 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }

    .btn {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
    }

    .pessoas-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .pessoa-card {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 10px;
      padding: 20px;
      transition: all 0.3s ease;
    }

    .pessoa-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .pessoa-info h3 {
      margin: 0 0 10px 0;
      color: #333;
      font-size: 1.2em;
    }

    .pessoa-info p {
      margin: 5px 0;
      color: #666;
    }

    .pessoa-actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }

    .btn-edit {
      background: #ffc107;
      color: #212529;
    }

    .btn-edit:hover {
      background: #e0a800;
    }

    .btn-delete {
      background: #dc3545;
      color: white;
    }

    .btn-delete:hover {
      background: #c82333;
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: #6c757d;
    }

    .empty-state p {
      margin: 10px 0;
      font-size: 1.1em;
    }

    @media (max-width: 768px) {
      .pessoas-container {
        grid-template-columns: 1fr;
      }
      
      .form-actions {
        flex-direction: column;
      }
      
      .pessoa-actions {
        flex-direction: column;
      }
    }
  `]
})
export class PessoasComponent implements OnInit {
  pessoas: Pessoa[] = [];
  pessoa: Pessoa = {
    nome: '',
    endereco: '',
    dataNascimento: new Date()
  };
  editando = false;
  pessoaEditandoId?: number;

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.pessoaService.getPessoas().subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
      },
      error: (error) => {
        console.error('Erro ao carregar pessoas:', error);
        alert('Erro ao carregar a lista de pessoas. Verifique se o backend está rodando.');
      }
    });
  }

  onSubmit(): void {
    if (this.editando && this.pessoaEditandoId) {
      this.pessoaService.updatePessoa(this.pessoaEditandoId, this.pessoa).subscribe({
        next: () => {
          this.carregarPessoas();
          this.limparFormulario();
          alert('Pessoa atualizada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao atualizar pessoa:', error);
          alert('Erro ao atualizar pessoa.');
        }
      });
    } else {
      this.pessoaService.createPessoa(this.pessoa).subscribe({
        next: () => {
          this.carregarPessoas();
          this.limparFormulario();
          alert('Pessoa adicionada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao criar pessoa:', error);
          alert('Erro ao criar pessoa.');
        }
      });
    }
  }

  editar(pessoa: Pessoa): void {
    this.pessoa = { ...pessoa };
    this.editando = true;
    this.pessoaEditandoId = pessoa.id;
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.deletePessoa(id).subscribe({
        next: () => {
          this.carregarPessoas();
          alert('Pessoa excluída com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao excluir pessoa:', error);
          alert('Erro ao excluir pessoa.');
        }
      });
    }
  }

  cancelar(): void {
    this.limparFormulario();
  }

  private limparFormulario(): void {
    this.pessoa = {
      nome: '',
      endereco: '',
      dataNascimento: new Date()
    };
    this.editando = false;
    this.pessoaEditandoId = undefined;
  }
} 