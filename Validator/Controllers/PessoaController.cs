using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly BaseService<Pessoa> _service;

        public PessoaController(BaseService<Pessoa> service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.listar());
        }

        [HttpPost]
        public IActionResult Create([FromBody] Pessoa pessoa)
        {
            _service.inserir(pessoa);
            return Ok(pessoa);
        }
    }
}