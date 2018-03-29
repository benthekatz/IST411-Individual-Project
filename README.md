# IST 411 Checkpoint 1
## Clarification
The purpose of this section is to clarify the questions and concerns that were asked about the project proposal.

**Is there only one canvas at a time?**
Yes, the purpose of this project is to have a single, generative canvas. Users who access the website will essentially be interacting with the same canvas.

**Are you attempting to support as many users as there are?**
Discussed this idea of scalability briefly with Professor Reitter - while I would like to be able to accomodate as many potential users as there are, I believe a more reasonable goal within the bounds of this project deadline would be to accomodate, at most, a dozen users interacting with the same canvas.

**Can multiple users draw at the same time?**
This is a very good question and was not something I had considered during my initial stages of planning. After doing some research, I believe it to be something that can be accomplished later on in my project. I have reflected this by *adding* a requirement to the *Final Project* stage of my project.

**Are user accounts just for the ability to draw?**
In short, yes, but they provide more than that. Initially, this plan was established to prevent users from getting around timeouts - allowing them to draw continuously without penalty. Since a timeout is assigned to the account, the user would be unable to continue drawing. If it so happens that I find an easier method of handling timeouts for each artist, I will do so in lieu of a database of users. 

## Project Plan

**✓ Checkpoint 1:**  
✓ On the homepage, the canvas is fully operational and its features are
   implemented - user can draw and use canvas to their liking.  Timeouts
   are not implemented.


----------


**Checkpoint 2:**  
Create user classes and provide database functionality. An affiliated login page/modal will prompt the user to login or create an account before being able to change the canvas (it is still viewable, however). Added complexity on canvas with additional tools such as shape and line creation are apparent.

**Clarification:**
 - User accounts are tied to database
 - Login modal prompts user to login/create account before being able to make changes to canvas
 - Additional canvas features such as lines and shapes can be used to draw


----------


**Checkpoint 3:**  
Timeout functionality is implemented. Users will have a timeout length and id assigned to their accounts, preventing them from making changes to the canvas if a timeout is active. Additionally, users will only be able to draw on the canvas for a certain amount of time before receiving a timeout.

**Clarification:**
 - Users can draw for a certain amount of time before receiving a timeout (which is assigned to their account)
 - Timeout prevents user from drawing on the canvas
 - Canvas is persistent, drawings are now permanent

----------


**Final Project:**  
User can easily log in or create an account in order to start drawing. Canvas is fully operational with useful tools (brush, square, circle, line, etc). User is only able to draw for a defined timespan before receiving a timeout. Canvas is still viewable if the timeout status is currently active; however, changes cannot be made until timeout resolves. Additional features are apparent - user can save an image of the canvas, for example.
**Additional features based on proposal feedback:**
Canvas supports multiple users, as in multiple users can interact with the canvas at the same time.


----------


