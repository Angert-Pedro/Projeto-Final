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
        public DateTime data_hora { get; set; }
        public string local_validacao { get; set; }
        public string status_validacao { get; set; }
        public int ingresso_id { get; set; }
        public int validador_id { get; set; }
        public bool foi_bem_sucedida { get; set; }

    }
}
