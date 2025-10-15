using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Notificacao
    {
        public Notificacao() { }
        public Notificacao(string tipo, string destinatario, string mensagem, string token, Usuario usuario)
        {
            this.Tipo = tipo;
            this.Destinatario = destinatario;
            this.Mensagem = mensagem;
            this.Token = token;
            this.Usuario_ = usuario;
        }
        public int Id { get; set; }
        public string Tipo { get; set; }
        public string Destinatario { get; set; }
        public string Mensagem { get; set; }
        public DateTime Data_Envio { get; set; }
        public string Token { get; set; }
        public virtual Usuario Usuario_ { get; set; }
    }
}
