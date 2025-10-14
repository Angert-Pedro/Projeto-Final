using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Criptografia
{
    public class Token
    {
        // Use a secure, 256-bit key (32 bytes) for HMAC-SHA256
        private const string SecretKey = "WIfd3ps136m1MEL+gV53l6qRVcO3vh6vTT8lSlcrGyqmEz1yWXa6q2rctEwUhi==";

        public string GenerateToken(string username, int expireMinutes)
        {
            var symmetricKey = Convert.FromBase64String(SecretKey);
            var tokenHandler = new JwtSecurityTokenHandler();
            var now = DateTime.UtcNow;

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = now.AddMinutes(expireMinutes),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(symmetricKey),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(securityToken);
        }

        public bool ValidarToken(string username, string token)
        {
            var symmetricKey = Convert.FromBase64String(SecretKey);
            var tokenHandler = new JwtSecurityTokenHandler();

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(symmetricKey),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };

            try
            {
                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);
                var identity = principal.Identity as ClaimsIdentity;

                if (identity != null && identity.IsAuthenticated &&
                    identity.FindFirst(ClaimTypes.Name)?.Value == username)
                {
                    return true;
                }
                return false;
            }
            catch (SecurityTokenExpiredException)
            {
                // Token expirado
                return false;
            }
            catch
            {
                // Token inválido
                return false;
            }
        }
    }
}