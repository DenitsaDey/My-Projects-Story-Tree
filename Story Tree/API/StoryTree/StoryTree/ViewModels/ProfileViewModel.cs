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

        public string Birthday { get; set; }

        public string Location { get; set; }

        public string PartnerId { get; set; }

        public string Parent1Id { get; set; }

        public string Parent2Id { get; set; }

        public int FamilyMembersCount { get; set; }
    }
}
