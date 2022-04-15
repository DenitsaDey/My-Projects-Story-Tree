namespace StoryTree.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class FamilyMemberViewModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string RelationToMe { get; set; }

        public string Partner { get; set; }

        public string Parent { get; set; }

        public string ProfilePicSrc { get; set; }

        public string ProfilePicName { get; set; }
    }
}
