using PessoasAPI.Models;

namespace PessoasAPI.Services
{
    public class PessoaService
    {
        private List<Pessoa> _pessoas;
        private int _nextId = 1;

        public PessoaService()
        {
            _pessoas = new List<Pessoa>
            {
                new Pessoa { Id = _nextId++, Nome = "João Silva", Endereco = "Rua das Flores, 123", DataNascimento = new DateTime(1990, 5, 15) },
                new Pessoa { Id = _nextId++, Nome = "Maria Santos", Endereco = "Av. Principal, 456", DataNascimento = new DateTime(1985, 8, 22) },
                new Pessoa { Id = _nextId++, Nome = "Pedro Oliveira", Endereco = "Rua do Comércio, 789", DataNascimento = new DateTime(1992, 3, 10) }
            };
        }

        public List<Pessoa> GetAll()
        {
            return _pessoas;
        }

        public Pessoa? GetById(int id)
        {
            return _pessoas.FirstOrDefault(p => p.Id == id);
        }

        public Pessoa Create(Pessoa pessoa)
        {
            pessoa.Id = _nextId++;
            _pessoas.Add(pessoa);
            return pessoa;
        }

        public Pessoa? Update(int id, Pessoa pessoa)
        {
            var existingPessoa = _pessoas.FirstOrDefault(p => p.Id == id);
            if (existingPessoa == null)
                return null;

            existingPessoa.Nome = pessoa.Nome;
            existingPessoa.Endereco = pessoa.Endereco;
            existingPessoa.DataNascimento = pessoa.DataNascimento;

            return existingPessoa;
        }

        public bool Delete(int id)
        {
            var pessoa = _pessoas.FirstOrDefault(p => p.Id == id);
            if (pessoa == null)
                return false;

            _pessoas.Remove(pessoa);
            return true;
        }
    }
} 