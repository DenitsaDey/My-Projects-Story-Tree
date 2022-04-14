namespace StoryTree.Services
{
    using Microsoft.AspNetCore.Http;
    using StoryTree.Models;
    using StoryTree.ViewModels;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IProfilesService
    {
        string GetCurrentUserId();

        //IEnumerable<ProfileViewModel> GetAll();

        ProfileViewModel GetUserProfile(string email, string password);

        ProfileViewModel GetById(string id);

        bool MemberExists(string email, string password);

        bool EmailExists(string email);

        void RegisterProfile(RegisterInputModel input);

        bool UpdateProfile(ProfileInputModel input, string id);

        bool DeleteProfile(string id);

        string SaveImage(IFormFile profilePicture);
    }
}
