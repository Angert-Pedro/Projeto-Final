using API.Models;
using API.Services;
using API.Validator.Request;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Validator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly BaseService<Evento> _service;
        private readonly BaseService<Localizacao> _localizacaoService;
        public EventoController(BaseService<Evento> service, BaseService<Localizacao> localizacaoService)
        {
            _service = service;
            _localizacaoService = localizacaoService;
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
                return BadRequest("Ocorreu um erro em sua requisi��o! Log:" + ex);
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
                return BadRequest("Ocorreu um erro em sua requisi��o! Log:" + ex);
            }
        }
    }
}
