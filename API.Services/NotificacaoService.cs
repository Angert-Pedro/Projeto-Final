using API.DAL;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class NotificacaoService : BaseService<Notificacao>
    {
        private readonly DAL<Notificacao> _dal; 
        public IngressoService(DAL<Notificacao> dal) : base(dal){
            _dal = dal;
        }
    }
}
