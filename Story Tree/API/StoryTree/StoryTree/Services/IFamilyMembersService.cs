namespace StoryTree.Services
{
    using StoryTree.ViewModels;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IFamilyMembersService
    {
        IEnumerable<FamilyMemberViewModel> GetAllMyMembers(string profileId);

        FamilyMemberDetailsViewModel GetById(string relativeId);

        FamilyMemberDetailsViewModel GetByName(string relativeName);

        void CreateRelative(FamilyMemberInputModel input, string memberId);
    }
}
