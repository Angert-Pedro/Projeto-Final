using System.Text;

namespace API.Criptografia
{
    public static class Config
    {
        internal static readonly byte[] Chave = Encoding.UTF8.GetBytes("API-Validator-8E");
        internal static readonly byte[] IV = Encoding.UTF8.GetBytes("API-Validator-2B");
    }
}