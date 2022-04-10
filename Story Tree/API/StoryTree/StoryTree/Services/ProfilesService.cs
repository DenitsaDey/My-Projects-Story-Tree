namespace StoryTree.Services
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;
    using StoryTree.Data;
    using StoryTree.Models;
    using StoryTree.ViewModels;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public class ProfilesService : IProfilesService
    {
        private readonly ApplicationDbContext data;
        private readonly IHttpContextAccessor httpContextAccessor;

        public ProfilesService(ApplicationDbContext data,
            IHttpContextAccessor httpContextAccessor)
        {
            this.data = data;
            this.httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentUserId()
        {
            var identity = this.httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            //var identity = this.httpContextAccessor.HttpContext.Request.Headers.Where(h => h.Key == "jwt").FirstOrDefault().Value as ClaimsIdentity;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                var userClaimId = userClaims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                var currUserId = this.data.Profiles
                                .Where(p => p.Id == userClaimId)
                                .FirstOrDefault()?
                                .Id;

                if (currUserId != null)
                {
                    return currUserId;
                }
                return null;
            }

            return null;

        }

        public IEnumerable<ProfileViewModel> GetAll()
        {
            var profiles = this.data.Profiles
                .Select(p => new ProfileViewModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Email = p.Email,
                    Birthday = p.Birthday.ToString(),
                    Location = p.Location,
                    Partner = this.data.Profiles.Where(x => x.Id == p.Partner.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
                    Parent1 = this.data.Profiles.Where(x => x.Id == p.Parent1.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
                    Parent2 = this.data.Profiles.Where(x => x.Id == p.Parent2.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
                    FamilyMembersCount = this.data.Relations.Where(r => r.MemberId == p.Id).Count(),
                    RelationToMe = "",
                })
                .ToList();

            return profiles;
        }

        //DDEY: method is used for login in AuthController
        public ProfileViewModel GetUserProfile(string email, string password)
        {
            var currentUser = this.data.Profiles
                                    .Where(p => p.Email == email && p.Password == password)
                                    .Select(p => new ProfileViewModel
                                    {
                                        Id = p.Id,
                                        Name = p.Name,
                                        Email = p.Email,
                                        Birthday = p.Birthday.ToString(),
                                        Location = p.Location,
                                        Partner = this.data.Profiles.Where(x => x.Id == p.Partner.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
                                        Parent1 = this.data.Profiles.Where(x => x.Id == p.Parent1.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
                                        Parent2 = this.data.Profiles.Where(x => x.Id == p.Parent2.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
                                        FamilyMembersCount = this.data.Relations.Where(r => r.MemberId == p.Id).Count(),
                                        RelationToMe = "",
                                    })
                                    .FirstOrDefault();
            return currentUser;
        }

        //DDEY: method is used to get the user profile in ProfilesController
        public ProfileViewModel GetById(string id)
        {
            var profile = this.data.Profiles
                .Where(p => p.Id == id)
                .Select(p => new ProfileViewModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Email = p.Email,
                    Birthday = p.Birthday.ToString(),
                    Location = p.Location,
                    Partner = this.data.Profiles.Where(x => x.Id == p.Partner.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
                    Parent1 = this.data.Profiles.Where(x => x.Id == p.Parent1.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
                    Parent2 = this.data.Profiles.Where(x => x.Id == p.Parent2.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
                    FamilyMembersCount = this.data.Relations.Where(r => r.MemberId == id).Count(),
                    RelationToMe = this.data.Relations.Where(x => x.MemberId == id && x.RelativeId == id).FirstOrDefault().Relation,
                })
                .FirstOrDefault();
            return profile;
        }



        //DDEY: method is used for registration in auth controller
        public bool MemberExists(string email, string password)
        {
            return this.data.Profiles.Any(p => p.Email == email && p.Password == password);
        }


        //DDEY: method is used for registration in auth controller
        public bool EmailExists(string email)
        {
            return this.data.Profiles.Any(p => p.Email == email);
        }



        //DDEY: method is used for registering a new user
        public void RegisterProfile(RegisterInputModel input)
        {
            var newUser = new Profile
            {
                Name = input.Name,
                Email = input.Email,
                Password = input.Password
            };

            this.data.Profiles.Add(newUser);
            this.data.SaveChanges();
        }

        public bool UpdateProfile(ProfileInputModel input, string id)
        {
            var currentProfile = this.data.Profiles.Where(p => p.Id == id).FirstOrDefault();
            if (currentProfile == null)
            {
                return false;
            }

            currentProfile.Name = input.Name;
            currentProfile.Birthday = input.Birthday;
            currentProfile.Email = input.Email;
            currentProfile.Location = input.Location;
            currentProfile.PartnerId = this.data.Profiles.Where(p => p.Name == input.Partner).FirstOrDefault().Id;
            currentProfile.Parent1Id = this.data.Profiles.Where(p => p.Name == input.Parent1).FirstOrDefault().Id;
            currentProfile.Parent2Id = this.data.Profiles.Where(p => p.Name == input.Parent2).FirstOrDefault().Id;

            this.data.SaveChanges();

            return true;
        }

        public bool DeleteProfile(string id)
        {
            var currentProfile = this.data.Profiles.Where(p => p.Id == id).FirstOrDefault();
            if (currentProfile == null)
            {
                return false;
            }
            this.data.Profiles.Remove(currentProfile);
            this.data.SaveChanges();

            return true;
        }
    }
}
