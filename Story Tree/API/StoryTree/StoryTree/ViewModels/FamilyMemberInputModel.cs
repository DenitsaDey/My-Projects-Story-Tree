namespace StoryTree.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class FamilyMemberInputModel
    {
        public string Name { get; set; }

        public string RelationToMe { get; set; }

        public string PartnerId { get; set; }

        public string Parent1Id { get; set; }

        public string Parent2Id { get; set; }
    }
}
