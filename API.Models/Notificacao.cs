using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Notificacao
    {
        public Notificacao(string tipo, Destinatario destinatario, string mensagem)
        {
            this.Tipo = tipo;
            this.Destinatario = destinatario;
            this.Mensagem = mensagem;
        }
        public int Id { get; set; }
        public string Tipo { get; set; }
        public Destinatario Destinatario { get; set; }
        public string Mensagem { get; set; }
        public DateTime DataEnvio { get; set; }
    }
}
