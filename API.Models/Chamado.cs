using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Chamado
    {
        public int Numero { get; set; }
        public string Assunto { get; set; }
        public string Descricao { get; set; }
        public DateTime Data_Solicitacao { get; set; }
        public List<string> Respostas { get; set; }
    }
}
