namespace StoryTree.ViewModels
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class FamilyMemberDetailsViewModel : UserViewModel
    {
        public string Birthday { get; set; }

        public string Location { get; set; }

        public string RelationToMe { get; set; }

        public string Partner { get; set; }

        public ICollection<ImageViewModel> Gallery { get; set; }
    }
}
