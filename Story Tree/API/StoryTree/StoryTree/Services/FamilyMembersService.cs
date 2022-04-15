namespace StoryTree.Services
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using StoryTree.Data;
    using StoryTree.Models;
    using StoryTree.ViewModels;
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;

    public class FamilyMembersService : IFamilyMembersService
    {
        private readonly ApplicationDbContext data;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IWebHostEnvironment hostEnvironment;
        private readonly IProfilesService profilesService;

        public FamilyMembersService(ApplicationDbContext data,
            IHttpContextAccessor httpContextAccessor,
            IWebHostEnvironment hostEnvironment,
            IProfilesService profilesService)
        {
            this.data = data;
            this.httpContextAccessor = httpContextAccessor;
            this.hostEnvironment = hostEnvironment;
            this.profilesService = profilesService;
        }


        //DDEY: method is used to get all user's family members for his family tree in FamilyMembersController
        public IEnumerable<FamilyMemberViewModel> GetAllMyMembers(string profileId)
        {
            var family = new List<FamilyMemberViewModel>();

            var myFamilyMembers = this.data.Relations
                .Where(x => x.MemberId == profileId)
                .Select(x => new
                {
                    RelativeId = x.RelativeId,
                    Relation = x.Relation
                })
                .ToList();

            foreach (var member in myFamilyMembers)
            {
                var currentMember = this.data.Profiles
                                        .Where(p => p.Id == member.RelativeId)
                                        .Select(p => new FamilyMemberViewModel
                                        {
                                            Id = p.Id,
                                            Name = p.Name,
                                            Partner = p.Partner.Name,
                                            Parent = p.Parent1Id,
                                            RelationToMe = member.Relation,
                                            ProfilePicName = p.ProfilePicName,
                                            ProfilePicSrc = String.Format("{0}://{1}{2}/Images/{3}", this.httpContextAccessor.HttpContext.Request.Scheme, this.httpContextAccessor.HttpContext.Request.Host, this.httpContextAccessor.HttpContext.Request.PathBase, p.ProfilePicName),
                                        })
                                        .FirstOrDefault();

                family.Add(currentMember);
            }


            //DDEY: Adding also the current user to the tree
            var myProfile = this.data.Profiles
                .Where(p => p.Id == profileId)
                                        .Select(p => new FamilyMemberViewModel
                                        {
                                            Id = p.Id,
                                            Name = p.Name,
                                            Partner = p.Partner.Name,
                                            Parent = p.Parent1Id,
                                            RelationToMe = "Me",
                                            ProfilePicName = p.ProfilePicName,
                                            ProfilePicSrc = String.Format("{0}://{1}{2}/Images/{3}", this.httpContextAccessor.HttpContext.Request.Scheme, this.httpContextAccessor.HttpContext.Request.Host, this.httpContextAccessor.HttpContext.Request.PathBase, p.ProfilePicName),
                                        })
                                        .FirstOrDefault();

            family.Add(myProfile);

            return family;
        }


        //DDEY: method is used to get the details of individual family member in FamilyMembersController (from the details button in front-end)
        public FamilyMemberDetailsViewModel GetById(string relativeId)
        {
            var profileId = this.profilesService.GetCurrentUserId();
            var currentMember = this.data.Profiles
                                        .Where(p => p.Id == relativeId)
                                        .Select(p => new FamilyMemberDetailsViewModel
                                        {
                                            Id = p.Id,
                                            Name = p.Name,
                                            Email = p.Email,
                                            Birthday = p.Birthday.ToString(),
                                            Location = p.Location,
                                            RelationToMe = this.data.Relations
                                                            .Where(r => r.MemberId == profileId && r.RelativeId == relativeId)
                                                            .FirstOrDefault()
                                                            .Relation,
                                            Gallery = this.data.Images
                                                            .Where(i => i.MemberId == relativeId)
                                                            .OrderByDescending(i => i.CreatedOn)
                                                            .Select(i => new ImageViewModel
                                                                {
                                                                    ImageName = i.Name,
                                                                    ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", this.httpContextAccessor.HttpContext.Request.Scheme, this.httpContextAccessor.HttpContext.Request.Host, this.httpContextAccessor.HttpContext.Request.PathBase, i.Name),
                                                                    CreatedOn = i.CreatedOn.ToString(),
                                                                }).ToList(),
                                        })
                                        .FirstOrDefault();

            return currentMember;
        }

        public FamilyMemberDetailsViewModel GetByName(string relativeName)
        {
            var profileId = this.profilesService.GetCurrentUserId();
            var relativeId = this.data.Profiles.Where(p => p.Name == relativeName).FirstOrDefault()?.Id;
            var currentMember = this.data.Profiles
                                        .Where(p => p.Name == relativeName)
                                        .Select(p => new FamilyMemberDetailsViewModel
                                        {
                                            Id = p.Id,
                                            Name = p.Name,
                                            Email = p.Email,
                                            Birthday = p.Birthday.ToString(),
                                            Location = p.Location,
                                            RelationToMe = this.data.Relations
                                                            .Where(r => r.MemberId == profileId && r.RelativeId == relativeId)
                                                            .FirstOrDefault()
                                                            .Relation,
                                            Gallery = this.data.Images
                                                            .Where(i => i.MemberId == relativeId)
                                                            .OrderByDescending(i => i.CreatedOn)
                                                            .Select(i => new ImageViewModel
                                                            {
                                                                ImageName = i.Name,
                                                                ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", this.httpContextAccessor.HttpContext.Request.Scheme, this.httpContextAccessor.HttpContext.Request.Host, this.httpContextAccessor.HttpContext.Request.PathBase, i.Name),
                                                                CreatedOn = i.CreatedOn.ToString(),
                                                            }).ToList(),
                                        })
                                        .FirstOrDefault();

            return currentMember;
        }

        //DDEY: method is used to register relaive in the profiles controller
        public void CreateRelative(FamilyMemberInputModel input, string memberId)
        {
            //DDEY: TODO: to add condition && p.shareInfo == true
            var memberToBeAdded = this.data.Profiles.Where(p => p.Name == input.Name).FirstOrDefault();
            if (memberToBeAdded == null)
            {
                var newMember = new Profile
                {
                    Name = input.Name,

                };

                this.data.Profiles.Add(newMember);
                this.data.SaveChanges();
                memberToBeAdded = newMember;
            }

            memberToBeAdded.PartnerId = (input.PartnerId != null) ? input.PartnerId : null;
            memberToBeAdded.Parent1Id = (input.Parent1Id != null) ? input.Parent1Id : null;
            memberToBeAdded.Parent2Id = (input.Parent2Id != null) ? input.Parent2Id : null;

            bool relationExists = this.data.Relations
                .Any(r => r.MemberId == memberId && r.RelativeId == memberToBeAdded.Id);
            
            if (!relationExists)
            {
                var newRelation = new RelationToMe
                {
                    MemberId = memberId,
                    RelativeId = memberToBeAdded.Id,
                    Relation = input.RelationToMe
                };
                this.data.Relations.Add(newRelation);
                this.data.SaveChanges();
            }



        }
    }
}
