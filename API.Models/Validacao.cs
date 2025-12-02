using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Models
{
    public class Validacao
    {
        public Validacao()
        {
        }
        [JsonIgnore]
        public int Id { get; set; }
        public DateTime Data_hora { get; set; }
        public string Local_validacao { get; set; }
        public string Status_validacao { get; set; }
        public string Tipo_validacao { get; set; }
    }
}
