using Microsoft.AspNetCore.Mvc;
using PessoasAPI.Models;
using PessoasAPI.Services;

namespace PessoasAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly PessoaService _pessoaService;

        public PessoasController(PessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        // GET: api/pessoas
        [HttpGet]
        public ActionResult<IEnumerable<Pessoa>> GetPessoas()
        {
            var pessoas = _pessoaService.GetAll();
            return Ok(pessoas);
        }

        // GET: api/pessoas/{id}
        [HttpGet("{id}")]
        public ActionResult<Pessoa> GetPessoa(int id)
        {
            var pessoa = _pessoaService.GetById(id);
            if (pessoa == null)
                return NotFound();

            return Ok(pessoa);
        }

        // POST: api/pessoas
        [HttpPost]
        public ActionResult<Pessoa> CreatePessoa(Pessoa pessoa)
        {
            if (string.IsNullOrWhiteSpace(pessoa.Nome))
                return BadRequest("Nome é obrigatório");

            if (string.IsNullOrWhiteSpace(pessoa.Endereco))
                return BadRequest("Endereço é obrigatório");

            var novaPessoa = _pessoaService.Create(pessoa);
            return CreatedAtAction(nameof(GetPessoa), new { id = novaPessoa.Id }, novaPessoa);
        }

        // PUT: api/pessoas/{id}
        [HttpPut("{id}")]
        public ActionResult<Pessoa> UpdatePessoa(int id, Pessoa pessoa)
        {
            if (string.IsNullOrWhiteSpace(pessoa.Nome))
                return BadRequest("Nome é obrigatório");

            if (string.IsNullOrWhiteSpace(pessoa.Endereco))
                return BadRequest("Endereço é obrigatório");

            var pessoaAtualizada = _pessoaService.Update(id, pessoa);
            if (pessoaAtualizada == null)
                return NotFound();

            return Ok(pessoaAtualizada);
        }

        // DELETE: api/pessoas/{id}
        [HttpDelete("{id}")]
        public ActionResult DeletePessoa(int id)
        {
            var sucesso = _pessoaService.Delete(id);
            if (!sucesso)
                return NotFound();

            return NoContent();
        }
    }
} 