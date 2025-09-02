using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Evento
    {
        public Evento()
        {

        }
        public int Id { get; set; }
        public string? NomeEvento { get; set; }
        public DateTime Data { get; set; }
        public virtual Localizacao? Local { get; set; }
        public int QuantidadeIngressos { get; set; }
        public DateTime HorarioInicio { get; set; }
        public DateTime HorarioFinal { get; set; }
    }
}
