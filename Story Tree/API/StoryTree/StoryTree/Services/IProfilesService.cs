namespace StoryTree.Services
{
    using StoryTree.Models;
    using StoryTree.ViewModels;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IProfilesService
    {
        IEnumerable<ProfileViewModel> GetAll();

        UserViewModel GetProfile(string email, string password);

        ProfileViewModel GetById(string id);

        string CreateMember(ProfileInputModel member);

        bool MemberExists(string email, string password);

        bool EmailExists(string email);

        void RegisterProfile(RegisterInputModel input);

        bool UpdateProfile(ProfileInputModel input, string id);

        bool DeleteProfile(string id);
    }
}
