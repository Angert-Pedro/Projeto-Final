using Xunit;
using API.Criptografia;

namespace API.TesteAutomatizadoCriptografia
{
    public class TokenTests
    {
        private readonly Token _tokenService;

        public TokenTests()
        {
            _tokenService = new Token();
        }

        [Fact]
        public void When_GerarToken_Then_RetornaStringJwtValida()
        {
            // Arrange
            string usuario = "usuarioTeste";
            int tempoExpiracao = 60; 

            // Act
            string token = _tokenService.GenerateToken(usuario, tempoExpiracao);

            // Assert
            Xunit.Assert.NotNull(token);
            Xunit.Assert.NotEmpty(token);
            Xunit.Assert.Equal(2, token.Count(c => c == '.'));
        }

        [Fact]
        public void When_ValidarTokenCorreto_Then_RetornaTrue()
        {
            // Arrange
            string usuario = "admin";
            string tokenValido = _tokenService.GenerateToken(usuario, 60);

            // Act
            bool resultado = _tokenService.ValidarToken(usuario, tokenValido);

            // Assert
            Xunit.Assert.True(resultado);
        }

        [Fact]
        public void When_ValidarTokenDeOutroUsuario_Then_RetornaFalse()
        {
            // Arrange
            string usuarioA = "joao";
            string usuarioB = "maria";

            string tokenDoJoao = _tokenService.GenerateToken(usuarioA, 60);

            // Act
            bool resultado = _tokenService.ValidarToken(usuarioB, tokenDoJoao);

            // Assert
            Xunit.Assert.False(resultado);
        }

        [Fact]
        public void When_ValidarTokenInvalido_Then_RetornaFalse()
        {
            // Arrange
            string usuario = "admin";
            string tokenLixo = "token.totalmente.invalido";

            // Act
            bool resultado = _tokenService.ValidarToken(usuario, tokenLixo);

            // Assert
            Xunit.Assert.False(resultado);
        }
    }
}