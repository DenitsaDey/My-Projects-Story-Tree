namespace StoryTree.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class ProfileViewModel 
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Birthday { get; set; }

        public string Location { get; set; }

        public UserViewModel Partner { get; set; }

        public UserViewModel Parent1 { get; set; }

        public UserViewModel Parent2 { get; set; }

        public int FamilyMembersCount { get; set; }

        public string RelationToMe { get; set; }

        public string ProfilePicSrc { get; set; }

        public string ProfilePicName { get; set; }

        public ICollection<ImageViewModel> Gallery { get; set; }
    }
}
