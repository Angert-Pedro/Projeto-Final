using API.Criptografia;
using API.Services.Interfaces;

namespace API.Services
{
    public class CriptografiaService : ICriptografiaService
    {
        private readonly CriptografiaAES _criptoLegado;

        public CriptografiaService()
        {
            _criptoLegado = new CriptografiaAES();
        }

        public string Criptografar(string texto)
        {
            return _criptoLegado.CriptografarAES(texto);
        }
    }
}