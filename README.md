# IST 411 Proposal
## Description
A collaborative canvas where new additions are permanent. Users will be able to paint the canvas however they wish. Any contribution will remain on the canvas permanently, but can still be drawn over by another user. To combat malicious intent, (e.g. painting the entire canvas in a single color), users will be able to draw for a certain amount of time before receiving a timeout, preventing them from painting further. Once the timeout expires, the user will be able to access the canvas again and resume painting. 

## Design
The creation of the canvas and subsequent mouse listeners will be handled with front-end technologies such as HTML5, CSS, Javascript, and jQuery. Frameworks that we have learned in class will be used as well, including Thymeleaf, Maven, and Spring MVC. Additionally, jCanvas, which is a jQuery plugin, could provide added functionality for the creation of canvas elements (such as circles, squares, arcs and lines). 

 A MySQL database will be used to store a list of users, and will help with handling the assigning of timeouts. Additionally, it may be used to store the current state of the canvas; which can be done by saving an image via the MySQL longblob type. However, since the storage of images is not ideal in a database and could pose problems, an alternative would be to store the canvas screenshot(s) in project file system instead. 
​    
![enter image description here](https://i.imgur.com/72DeUA9.png)      
​          
## Schedule     
**Checkpoint 1:** 
On the homepage, the canvas is fully operational and its features are implemented - user can draw and use canvas to their liking. Timeouts are not implemented.

**Checkpoint 2:** 
Create user classes and provide database functionality. An affiliated login page/modal will prompt the user to login or create an account before being able to change the canvas (it is still viewable, however). Added complexity on canvas with additional tools such as shape and line creation are apparent. 

**Checkpoint 3:** 
Timeout functionality is implemented. Users will have a timeout length and id assigned to their accounts, preventing them from making changes to the canvas if a timeout is active. Additionally, users will only be able to draw on the canvas for a certain amount of time before receiving a timeout.

**Final Project:** 
User can easily log in or create an account in order to start drawing. Canvas is fully operational with useful tools (brush, square, circle, line, etc). User is only able to draw for a defined timespan before receiving a timeout. Canvas is still viewable if the timeout status is currently active; however, changes cannot be made until timeout resolves. Additional features are apparent - user can save an image of the canvas, for example.
​    
## Justification
 The purpose of such a project would be to showcase a piece of artwork that is continuously evolving. It would be fascinating to observe a collection of contributions from multiple users and the interactions within - protecting your artwork if it has been tampered with, and expanding your own artwork, consuming others’ in the process if you so choose.

While brainstorming individual project ideas earlier in the semester, the basic canvas idea intrigued me. However, I wanted to take this idea a step further and create a playground where each contribution left a lasting mark. I honestly believe this will be a great way of showcasing my abilities, particularly by using my experience in front-end web development. As a design-oriented programmer, this canvas project would be a great way of demonstrating artistic expression within an intuitive and responsive final project. 




