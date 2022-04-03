namespace StoryTree.Services
{
    using Microsoft.EntityFrameworkCore;
    using StoryTree.Data;
    using StoryTree.Models;
    using StoryTree.ViewModels;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class ProfilesService : IProfilesService
    {
        private readonly ApplicationDbContext data;

        public ProfilesService(ApplicationDbContext data)
        {
            this.data = data;
        }

        public IEnumerable<ProfileViewModel> GetAll()
        {
            var profiles = this.data.Profiles
                .Select(p => new ProfileViewModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Birthday = p.Birthday,
                    Location = p.Location,
                    PartnerId = p.PartnerId,
                    Parent1Id = p.Parent1Id,
                    Parent2Id = p.Parent2Id
                })
                .ToList();

            return profiles;
        }

        public ProfileViewModel GetById(string id)
        {
            var profile = this.data.Profiles
                .Where(p => p.Id == id)
                .Select(p => new ProfileViewModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Birthday = p.Birthday,
                    Location = p.Location,
                    PartnerId = p.PartnerId,
                    Parent1Id = p.Parent1Id,
                    Parent2Id = p.Parent2Id
                })
                .FirstOrDefault();
            return profile;
        }

        public string CreateMember(ProfileInputModel input)
        {
            var profile = new Profile
            {
                Name = input.Name,
                Birthday = input.Birthday,
                Location = input.Location,
                PartnerId = this.data.Profiles.Where(p => p.Name == input.Partner).FirstOrDefault().Id,
                Parent1Id = this.data.Profiles.Where(p => p.Name == input.Parent1).FirstOrDefault().Id,
                Parent2Id = this.data.Profiles.Where(p => p.Name == input.Parent2).FirstOrDefault().Id,
            };

            this.data.Profiles.Add(profile);
            this.data.SaveChanges();

            return profile.Id;
        }

        public bool MemberExists(string email, string password)
        {
            return this.data.Profiles.Any(p => p.Email == email && p.Password == password);
        }

        public bool UpdateProfile(ProfileInputModel input, string id)
        {
            var currentProfile = this.data.Profiles.Where(p => p.Id == id).FirstOrDefault();
            if(currentProfile == null)
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
