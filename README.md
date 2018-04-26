
# IST 411 Checkpoint 3

## Project Plan
**✓Checkpoint 3:**  
 ✓ Users can draw for a certain amount of time before receiving a timeout (which is assigned to their account)
 ✓ Timeout prevents user from drawing on the canvas
 ✓ Canvas is persistent, drawings are now permanent

Timeouts are handled via Firebase, and is tied to each user. It is in this manner that timeouts delivered are persistent; meaning, if a user were to close the browser during a timeout, they would have to wait for it to finish on their next Google sign-in.

## Next Steps
**Final Project:**  
User can easily log in or create an account in order to start drawing. Canvas is fully operational with useful tools (brush, square, circle, line, etc). User is only able to draw for a defined timespan before receiving a timeout. Canvas is still viewable if the timeout status is currently active; however, changes cannot be made until timeout resolves. Additional features are apparent - user can save an image of the canvas, for example.
**Additional features based on proposal feedback:**
Canvas supports multiple users, as in multiple users can interact with the canvas at the same time.

## Completed:
**✓ Checkpoint 1:**  
✓ On the homepage, the canvas is fully operational and its features are
   implemented - user can draw and use canvas to their liking.  Timeouts
   are not implemented.
   
   **✓Checkpoint 2:**  
 ✓ User accounts are tied to database
✓ Login modal prompts user to login/create account before being able to make changes to canvas
 ✓ Additional canvas features such as lines and shapes can be used to draw
