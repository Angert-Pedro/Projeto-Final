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
        [JsonIgnore]
        public int Id { get; set; }
        public string? NomeEvento { get; set; }
        public DateTime Data { get; set; }
        public virtual Localizacao? Localizacao { get; set; }
        public string? UrlBanner { get; set; }
        public int QuantidadeIngressos { get; set; }
        public DateTime HorarioInicio { get; set; }
        public DateTime HorarioFinal { get; set; }
    }
}
