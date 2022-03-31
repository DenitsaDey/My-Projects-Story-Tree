namespace StoryTree.Data.Seeding.CustomSeeding
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class RelationLinksSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (!dbContext.Profiles.Any())
            {
                return;
            }

            AddLinks(dbContext, "Daniela Dess", "Alexander Dess", "Severina Milan", "Domnic Milan");
            AddLinks(dbContext, "Alexander Dess", "Daniela Dess", null, null);
            AddLinks(dbContext, "Ian Vel", "Vivian Vel", null, null);
            AddLinks(dbContext, "Vivian Vel", "Ian Vel", "Severina Milan", "Domnic Milan");
            AddLinks(dbContext, "Severina Milan", "Domnic Milan", "Velina Vouche", null);
            AddLinks(dbContext, "Domnic Milan", "Severina Milan", "Stella Milan", null);
            AddLinks(dbContext, "Sonya Dess", null, "Daniela Dess", "Alexander Dess");
            AddLinks(dbContext, "Dario Dess", null, "Daniela Dess", "Alexander Dess");
            AddLinks(dbContext, "Stoil Vouche", null, "Velina Vouche", null);
            AddLinks(dbContext, "Nadine Milan", null, "Stella Milan", null);
            AddLinks(dbContext, "Natalie Stoic", null, "Nadine Milan", null);
            AddLinks(dbContext, "Simone Stoic", null, "Nadine Milan", null);
            AddLinks(dbContext, "Michael Vel", null, "Vivian Vel", "Ian Vel");
            AddLinks(dbContext, "Bryan Vel", null, "Vivian Vel", "Ian Vel");

            await dbContext.SaveChangesAsync();

        }

        private static void AddLinks(
            ApplicationDbContext dbContext,
            string memberName,
            string partnerName,
            string parent1,
            string parent2)

        {
            var currentMember = dbContext.Profiles.Where(x => x.Name == memberName).FirstOrDefault();
            if(partnerName != null) { 
            currentMember.PartnerId = dbContext.Profiles.Where(x => x.Name == partnerName).FirstOrDefault().Id;
            }
            if(parent1 != null)
            {

            currentMember.Parent1Id = dbContext.Profiles.Where(x => x.Name == parent1).FirstOrDefault().Id;
            }
            if(parent2 != null)
            {
            currentMember.Parent2Id = dbContext.Profiles.Where(x => x.Name == parent2).FirstOrDefault().Id;
            }

            
        }

    }
}
