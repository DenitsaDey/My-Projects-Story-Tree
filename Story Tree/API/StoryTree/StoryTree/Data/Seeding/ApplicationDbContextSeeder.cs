namespace StoryTree.Data.Seeding
{
    using Microsoft.Extensions.Logging;
    using StoryTree.Data.Seeding.CustomSeeding;
    using Microsoft.Extensions.DependencyInjection;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class ApplicationDbContextSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (dbContext == null)
            {
                throw new ArgumentNullException(nameof(dbContext));
            }

            if (serviceProvider == null)
            {
                throw new ArgumentNullException(nameof(serviceProvider));
            }

            var logger = serviceProvider.GetService<ILoggerFactory>().CreateLogger(typeof(ApplicationDbContextSeeder));

            var seeders = new List<ISeeder>
                          {
                              new ProfilesSeeder(),
                              new RelationsToMeSeeder(),
                              new RelationLinksSeeder()
                          };

            foreach (var seeder in seeders)
            {
                await seeder.SeedAsync(dbContext, serviceProvider);
                dbContext.SaveChanges();
                logger.LogInformation($"Seeder {seeder.GetType().Name} done.");
            }

        }
    }
}
