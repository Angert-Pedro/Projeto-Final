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
            return Ok(_service.Listar());
        }

        [HttpPost]
        public IActionResult Create([FromBody] Ingresso ingresso)
        {
            _service.Inserir(ingresso);
            return Ok(ingresso);
        }
    }
}   