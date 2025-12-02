using Xunit;
using API.Services;
using API.Services.Interfaces;
namespace API.TesteAutomatizadoCriptografia 
{
 
public class CriptografiaTests
{
    private readonly ICriptografiaService _service;

    public CriptografiaTests()
    {

        _service = new CriptografiaService();
    }

    [Fact]
    public void When_CriptografarTexto_Then_GeraHashValido()
    {
        string textoOriginal = "SenhaTeste123";

        string resultado = _service.Criptografar(textoOriginal);

        Xunit.Assert.NotNull(resultado);
        Xunit.Assert.NotEmpty(resultado);
        Xunit.Assert.NotEqual(textoOriginal, resultado);
    }

    [Fact]
    public void When_CriptografarInputsDiferentes_Then_GeraHashesDiferentes()
    {
        string texto1 = "SenhaA";
        string texto2 = "SenhaB";

        var hash1 = _service.Criptografar(texto1);
        var hash2 = _service.Criptografar(texto2);

        Xunit.Assert.NotEqual(hash1, hash2);
    }

        [Fact]
        public void When_TentarCriptografarNulo_Then_DeveLancarErro()
        {
            string textoInvalido = null;

            // Se o sistema NÃO der erro, o teste falha (fica vermelho).
            Xunit.Assert.Throws<ArgumentNullException>(() => _service.Criptografar(textoInvalido));
        }
    }
}
