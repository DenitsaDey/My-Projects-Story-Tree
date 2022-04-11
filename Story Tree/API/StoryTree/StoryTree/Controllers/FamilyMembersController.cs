namespace StoryTree.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using StoryTree.Services;
    using StoryTree.ViewModels;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/[controller]")]
    public class FamilyMembersController : ControllerBase
    {
        private readonly IFamilyMembersService familymembersService;
        private readonly IProfilesService profilesService;

        public FamilyMembersController(
            IFamilyMembersService familymembersService,
            IProfilesService profilesService)
        {
            this.familymembersService = familymembersService;
            this.profilesService = profilesService;
        }

        //Get All Relatives
        [HttpGet]
        public IActionResult GetAllProfiles()
        {
            var profileId = this.profilesService.GetCurrentUserId();
            var familyMembers = this.familymembersService.GetAllMyMembers(profileId);
            return Ok(familyMembers);
        }

        //Get Details about a relative
        //TODO Authorise
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

        //Create a new user-relative relation
        [HttpPost]
        public IActionResult AddMemberRelation([FromBody] FamilyMemberInputModel input)
        {
            //DDEY TODO find how to pass the id from the jwt
            var memberId = "b8d7263c-a032-453e-94ec-6e5d99179aba";
            this.familymembersService.CreateRelative(input, memberId);

            
            return Ok();
        }

        
    }
}
