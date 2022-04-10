namespace StoryTree.Controllers
{
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;
    using StoryTree.Services;
    using StoryTree.ViewModels;
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IProfilesService profilesService;

        public AuthController(IProfilesService profilesService)
        {
            this.profilesService = profilesService;
        }


        [HttpPost]
        [Route("signin")]
        [EnableCors]
        public IActionResult Login([FromBody] LoginInputModel input)
        {
            
            if (input == null)
            {
                return BadRequest("Invalid client request");
            }

            if (this.profilesService.MemberExists(input.Email, input.Password))
            {
                var currentUser = this.profilesService.GetUserProfile(input.Email, input.Password);

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("storyTreeSecretKey@100")); //DDEY: for demo purpose, but best practice is the secret key to be stored in an environment viariable
                var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim> {
                    new Claim(JwtRegisteredClaimNames.Sub, currentUser.Id),
                    new Claim(ClaimTypes.Name, currentUser.Name),
                    new Claim(ClaimTypes.Email, currentUser.Email),
                    new Claim(ClaimTypes.NameIdentifier, currentUser.Id)
                    };

                var tokenOptions = new JwtSecurityToken(
                    issuer: "http://localhost:19986",
                    audience: "http://localhost:4200",
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: signingCredentials
                    );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                //HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                
                return Ok(new { Token = tokenString, User = currentUser });
                //return Ok(new { Id = currentUser.Id, Token = tokenString});
            }

            return NotFound("User not found");
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] RegisterInputModel input)
        {
            if (input == null)
            {
                return BadRequest("Invalid client request");
            }

            if(this.profilesService.MemberExists(input.Email, input.Password))
            {
                return BadRequest("User with this email and password already exists.");
            }

            if (this.profilesService.EmailExists(input.Email))
            {
                return BadRequest("User with this email is already registered.");
            }

            this.profilesService.RegisterProfile(input);
            return Ok();
        }
    }
}
