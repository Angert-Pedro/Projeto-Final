using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Validator.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly BaseService<Evento> _service;

        public EventoController(BaseService<Evento> service)
        {
            _service = service;
        }

        [HttpPost("criarEvento")]
        public IActionResult criarEvento([FromBody] Evento evento)
        {
            try
            {
                _service.inserir(evento);
                return Ok("Evento cadastrado com sucesso!");
            } 
            catch(Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpGet("ObterEventos")]
        public IActionResult obterEventos()
        {
            try
            {
                IEnumerable<Evento> listaEventos = _service.listar();
                if (listaEventos.Count() > 0)
                    return Ok(listaEventos);
                else
                    return NotFound("Nenhum evento encontrado!");
            }
            catch(Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }
    }
}
