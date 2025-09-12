using API.DAL;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class EventoService : BaseService<Evento>
    {
        private readonly DAL<Evento> _dal;
        public EventoService(DAL<Evento> dal) : base(dal){
            _dal = dal;
        }
    }
}
