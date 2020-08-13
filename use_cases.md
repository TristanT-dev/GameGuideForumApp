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

---

### Creating Forum Thread (Done by Tristan)

### Actor(User)
User with an account on the website.

### Pre-conditions
The member is logged on to the website.

### Main Flow
1. The member clicks on the “Discussion” tab in the navigation bar on the website
2. The system shows list of possible thread types the user can create(Specialized/specific, General)
3. The member clicks on the thread type they would like to create.
4. The system displays UI for thread creation as a Form(Title, text body, flair)
5. The member fills in the fields on the form.
6. The member clicks the “Submit” button to create a thread
7. The system automatically checks the contents of the thread to see if it contains anything that would be against the Terms of Service(words, turn of phrase detection, spam).
8. The system successfully saves the thread to the database.

### Alternate Flows
* If any of the fields in the form are not filled out:
  - After step 6, the system will inform the member that the thread cannot be created unless all fields are filled, submission will not be possible until satisfied 

* If the member attempts to close the tab or navigate away before clicking the “Submit” button:
  - The system will prevent the member from navigating away with a prompt to the member: 
“Changes have not been saved, are you sure you want to leave this page?”
  - The member will choose “Yes” to successfully navigate away or “No” to finish creating the thread.

* If the system determines the submission does not abide by the Terms of Service:
  - After Step 7, the system will automatically delete the thread and usher the member a warning about the contents they are allowed to post.

### Post-Conditions
After a member has successfully submitted a new thread, it will become available to view and comment on in the “new” section on the main forum page.

---

### Reporting a Forum Thread (Done by Tristan)

### Actor(User)
A user that has an activated account on the website.

### Pre-conditions
A member is logged on to the website and has navigated to the specific thread that is to be reported.

### Main Flow
1. The member clicks the “Report” button under the title of the thread.
2. The system loads the UI and displays all reasons for reporting that thread, (“It breaks ToS”, “Spam”, “Misinformation”, “Abusive and/or Harassment”, “Other”), as well as a “Cancel” button
3. The member selects an option to report and clicks the “Submit” button to send the submission to a mod for revision.
4. The system successfully sends the message to the member stating their submission has been sent, the system loads the UI to display options for “Blocking”  the original poster.
5. The member selects their option, the report UI disappears.

### Alternate Flow 
* If the user decides to click “Cancel”: 
  - At Step 2, The system will close the UI displaying report options.

* If the user selects “Other”:
  - At Step 2,  the system will create a textbox for the user to type in any other non-specified reason for the report Up to 200 characters max.  Will move on to Step 3 afterwards.

* If the member decides to block the Original Poster:
  - After Step 4, The original poster’s profile, comments, threads and guides will be invisible to the member.

### Post Conditions
After selecting the option for whether or not to block the original poster, the system redirects the member back to the Landing Page of the Forums tab.

---







