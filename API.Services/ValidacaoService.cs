using API.DAL;
using API.Models;
using API.Services.Interfaces;
using System;
using System.Collections.Generic;

namespace API.Services
{
    public class ValidacaoService : BaseService<Validacao>, IValidacaoService
    {
        private readonly DAL<Validacao> _dal;

        public ValidacaoService(DAL<Validacao> dal) : base(dal)
        {
            _dal = dal;
        }
    }
}
