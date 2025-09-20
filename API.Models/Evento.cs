using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
    public class Evento
    {
        public Evento()
        {

        }
        public int Id { get; set; }
        public string? Nome { get; set; }
        public DateTime Data_Evento { get; set; }
        public virtual Localizacao? Localizacao_ { get; set; }
        public string? UrlBanner { get; set; }
        public int Capacidade_Max { get; set; }
        public DateTime Horario_Inicio { get; set; }
        public DateTime Horario_Final { get; set; }
    }
}
