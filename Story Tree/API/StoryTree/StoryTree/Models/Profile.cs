namespace StoryTree.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Threading.Tasks;

    public class Profile
    {
        [Key]
        [Required]
        public string Id { get; } = Guid.NewGuid().ToString();

        [Required]
        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string ProfilePicName { get; set; }

        public ICollection<Image> Images { get; set; } = new HashSet<Image>();

        public DateTime? Birthday { get; set; }

        public string Location { get; set; }
        
        public string PartnerId { get; set; }

        [ForeignKey("PartnerId")]
        public Profile Partner { get; set; }
        
        public virtual ICollection<RelationToMe> FamilyMembers { get; set; } = new HashSet<RelationToMe>();

        public string Parent1Id { get; set; }

        [ForeignKey("Parent1Id")]
        public Profile Parent1 { get; set; }

        public string Parent2Id { get; set; }

        [ForeignKey("Parent2Id")]
        public Profile Parent2 { get; set; }

    }
}
