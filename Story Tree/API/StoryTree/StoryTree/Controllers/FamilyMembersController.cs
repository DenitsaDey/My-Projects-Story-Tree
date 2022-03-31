namespace StoryTree.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using StoryTree.Services;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/[controller]")]
    public class FamilyMembersController : ControllerBase
    {
        private readonly IFamilyMembersService familymembersService;

        public FamilyMembersController(IFamilyMembersService familymembersService)
        {
            this.familymembersService = familymembersService;
        }

        //Get All Members
        [HttpGet]
        [Route("{id:}")]
        public IActionResult GetAllProfiles([FromRoute] string id)
        {
            var familyMembers = this.familymembersService.GetAllMyMembers(id);
            return Ok(familyMembers);
        }
    }
}
