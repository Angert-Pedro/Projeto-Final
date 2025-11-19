using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IngressoController : ControllerBase
    {
        private readonly BaseService<Ingresso> _service;

        public IngressoController(BaseService<Ingresso> service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.listar());
        }

        [HttpPost("Create")]
        public IActionResult Create([FromBody] Ingresso ingresso)
        {
            _service.inserir(ingresso);
            return Ok(ingresso);
        }
    }
}   