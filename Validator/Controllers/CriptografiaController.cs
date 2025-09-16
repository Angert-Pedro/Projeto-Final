using API.Criptografia;
using Microsoft.AspNetCore.Mvc;

namespace API.Validator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CriptografiaController : ControllerBase
    {
        [HttpPost("criptografarSenha")]
        public void CriptografarSenha([FromBody] string texto)
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
