namespace StoryTree.Data
{
    using Microsoft.EntityFrameworkCore;
    using StoryTree.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            :base(options)
        {
        }

        public DbSet<Profile> Profiles { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<RelationToMe> Relations { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Profile>()
                .HasKey(p => p.Id);

            builder.Entity<Profile>()
                .HasOne(p => p.Partner)
                .WithMany()
                .HasForeignKey(p => p.PartnerId);

            builder.Entity<Profile>()
               .HasOne(p => p.Parent1)
               .WithMany()
               .HasForeignKey(p => p.Parent1Id);

            builder.Entity<Profile>()
              .HasOne(p => p.Parent2)
              .WithMany()
              .HasForeignKey(p => p.Parent2Id);

            builder.Entity<RelationToMe>()
                .HasOne(r => r.Member)
                .WithMany(m => m.FamilyMembers)
                .HasForeignKey(r => r.MemberId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
