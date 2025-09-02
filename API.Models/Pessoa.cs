using System.Text.Json.Serialization;

namespace API.Models
{
    public class Pessoa
    {
        public Pessoa()
        {
        }
        [JsonIgnore]
        public int Id { get; set; }
        public string Nome { get; set; } = "";
        public string Cpf { get; set; } = "";
        public string Email { get; set; } = "";
        public string Numero { get; set; } = "";
        public DateTime Data_Nasc { get; set; }
    }
}
