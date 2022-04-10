namespace StoryTree.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using StoryTree.Models;
    using StoryTree.Services;
    using StoryTree.ViewModels;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/[controller]")]
    public class ProfilesController : ControllerBase
    {
        private readonly IProfilesService profilesService;

        public ProfilesController(IProfilesService profilesService)
        {
            this.profilesService = profilesService;
        }

        //Get All Profiles
        [HttpGet]
        public IActionResult GetAllProfiles()
        {
            var profiles = this.profilesService.GetAll();
            return Ok(profiles);
        }

        //Get a sigle profile
        [HttpGet]
        [Route("{id:}")]
        [ActionName("GetProfile")]
        public IActionResult GetProfile([FromRoute] string id)
        {
            //var id = this.profilesService.GetCurrentUserId();
            var profile = this.profilesService.GetById(id);
            if (profile != null)
            {
                return Ok(profile);
            }

            return NotFound("The profile could not be found!");
        }

        [HttpGet]
        [Route("user")]
        public IActionResult GetUser()
        {
            var id = this.profilesService.GetCurrentUserId();
            var profile = this.profilesService.GetById(id);
            if (profile != null)
            {
                return Ok(profile);
            }

            return NotFound("The profile could not be found!");
        }

        //Update a profile
        [HttpPost]
        [Route("{id:}")]
        public IActionResult UpdateProfile([FromRoute] string id, [FromBody] ProfileInputModel input)
        {
            if(!this.profilesService.UpdateProfile(input, id))
            {
                return Ok();
            }

            return NotFound("Profile not found.");
        }

        //Delete a profile
        [HttpDelete]
        [Route("{id:}")]
        public IActionResult UpdateProfile([FromRoute] string id)
        {
            if (!this.profilesService.DeleteProfile(id))
            {
                return Ok();
            }

            return NotFound("Profile not found.");
        }
    }
}
