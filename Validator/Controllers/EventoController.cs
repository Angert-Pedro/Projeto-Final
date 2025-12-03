using API.Models;
using API.Services;
using API.Services.Interfaces;
using API.Validator.Request;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Validator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly IBaseService<Evento> _service;
        private readonly IBaseService<Localizacao> _localizacaoService;
        public EventoController(IBaseService<Evento> service, IBaseService<Localizacao> localizacaoService)
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
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpPost("atualizarEvento")]
        public IActionResult atualizarEvento([FromBody] Evento evento)
        {
            try
            {
                _service.atualizar(evento);
                return Ok("Evento atualizado com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpGet("ObterEventos")]
        public IActionResult obterEventos()
        {
            try
            {
                IEnumerable<Evento> listaEventos = _service.listarVariosPor(x => x.Data_Evento > DateTime.Now);
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

        [HttpGet("ObterEventoPorID")]
        public IActionResult obterEventoPorID(int id)
        {
            try
            {
                Evento evento = _service.listarPor(x => x.Id == id);
                if (evento != null)
                    return Ok(evento);
                else
                    return NotFound("Evento não encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }
    }
}
