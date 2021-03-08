# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.0.9] - 2021-03-08

### **Added**
- Created a branch [devt3](https://github.com/SenecaCollegeBTSProjects/Group_20/tree/devt3) from master by [@tristant-dev](https://github.com/tristant-dev)
### **Changed**
- Front-end HTML and Typescript to accurately display API CRUD operations

## [0.0.8] - 2021-02-22


### **Added**
- Added GuideComments collection on mongoDB 
### **Changed**

#### Web API
- Update the guideCommentSchema to reflect accurate fields
- Updated server.js & manager.js 

#### Angular App
- Updated data-model-manager.ts & data-model-classes.ts with updated functions

## [0.0.7] - 2021-02-15

### **Added**

#### GameGuide Image functionality support using URLs (Author - Kevin [@sunworks-code](https://github.com/sunworks-code))
- Users can now add image URLs to their newly created game guides or existing game guides using the "Add Image" button
- Image support with URLs is also supported on the GameGuide edit page, users can clear their existing images and replace them with new ones
- Images added are displayed using a BootStrap carousel on the GameGuide detail page

## [0.0.6] - 2021-01-25


### **Added**

#### Forum Components for full list, adding a new thread, viewing a thread
- Created a branch [devT](https://github.com/SenecaCollegeBTSProjects/Group_20/tree/devT) from master by [TristanT-dev](https://github.com/TristanT-dev)
- Button to submit new forum thread
- HTML/TS for forums

#### Navbar Improvements (Author - Kevin [@sunworks-code](https://github.com/sunworks-code))
- The navbar now has a new button that can either display "login" or "logout" depending on if there is an active user
- The button can be used to go to the login page or logout

#### Home Page Improvements (Author - Kevin [@sunworks-code](https://github.com/sunworks-code))
- When a user logins the home page will now display a list of their guides and a welcome message
- If the user is not logged in the old page will display asking the user to either signin or register

### **Changed**

#### Protected Game Guide Create Component (Author - Kevin [@sunworks-code](https://github.com/sunworks-code))
- Refer to issue #[19](https://github.com/SenecaCollegeBTSProjects/Group_20/issues/19)
- Users who have not been authenticated (logged in and recieved a token) can no longer create game guides
- If trying to create a game guide without being authenticated, the user will be redirected to the login page

#### Protected Game Guide Edit Component (Author - Kevin [@sunworks-code](https://github.com/sunworks-code))
- Refer to issue #[19](https://github.com/SenecaCollegeBTSProjects/Group_20/issues/19)
- In order to edit a game guide the user must now be authenticated and be the author of that game guide
- The "edit game guide" button will only appear on the game guide detail view page if the user is authenicated and is the author 

## [0.0.5] - 2020-12-09

### **Added**
- Created a branch [sprint4final](https://github.com/SenecaCollegeBTSProjects/Group_20/tree/sprint4final) from master by [@sunworks-code](https://github.com/sunworks-code)

#### Game Guide Edit Component
- form for editing existing game guides

#### Data Model Manager Service
- logic to support Game Guide editing

### **Changed**

#### Updated Game Guide Details Component
- Added one-way binding property values to the HTML 
- Updated CSS component

## [0.0.4] - 2020-11-18

### **Added**
- Created a branch [sprint3working](https://github.com/SenecaCollegeBTSProjects/Group_20/tree/sprint3working) from master by [@sunworks-code](https://github.com/sunworks-code)
- Created a branch [Tdev](https://github.com/SenecaCollegeBTSProjects/Group_20/tree/Tdev) from master by [TristanT-dev](https://github.com/TristanT-dev)

#### Game Guide View Module
- Prototype HTML/CSS proof of concept for new game guide
#### Game Guide Create Component
- form for new game guide creation

####  Game Guide List Component
- button to create new game guide

#### Data Model & Data Model Manager Service
- logic to support Game Guide creation

### **Changed**
- migrated to bootstrap 4 from version 3.4
- navigation bar component to work with bootstrap 4


## [0.0.3] - 2020-10-16

### **Added**
- Created a branch [sprint2working](https://github.com/SenecaCollegeBTSProjects/Group_20/tree/sprint2working) from master by [@sunworks-code](https://github.com/sunworks-code)
#### Game Guide List component 
- search bar that finds game guide by short title
- displays all game guides in the database

#### Game Guide Detail component
- displays description and content 
#### Header component
#### Navigation Bar component
- routing to other components

### **Changed**
- data-class data-managaer.ts to reflect addition of new components
- changed home.html


## [0.0.2] - 2020-10-07

### **Changed**
- Failed login now returns an error message instead of generating an error. 

## [0.0.2] - 2020-09-30

### **Changed**
- Merged [webapiworking](https://github.com/SenecaCollegeBTSProjects/Group_20/tree/webapiworking/BTS530-web-api) into master.


## [0.0.1] - 2020-09-29

### **Added**
- Created a branch [webapiworking](https://github.com/SenecaCollegeBTSProjects/Group_20/tree/webapiworking/BTS530-web-api) from master by [@sunworks-code](https://github.com/sunworks-code) 
- Schemas for "Game Guide" feature (**msc-gameGuide.js**, **msc-guideComment.js**)
- Schemas for "Forum Thread" feature (**msc-thread.js**, **msc-threadPost.js**)
- A Schema for "User Account" informaton(**msc-userAccount.js**)
- **manager.js** and **server.js** for back end web service routing and operations.
- [MongoDB](https://cloud.mongodb.com/v2/5f6fa997b20a192654de510b#metrics/replicaSet/5f6fab7880c06236a17b03bd/explorer/GameWebsite/forumThreads/find) database and collections to store Game Guide, Forum Thread and User Account information.
- Basic Angular representation of login and registration.


### **Changed**
- Proper formatting for CHANGELOG
- Started versioning at 0.0.1 to help keep things up-to-date.
- Fix phrasing and spelling in **use_cases.md**.

## [0.0.0] - 2020-09-13

### **Added**
- CHANGELOG.md file 



