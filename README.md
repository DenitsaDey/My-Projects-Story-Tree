![](https://res.cloudinary.com/doh2fp7hz/image/upload/v1649393712/story_tree_negative-removebg-preview_cropped_mbctjn.png)


StoryTree is created as a platform that allows users to effortlessly build their family tree and stay on track with the pictures that their family members share .

This is my defense project for Angular Course at [SoftUni](https://softuni.org). (Mar-Apr 2022)

## Table of Contents
1. [Overview](https://github.com/DenitsaDey/My-Projects-Story-Tree#overview)
2. [Built With](https://github.com/DenitsaDey/My-Projects-Story-Tree#built-with)
3. [Application Configurations](https://github.com/DenitsaDey/My-Projects-Story-Tree#application-configurations)
4. [Screenshots](https://github.com/DenitsaDey/My-Projects-Story-Tree#screenshots)
5. [Acknowledgements](https://github.com/DenitsaDey/My-Projects-Story-Tree#screenshots#acknowledgements)

## :pencil2: Overview
&nbsp;&nbsp;&nbsp;&nbsp;**StoryTree** is a web application that connects user with their family members. It has the following functionality:

- Guest Users can: 
  - see the welcome page.
  - view the about information.
  - create profile from the register page.
- Logged Users can:
  - build their family tree by adding family members from the add member page.
  - if a member with this name already exists in the database and their shareInfo property is true, 
  the user that has linked that member can see the Details button and use it to view their uploaded pictures
  - a member is linked to the tree via their parent property.
  - users can update information about their profiles, such as adding profile picture, updating birthday using interactive datepicker, changing current residence location and uploading pictures.
  - users can update information about family members only if they are not linked with already existing profiles of other users.

## :hammer: Built With

- Angular
- ASP.NET WEB API
- @auth0/angular-jwt: JSON Web Token helper library for Angular
- RxJS: library for reactive programming using Observables
- Routing and Router Guards 
- Authentication
- Data Validation, both Client-side and Server-side
- Structural Directives
- Template-driven Forms (two-way binding)
- Reactive Forms
- Auth Interceptor
- Date Pipe
- GoJS with Angular for building the family tree as a Basic OrgChart
- Dependency Injection


## :gear: Application Configurations

### Seeding sample data
would happen once you run the application, including Test Accounts:
  - Main User: user@member.com / password: 123456
  - User's Partner: partner@member.com / password: 123456

## Screenshots

### Home Page

TODO

### Family Tree

TODO
### Add Member 

TODO
### My Profile

TODO

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

#### Using materials developed during lectures and workshops by:
- [Georgi Stoimenov](https://github.com/Gesh4o/angular-course-2022-march-live)

## :v: Show your opinion

Give a :star: if you like this project!
