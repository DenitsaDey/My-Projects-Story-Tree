namespace StoryTree.Data.Seeding.CustomSeeding
{
    using StoryTree.Models;
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;

    public class ProfilesSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (dbContext.Profiles.Any())
            {
                return;
            }

            var profiles = new List<Profile>();

            //main user profile
            AddNewProfile(
                profiles,
                "Daniela Dess",
                "12.12.1989",
                "Doha",
                "user@member.com",
                "123456"
                );

            //user's partner profile
            AddNewProfile(
               profiles,
               "Alexander Dess",
               "27.05.1977",
               "Doha",
               "partner@member.com",
               "123456"
               );

            //other members profiles
           AddNewProfile(
               profiles,
               "Stella Milan",
               "08.12.1938",
               "Ruse"
               );

             AddNewProfile(
               profiles,
               "Domnic Milan",
               "28.10.1960",
               "Ruse"
               );

            AddNewProfile(
               profiles,
               "Severina Milan",
               "07.05.1960",
               "Ruse"
               );

            AddNewProfile(
               profiles,
               "Nadine Milan",
               "02.01.1964",
               "Veliko Tarnovo"
               );

            AddNewProfile(
               profiles,
               "Simone Stoic",
               "22.04.2000",
               "Veliko Tarnovo"
               );

            AddNewProfile(
               profiles,
               "Natalie Stoic",
               "10.01.1991",
               "Ruse"
               );

            AddNewProfile(
               profiles,
               "Dario Dess",
               "06.06.2020",
               "Doha"
               );

            AddNewProfile(
               profiles,
               "Sonya Dess",
               "21.09.2018",
               "Doha"
               );

            AddNewProfile(
               profiles,
               "Michael Vel",
               "29.08.2013",
               "Plovdiv"
               );

            AddNewProfile(
               profiles,
               "Bryan Vel",
               "23.02.2016",
               "Plovdiv"
               );

            AddNewProfile(
               profiles,
               "Vivian Vel",
               "25.02.1992",
               "Plovdiv"
               );

            AddNewProfile(
               profiles,
               "Ian Vel",
               "10.07.1991",
               "Plovdiv"
               );

            AddNewProfile(
               profiles,
               "Velina Vouche",
               "20.10.1932",
               "Lion"
               );


            AddNewProfile(
               profiles,
               "Stoil Vouche",
               "15.04.1955",
               "Lion"
               );

            await dbContext.Profiles.AddRangeAsync(profiles);
            dbContext.SaveChanges();
        }

        //first we add static profiles and later we add the linked relations to other profiles as the id is needed for that
        private static void AddNewProfile(
            List<Profile> profiles,
            string name,
            string birthday,
            string location,
            string email="",
            string password="")//placed here only for demo purposes
            
        {
            var parsedBirthday = DateTime.ParseExact(birthday, "dd.MM.yyyy", CultureInfo.InvariantCulture);

            var profile = new Profile
            {
                Name = name,
                Email = email,
                Password = password,
                Birthday = parsedBirthday,
                Location = location
            };

            profiles.Add(profile);
        }
    }
}
