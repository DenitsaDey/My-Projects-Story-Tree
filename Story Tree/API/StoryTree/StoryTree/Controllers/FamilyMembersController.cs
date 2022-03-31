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

        //Get All Relatives
        [HttpGet]
        [Route("{profileId:}")]
        public IActionResult GetAllProfiles([FromRoute] string profileId)
        {
            var familyMembers = this.familymembersService.GetAllMyMembers(profileId);
            return Ok(familyMembers);
        }

        //Get Details about a relative
        [HttpGet]
        [Route("{profileId:}/{relativeId:}")]
        public IActionResult GetMemberDetails([FromRoute] string profileId, [FromRoute] string relativeId)
        {
            var relativeDetails = this.familymembersService.GetById(profileId, relativeId);
            if (relativeDetails != null)
            {
                return Ok(relativeDetails);
            }

            return NotFound("The profile could not be found!");

        }
    }
}
