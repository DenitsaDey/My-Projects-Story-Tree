namespace StoryTree.Services
{
    using StoryTree.Data;
    using StoryTree.ViewModels;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class FamilyMembersService : IFamilyMembersService
    {
        private readonly ApplicationDbContext data;

        public FamilyMembersService(ApplicationDbContext data)
        {
            this.data = data;
        }

        public IEnumerable<FamilyMemberViewModel> GetAllMyMembers(string profileId)
        {
            var family = new List<FamilyMemberViewModel>();

            var myFamilyMembers = this.data.Relations
                .Where(x => x.MemberId == profileId)
                .Select(x => new
                {
                    RelativeId = x.RelativeId,
                    Relation = x.Relation
                });

            foreach (var member in myFamilyMembers)
            {
                var currentMember = this.data.Profiles
                                        .Where(p => p.Id == member.RelativeId)
                                        .Select(p => new FamilyMemberViewModel
                                        {
                                            Id = p.Id,
                                            Name = p.Name,
                                            Birthday = p.Birthday,
                                            Location = p.Location,
                                            PartnerId = p.PartnerId,
                                            Parent1Id = p.Parent1Id,
                                            Parent2Id = p.Parent2Id,
                                            RelationToMe = member.Relation
                                        })
                                        .FirstOrDefault();

                family.Add(currentMember);
            }

            return family;
        }

        public FamilyMemberViewModel GetById(string profileId, string relativeId)
        {
            var currentMember = this.data.Profiles
                                        .Where(p => p.Id == relativeId)
                                        .Select(p => new FamilyMemberViewModel
                                        {
                                            Id = p.Id,
                                            Name = p.Name,
                                            Birthday = p.Birthday,
                                            Location = p.Location,
                                            PartnerId = p.PartnerId,
                                            Parent1Id = p.Parent1Id,
                                            Parent2Id = p.Parent2Id,
                                            RelationToMe = this.data.Relations
                                                            .Where(r => r.MemberId == profileId && r.RelativeId == relativeId)
                                                            .FirstOrDefault()
                                                            .Relation
                                        })
                                        .FirstOrDefault();

            return currentMember;
        }
    }
}
