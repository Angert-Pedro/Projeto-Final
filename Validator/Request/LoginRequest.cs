using API.Models;

namespace API.Validator.Request
{
    public class LoginRequest 
    {
        public string? Login { get; set; }
        public string? Senha { get; set; }
    }
}
