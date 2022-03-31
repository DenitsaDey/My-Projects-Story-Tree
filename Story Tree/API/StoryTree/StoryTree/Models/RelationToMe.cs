namespace StoryTree.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Threading.Tasks;

    public class RelationToMe
    {
        [Key]
        [Required]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string MemberId { get; set; }

        [ForeignKey("MemberId")]
        public virtual Profile Member { get; set; }

        [Required]
        public string RelativeId { get; set; }

        [Required]
        public string Relation { get; set; }
    }
}
