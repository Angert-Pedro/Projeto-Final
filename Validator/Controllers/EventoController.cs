using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly BaseService<Evento> _service;

        public EventoController(BaseService<Evento> service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.Listar());
        }

        [HttpPost]
        public IActionResult Create([FromBody] Evento evento)
        {
            _service.Inserir(evento);
            return Ok(evento);
        }
    }
}