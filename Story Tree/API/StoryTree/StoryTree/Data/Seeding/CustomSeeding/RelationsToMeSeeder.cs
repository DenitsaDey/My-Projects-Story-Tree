namespace StoryTree.Data.Seeding.CustomSeeding
{
    using StoryTree.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class RelationsToMeSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (dbContext.Relations.Any())
            {
                return;
            }

            var relations = new List<RelationToMe>();

            var userId = dbContext.Profiles.Where(x => x.Email == "user@member.com").FirstOrDefault().Id;

            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Alexander Dess").FirstOrDefault().Id,
                Relation = "husband"
            });

            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Stella Milan").FirstOrDefault().Id,
                Relation = "grandma"
            });

            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Domnic Milan").FirstOrDefault().Id,
                Relation = "father"
            });

            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Severina Milan").FirstOrDefault().Id,
                Relation = "mother"
            });

            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Nadine Milan").FirstOrDefault().Id,
                Relation = "aunt"
            });

            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Simone Stoic").FirstOrDefault().Id,
                Relation = "cousin"
            });

            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Natalie Stoic").FirstOrDefault().Id,
                Relation = "cousin"
            });

            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Dario Dess").FirstOrDefault().Id,
                Relation = "son"
            });

            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Sonya Dess").FirstOrDefault().Id,
                Relation = "daughter"
            });

            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Michael Vel").FirstOrDefault().Id,
                Relation = "nephew"
            }); 
            
            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Bryan Vel").FirstOrDefault().Id,
                Relation = "nephew"
            }); 
            
            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Vivian Vel").FirstOrDefault().Id,
                Relation = "sister"
            }); 
            
            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Ian Vel").FirstOrDefault().Id,
                Relation = "brother-in-law"
            }); 
            
            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Velina Vouche").FirstOrDefault().Id,
                Relation = "grandma"
            });

            relations.Add(new RelationToMe
            {
                MemberId = userId,
                RelativeId = dbContext.Profiles.Where(x => x.Name == "Stoil Vouche").FirstOrDefault().Id,
                Relation = "uncle"
            });

            await dbContext.Relations.AddRangeAsync(relations);
            dbContext.SaveChanges();

            var user = dbContext.Profiles.Where(x => x.Email == "user@member.com").FirstOrDefault();

            user.FamilyMembers = dbContext.Relations
                .Where(x => x.MemberId == userId)
                .ToList();

            dbContext.SaveChanges();
        }
    }
}
