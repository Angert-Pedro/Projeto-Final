using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Validator.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NotificacaoController : ControllerBase
    {
        private readonly BaseService<Notificacao> _service;
        public NotificacaoController(BaseService<Notificacao> service)
        {
            _service = service;
        }

        [HttpPost("criarNotificacao")]
        public IActionResult criarNotificacao([FromBody] Notificacao notificacao)
        {
            try
            {
                _service.inserir(notificacao);
                return Ok("Notificação gerada com sucesso!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }

        [HttpGet("ObterNotificacao")]
        public IActionResult obterNotificacao()
        {
            try
            {
                IEnumerable<Notificacao> listaNotificacao = _service.listar();
                if (listaNotificacao.Count() > 0)
                    return Ok(listaNotificacao);
                else
                    return NotFound("Nenhuma notificação foi encontrado!");
            }
            catch (Exception ex)
            {
                return BadRequest("Ocorreu um erro em sua requisição! Log:" + ex);
            }
        }
        
    }
}
