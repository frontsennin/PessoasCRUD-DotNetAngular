import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterSortOptions {
  searchTerm: string;
  sortBy: 'nome' | 'endereco' | 'dataNascimento';
  sortOrder: 'asc' | 'desc';
}

@Component({
  selector: 'app-filter-sort',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-sort-container">
      <div class="search-section">
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="options.searchTerm"
            (input)="onOptionsChange()"
            placeholder="🔍 Buscar por nome ou endereço..."
            class="search-input"
          >
        </div>
      </div>
      
      <div class="sort-section">
        <div class="sort-controls">
          <label for="sortBy">Ordenar por:</label>
          <select 
            id="sortBy" 
            [(ngModel)]="options.sortBy"
            (change)="onOptionsChange()"
            class="sort-select"
          >
            <option value="nome">Nome</option>
            <option value="endereco">Endereço</option>
            <option value="dataNascimento">Data de Nascimento</option>
          </select>
          
          <button 
            class="sort-order-btn"
            (click)="toggleSortOrder()"
            [title]="options.sortOrder === 'asc' ? 'Crescente' : 'Decrescente'"
          >
            {{ options.sortOrder === 'asc' ? '↑' : '↓' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filter-sort-container {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .search-section {
      flex: 1;
    }

    .search-box {
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 1em;
      transition: all 0.3s ease;
      background: #f8f9fa;
    }

    .search-input:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .search-input::placeholder {
      color: #6c757d;
    }

    .sort-section {
      display: flex;
      align-items: center;
    }

    .sort-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .sort-controls label {
      font-weight: 600;
      color: #555;
      font-size: 0.9em;
    }

    .sort-select {
      padding: 8px 12px;
      border: 2px solid #e1e5e9;
      border-radius: 6px;
      font-size: 0.9em;
      background: white;
      cursor: pointer;
      transition: border-color 0.3s ease;
    }

    .sort-select:focus {
      outline: none;
      border-color: #667eea;
    }

    .sort-order-btn {
      padding: 8px 12px;
      border: 2px solid #e1e5e9;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 1.1em;
      font-weight: bold;
      color: #667eea;
      transition: all 0.3s ease;
      min-width: 40px;
    }

    .sort-order-btn:hover {
      border-color: #667eea;
      background: #f8f9fa;
      transform: translateY(-1px);
    }

    @media (min-width: 768px) {
      .filter-sort-container {
        flex-direction: row;
        align-items: center;
      }
      
      .search-section {
        flex: 2;
      }
      
      .sort-section {
        flex: 1;
        justify-content: flex-end;
      }
    }

    @media (max-width: 480px) {
      .filter-sort-container {
        padding: 15px;
      }
      
      .sort-controls {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }
      
      .sort-controls label {
        text-align: center;
      }
      
      .sort-select,
      .sort-order-btn {
        width: 100%;
      }
    }
  `]
})
export class FilterSortComponent {
  @Input() options: FilterSortOptions = {
    searchTerm: '',
    sortBy: 'nome',
    sortOrder: 'asc'
  };
  
  @Output() optionsChange = new EventEmitter<FilterSortOptions>();

  onOptionsChange(): void {
    this.optionsChange.emit(this.options);
  }

  toggleSortOrder(): void {
    this.options.sortOrder = this.options.sortOrder === 'asc' ? 'desc' : 'asc';
    this.onOptionsChange();
  }
} 