using API.DAL;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class IngressoService : BaseService<Ingresso>
    {
        private readonly DAL<Ingresso> _dal;
        public IngressoService(DAL<Ingresso> dal) : base(dal){
            _dal = dal;
        }
    }
}
