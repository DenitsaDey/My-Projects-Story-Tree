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

        //TODO check on the angular side in what format it will come
        public DateTime? Birthday { get; set; }

        //this would come as the name selected from a drop down
        public string Partner { get; set; }

        public string Parent1 { get; set; }

        public string Parent2 { get; set; }
    }
}
