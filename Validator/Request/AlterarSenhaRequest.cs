namespace API.Validator.Request
{
    public class AlterarSenhaRequest
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string NovaSenha { get; set; }
    }
}
