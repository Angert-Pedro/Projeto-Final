using API.DAL;
using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class BaseService<T> where T : class
    {
        protected readonly DAL<T> _dal;

        public BaseService(DAL<T> dal)
        {
            _dal = dal;
        }

        public IEnumerable<T> Listar()
        {
            return _dal.listar();
        }
    }
}
