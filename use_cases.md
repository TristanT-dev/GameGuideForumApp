## Creating a Game Guide (Done by Kevin)

### Actor (User)

User with valid authorization to create game guides on the website. 

### Pre-conditions

The user must have created an account with the website and be logged into the website. Additionally, the user’s account must have sufficient permissions in order to create a game guide.

### Main Flow

1. The user clicks on the “Create Guide” tab of the website.
2. The system loads a game guide template page (form) for the user to fill in. For example, title, description, guide content, image upload, etc.
3. The user fills out the guide template (form).
4. The user clicks the submit button to finish creating their guide.
5. The system asks the user to confirm that they are finished.
6. After the user confirms they have finished their guide, the system will save the guide to the appropriate database. The page will also reload showing the user their completed guide.

### Alternate Flows

* User misses one of the mandatory fields in the guide template (form) and tries to submit as a completed guide (non draft):
  - After the user attempts step 4, an error message(s) will be triggered for the user to fill in mandatory fields.

* User chooses to save guide as a draft:
  - In step 4 the user selects to save their guide as a draft instead of a complete guide. The draft will be saved to the database but not be published to the website for others to view.

* If a user does not confirm a choice (save as draft or submit completed guide):
  - After step 5, the system will allow the user to continue creating their guide, this will send them back to step 3.

* If the game guide could not be saved successfully in step 6:
  - An appropriate error message will be displayed indicating that the game guide could not be saved.

* If the user tries to close or leave the page without saving their guide:
  - A browser notification window will display notifying them they have unsaved changes and if they wish to leave or cancel. If they select “cancel” they will remain on the page.

### Postconditions

After a user has successfully created a completed guide or guide draft, the database will be updated with the guide information. Completed guides will be published to the website for others to view and draft guides will only be viewable by their creators.

---

## Editing a Game Guide (Done by Kevin)

### Actor (User)

User who is the owner of the game guide to be edited. (This user is authorized for game guide creation / editing)

### Pre-conditions

The user must have created an account with the website and be logged into the website. Additionally, the user must be the owner of the game guide for which they want to edit, be it either a draft or a completed guide.

### Main Flow

1. The User clicks on the “Edit Guide” tab of the website.
2. The system loads a page displaying the user’s guides available for editing.
3. The user selects a guide to edit.
4. The system loads the guide template (form) so the user can make changes to any information.
5. Once finished editing, the user selects to either save a draft copy or overwrite the guide with changes.
6. The system asks the user to confirm their choice.
7. After the user confirms their choice the page reloads and displays either the draft copy of the guide or the newly updated guide. In either case the guide is saved to the database.

### Alternate Flows

* User misses one of the mandatory fields in the guide template (form) and tries to submit as an updated guide (non draft):
  - After the user attempts step 5, an error message(s) will be triggered for the user to fill in mandatory fields.

* User chooses to save guide as a draft:
  - In step 5 the user selects to save their guide as a draft instead of an updated guide. The draft will be saved to the database but will not overwrite the existing published guide.

* If a user does not confirm a choice (save as draft or submit updated guide):
  - After step 6, the system will allow the user to continue editing their guide, this will send them back to step 4.

* If the game guide could not be saved successfully in step 7:
  - An appropriate error message will be displayed indicating that the game guide could not be saved.

* If the user tries to close or leave the page without saving their guide:
  - A browser notification window will display notifying them they have unsaved changes and if they wish to leave or cancel.  If they select “cancel” they will remain on the page.

### Postconditions

After a user has successfully updated a guide or created an update draft, the database will be updated with the guide information. A completed and updated guide will overwrite its previous version and be published to the website for others to view. Guide updates that are only saved as a draft will not result in an update of the guide on the website (the old version will still be viewable by users).

---

## Posting a comment on a Game Guide (Done by Kevin)

### Actor (User)

User of the website who has an account.

### Pre-Conditions

The user must have created an account with the website and be logged in. The user must also be currently viewing a game guide page.

### Main Flow

1. The user selects the “add comment” button.
2. The system presents the user with UI (form / text box) to type their comment.
3. The user types their comment and clicks submit.
4. The system confirms if the user would like to submit
5. After the user confirms they would like to submit their comment, the system saves the comment in the database and reloads the page, displaying the user’s newly created comment.

### Alternate Flows

* If the user tries to close or leave the page without saving their comment:
  - A browser notification window will display notifying them they have unsaved changes and if they wish to leave or cancel.  If they select “cancel” they will remain on the page.

* On step 5, if the system detects forbidden language in the comment:
  - An error message will be displayed notifying the user that their comment violates rules of the website and that they need to modify their comment before it will be saved. User is sent back to step 3.

* On step 5, if the user’s comment could not be saved due to connection issues:
  - An appropriate error message will be displayed indicating that the comment could not be saved.

* On step 4, if the user does not confirm submission:
  - The user is brought back to step 3 and continues to write / edit their comment.

### Postconditions

After a user has successfully created a comment on a game guide the database will be updated appropriately. Furthermore, the created comment will also be visible by other users of the website when they visit the page for the associated game guide. 

---

## Deleting a comment on a Game Guide (Done by Kevin)

### Actor (User)

User of the website and owner of the comment to be deleted.

### Pre-Conditions

The user must have created an account with the website and be logged in. The user must also be currently viewing a game guide page that has their associated comment. The user must be the owner of the comment.

### Main Flow

1. User selects the delete comment button.
2. System asks for confirmation before deletion.
3. User submits confirmation.
4. System deletes the comment from the database.
5. System reloads webpage to show updated comment section.

### Alternate Flows

* If in step 4 there is a connection issue:
  - System informs user that deletion failed due to connection issue.

* If in step 2 the user cancels the deletion:
  - The use case ends, no further action by the system.

### Postconditions

The comment is deleted from the database and is no longer viewable on the webpage.

---

## Editing a comment on a Game Guide (Done by Kevin)

### Actor (User)

User of the website and owner of the comment to be edited.

### Pre-Conditions

The user must have created an account with the website and be logged in. The user must also be currently viewing a game guide page that has their associated comment. The user must be the owner of the comment.

### Main Flow

1. User selects the edit comment button.
2. System provides a UI (form / textbox) for the user to edit their comment.
3. The user types / edits their comment and clicks submit.
4. The system confirms if the user would like to submit.
5. After the user confirms they would like to submit their updated comment, the system updates the comment in the database and reloads the page, displaying the user’s newly updated comment.

### Alternate Flows

* If the user tries to close or leave the page without saving their comment: 
  - A browser notification window will display notifying them they have unsaved changes and if they wish to leave or cancel.  If they select “cancel” they will remain on the page.

* On step 5, if the system detects forbidden language in the comment:
  - An error message will be displayed notifying the user that their comment violates rules of the website and that they need to modify their comment before it will be saved. User is sent back to step 3.

* On step 5, if the user’s comment could not be saved due to connection issues:
  - An appropriate error message will be displayed indicating that the comment could not be saved.

* On step 4, if the user does not confirm submission:
  - The user is returned to step 3 and continues to write / edit their comment.

### Postconditions

After a user has successfully edited a comment on a game guide the database will be updated appropriately. Furthermore, the edited comment will also be visible by other users of the website when they visit the page for the associated game guide. 



