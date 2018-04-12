
# IST 411 Checkpoint 2

## Project Plan
**✓Checkpoint 2:**  
 ✓ User accounts are tied to database
✓ Login modal prompts user to login/create account before being able to make changes to canvas
 ✓ Additional canvas features such as lines and shapes can be used to draw


![Firebase DB](https://image.ibb.co/gzyywn/db.png)
When a user logs in via the Google sign-in button, their profile information is written to the Google Firebase Database.

Not only is this data persistent, it checks for existing User Ids before writing - thus, only new users are saved to the database. Additionally, if an existing user changes his/her Google account *username* or *profile_picture*, these changes will be updated on their next sign-in to the generative canvas.


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

## Completed:
**✓ Checkpoint 1:**  
✓ On the homepage, the canvas is fully operational and its features are
   implemented - user can draw and use canvas to their liking.  Timeouts
   are not implemented.
