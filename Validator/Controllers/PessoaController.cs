using API.Models;
using API.Services;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly IBaseService<Pessoa> _service;

        public PessoaController(IBaseService<Pessoa> service)
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