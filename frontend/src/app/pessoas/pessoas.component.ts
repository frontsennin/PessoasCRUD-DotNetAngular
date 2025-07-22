import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PessoaService } from '../services/pessoa.service';
import { Pessoa } from '../models/pessoa';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { FilterSortComponent, FilterSortOptions } from '../components/filter-sort/filter-sort.component';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmModalComponent, FilterSortComponent],
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
        
        <!-- Filtros e Ordenação -->
        <app-filter-sort 
          [options]="filterOptions"
          (optionsChange)="onFilterOptionsChange($event)"
        ></app-filter-sort>
        
        <div class="pessoas-list">
          <div *ngFor="let p of pessoasFiltradas" class="pessoa-card">
            <div class="pessoa-info">
              <h3>{{ p.nome }}</h3>
              <p><strong>Endereço:</strong> {{ p.endereco }}</p>
              <p><strong>Data de Nascimento:</strong> {{ p.dataNascimento | date:'dd/MM/yyyy' }}</p>
            </div>
            <div class="pessoa-actions">
              <button class="btn btn-edit" (click)="editar(p)">
                ✏️ Editar
              </button>
              <button class="btn btn-delete" (click)="confirmarExclusao(p)">
                🗑️ Excluir
              </button>
            </div>
          </div>
        </div>
        
        <div *ngIf="pessoasFiltradas.length === 0" class="empty-state">
          <p *ngIf="pessoas.length === 0">Nenhuma pessoa cadastrada ainda.</p>
          <p *ngIf="pessoas.length > 0">Nenhuma pessoa encontrada com os filtros aplicados.</p>
          <p>Adicione uma nova pessoa usando o formulário acima!</p>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <app-confirm-modal
      [isOpen]="showDeleteModal"
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir {{ pessoaParaExcluir?.nome }}? Esta ação não pode ser desfeita."
      confirmText="Excluir"
      cancelText="Cancelar"
      (confirm)="excluirConfirmado()"
      (cancel)="cancelarExclusao()"
    ></app-confirm-modal>
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
  pessoasFiltradas: Pessoa[] = [];
  pessoa: Pessoa = {
    nome: '',
    endereco: '',
    dataNascimento: new Date()
  };
  editando = false;
  pessoaEditandoId?: number;
  
  // Filtros e ordenação
  filterOptions: FilterSortOptions = {
    searchTerm: '',
    sortBy: 'nome',
    sortOrder: 'asc'
  };
  
  // Modal de confirmação
  showDeleteModal = false;
  pessoaParaExcluir?: Pessoa;

  constructor(
    private pessoaService: PessoaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.pessoaService.getPessoas().subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
        this.aplicarFiltros();
      },
      error: (error) => {
        console.error('Erro ao carregar pessoas:', error);
        this.toastr.error('Erro ao carregar a lista de pessoas. Verifique se o backend está rodando.', 'Erro');
      }
    });
  }

  aplicarFiltros(): void {
    let pessoasFiltradas = [...this.pessoas];

    // Aplicar filtro de busca
    if (this.filterOptions.searchTerm.trim()) {
      const termo = this.filterOptions.searchTerm.toLowerCase();
      pessoasFiltradas = pessoasFiltradas.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        p.endereco.toLowerCase().includes(termo)
      );
    }

    // Aplicar ordenação
    pessoasFiltradas.sort((a, b) => {
      let valorA: any;
      let valorB: any;

      switch (this.filterOptions.sortBy) {
        case 'nome':
          valorA = a.nome.toLowerCase();
          valorB = b.nome.toLowerCase();
          break;
        case 'endereco':
          valorA = a.endereco.toLowerCase();
          valorB = b.endereco.toLowerCase();
          break;
        case 'dataNascimento':
          valorA = new Date(a.dataNascimento);
          valorB = new Date(b.dataNascimento);
          break;
        default:
          valorA = a.nome.toLowerCase();
          valorB = b.nome.toLowerCase();
      }

      if (this.filterOptions.sortOrder === 'asc') {
        return valorA < valorB ? -1 : valorA > valorB ? 1 : 0;
      } else {
        return valorA > valorB ? -1 : valorA < valorB ? 1 : 0;
      }
    });

    this.pessoasFiltradas = pessoasFiltradas;
  }

  onFilterOptionsChange(options: FilterSortOptions): void {
    this.filterOptions = options;
    this.aplicarFiltros();
  }

  onSubmit(): void {
    if (this.editando && this.pessoaEditandoId) {
      this.pessoaService.updatePessoa(this.pessoaEditandoId, this.pessoa).subscribe({
        next: () => {
          this.carregarPessoas();
          this.limparFormulario();
          this.toastr.success('Pessoa atualizada com sucesso!', 'Sucesso');
        },
        error: (error) => {
          console.error('Erro ao atualizar pessoa:', error);
          this.toastr.error('Erro ao atualizar pessoa.', 'Erro');
        }
      });
    } else {
      this.pessoaService.createPessoa(this.pessoa).subscribe({
        next: () => {
          this.carregarPessoas();
          this.limparFormulario();
          this.toastr.success('Pessoa adicionada com sucesso!', 'Sucesso');
        },
        error: (error) => {
          console.error('Erro ao criar pessoa:', error);
          this.toastr.error('Erro ao criar pessoa.', 'Erro');
        }
      });
    }
  }

  editar(pessoa: Pessoa): void {
    this.pessoa = { ...pessoa };
    this.editando = true;
    this.pessoaEditandoId = pessoa.id;
  }

  confirmarExclusao(pessoa: Pessoa): void {
    this.pessoaParaExcluir = pessoa;
    this.showDeleteModal = true;
  }

  excluirConfirmado(): void {
    if (this.pessoaParaExcluir) {
      this.pessoaService.deletePessoa(this.pessoaParaExcluir.id!).subscribe({
        next: () => {
          this.carregarPessoas();
          this.toastr.success('Pessoa excluída com sucesso!', 'Sucesso');
          this.cancelarExclusao();
        },
        error: (error) => {
          console.error('Erro ao excluir pessoa:', error);
          this.toastr.error('Erro ao excluir pessoa.', 'Erro');
          this.cancelarExclusao();
        }
      });
    }
  }

  cancelarExclusao(): void {
    this.showDeleteModal = false;
    this.pessoaParaExcluir = undefined;
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