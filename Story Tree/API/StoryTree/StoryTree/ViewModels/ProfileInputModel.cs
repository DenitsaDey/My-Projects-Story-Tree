namespace StoryTree.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class ProfileInputModel
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string Relation { get; set; }

        public string Location { get; set; }

        public string Birthday { get; set; }

        //this would come as the name selected from a drop down
        //public string PartnerName { get; set; }

        public UserViewModel Partner { get; set; }

        public UserViewModel Parent1 { get; set; }

        public UserViewModel Parent2 { get; set; }

        public int FamilyMembersCount { get; set; }

        public string RelationToMe { get; set; }
    }
}
