using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Destinatario
    {
        public Destinatario(string nome, string email)
        {
            this.Nome = nome;
            this.Email = email;
        }
        public string Nome { get; set; }
        public string Email { get; set; }
    }
}
