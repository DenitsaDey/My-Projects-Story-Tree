namespace StoryTree.Services
{
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

        public FamilyMembersService(ApplicationDbContext data)
        {
            this.data = data;
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
                                            PartnerId = p.PartnerId,
                                            Parent1Id = p.Parent1Id,
                                            Parent2Id = p.Parent2Id,
                                            RelationToMe = member.Relation
                                            //DDEY: TODO - to add options for profile pic and button Details if prop bool shareInfo is true
                                        })
                                        .FirstOrDefault();

                family.Add(currentMember);
            }

            return family;
        }


        //DDEY: method is used to get the details of individual family member in FamilyMembersController (from the details button in front-end)
        public FamilyMemberDetailsViewModel GetById(string profileId, string relativeId)
        {
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
                                                            .Relation
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
