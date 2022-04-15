namespace StoryTree.Services
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;
    using StoryTree.Data;
    using StoryTree.Models;
    using StoryTree.ViewModels;
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public class ProfilesService : IProfilesService
    {

        private readonly ApplicationDbContext data;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IWebHostEnvironment hostEnvironment;

        public ProfilesService(ApplicationDbContext data,
            IHttpContextAccessor httpContextAccessor,
            IWebHostEnvironment hostEnvironment)
        {
            this.data = data;
            this.httpContextAccessor = httpContextAccessor;
            this.hostEnvironment = hostEnvironment;
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

        ////DDEY: TODO - get all, but related to the current user
        //public IEnumerable<ProfileViewModel> GetAll()
        //{
        //    var profiles = this.data.Profiles
        //        .Select(p => new ProfileViewModel
        //        {
        //            Id = p.Id,
        //            Name = p.Name,
        //            Email = p.Email,
        //            Birthday = p.Birthday.ToString(),
        //            Location = p.Location,
        //            Partner = this.data.Profiles.Where(x => x.Id == p.Partner.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
        //            Parent1 = this.data.Profiles.Where(x => x.Id == p.Parent1.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
        //            Parent2 = this.data.Profiles.Where(x => x.Id == p.Parent2.Id).Select(pr => new UserViewModel { Id = pr.Id, Name = pr.Name, Email = pr.Email }).FirstOrDefault(),
        //            FamilyMembersCount = this.data.Relations.Where(r => r.MemberId == p.Id).Count(),
        //            RelationToMe = "",
        //            ProfilePicName = p.ProfilePicName,
        //            ProfilePicSrc = String.Format("{0}://{1}{2}/Images/{3}", this.httpContextAccessor.HttpContext.Request.Scheme, this.httpContextAccessor.HttpContext.Request.Host, this.httpContextAccessor.HttpContext.Request.PathBase, p.ProfilePicName),
        //        })
        //        .ToList();

        //    return profiles;
        //}

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
                                        ProfilePicName = p.ProfilePicName,
                                        ProfilePicSrc = String.Format("{0}://{1}{2}/Images/{3}", this.httpContextAccessor.HttpContext.Request.Scheme, this.httpContextAccessor.HttpContext.Request.Host, this.httpContextAccessor.HttpContext.Request.PathBase, p.ProfilePicName),
                                        Gallery = this.data.Images.Where(i => i.MemberId == p.Id)
                                                        .OrderByDescending(i => i.CreatedOn)
                                                        .Select(i => new ImageViewModel
                                                        {
                                                            ImageName = i.Name,
                                                            ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", this.httpContextAccessor.HttpContext.Request.Scheme, this.httpContextAccessor.HttpContext.Request.Host, this.httpContextAccessor.HttpContext.Request.PathBase, i.Name),
                                                            CreatedOn = i.CreatedOn.ToString(),
                                                        }).ToList(),
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
                    ProfilePicName = p.ProfilePicName,
                    ProfilePicSrc = String.Format("{0}://{1}{2}/Images/{3}", this.httpContextAccessor.HttpContext.Request.Scheme, this.httpContextAccessor.HttpContext.Request.Host, this.httpContextAccessor.HttpContext.Request.PathBase, p.ProfilePicName),
                    Gallery = this.data.Images.Where(i => i.MemberId == p.Id)
                                                        .OrderByDescending(i => i.CreatedOn)
                                                        .Select(i => new ImageViewModel
                                                        {
                                                            ImageName = i.Name,
                                                            ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", this.httpContextAccessor.HttpContext.Request.Scheme, this.httpContextAccessor.HttpContext.Request.Host, this.httpContextAccessor.HttpContext.Request.PathBase, i.Name),
                                                            CreatedOn = i.CreatedOn.ToString(),
                                                        })
                                                        .ToList(),
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
            currentProfile.Location = input.Location;
            currentProfile.Partner = this.data.Profiles.Where(p => p.Name == input.PartnerName).FirstOrDefault();

            //DDEY: updating the profile picture
            if (input.ProfilePicture != null)
            {
                input.ImageName = SaveImage(input.ProfilePicture);
                currentProfile.ProfilePicName = input.ImageName;
            }

            //DDEY: adding new gallery pic to the images, from where by id the user can get their profiles collection
            var galleryPicId = "";
            if (input.newGalleryPicture != null)
            {
                input.NewGalleryPicture = SaveImage(input.newGalleryPicture);

                var newGalleryPic = new Image
                {
                    Name = input.NewGalleryPicture,
                    MemberId = id,
                    CreatedOn = DateTime.Now,
                };

                this.data.Images.Add(newGalleryPic);
                this.data.SaveChanges();
                galleryPicId = newGalleryPic.Id;
            }

            //DDEY: remove old partner relation and save the new partner
            var oldPartnerRelation = this.data.Relations.Where(r => r.MemberId == id && (r.Relation == "husband" || r.Relation == "wife")).FirstOrDefault();
            var typeOfRelation = oldPartnerRelation.Relation;
            this.data.Relations.Remove(oldPartnerRelation);
            this.data.SaveChanges();

            var newPartnerRelation = new RelationToMe { MemberId = id, RelativeId = currentProfile.Partner.Id, Relation = typeOfRelation };
            this.data.Relations.Add(newPartnerRelation);
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


        //DDEY: used for converting the input from the client from IFormFile to string
        public string SaveImage(IFormFile profilePicture)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(profilePicture.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(profilePicture.FileName);
            var imagePath = Path.Combine(this.hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                profilePicture.CopyTo(fileStream);
            }
            return imageName;
        }
    }
}
