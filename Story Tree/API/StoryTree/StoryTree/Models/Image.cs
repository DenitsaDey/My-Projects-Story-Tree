namespace StoryTree.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Threading.Tasks;

    public class Image
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string Path { get; set; }

        public string MemberId { get; set; }

        public virtual Profile Member { get; set; }
    }
}
