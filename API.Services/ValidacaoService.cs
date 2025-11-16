using API.DAL;
using API.Models;
using System;
using System.Collections.Generic;

namespace API.Services
{
    public class ValidacaoService
    {
        private readonly DAL<Validacao> _dal;

        public ValidacaoService(DAL<Validacao> dal)
        {
            _dal = dal;
        }
    }
}
