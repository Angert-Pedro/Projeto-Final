using API.Criptografia;
using Microsoft.AspNetCore.Mvc;

namespace API.Validator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CriptografiaController : ControllerBase
    {
        [HttpGet("criptografarSenha")]
        public void CriptografarSenha([FromQuery] string texto)
        {
            try
            {
                var criptografia = new CriptografiaAES();
                criptografia.CriptografarAES(texto);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
