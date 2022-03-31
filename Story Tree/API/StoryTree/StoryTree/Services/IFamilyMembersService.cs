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
    }
}
