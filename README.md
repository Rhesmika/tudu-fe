# Tudu - Front End

Tudu is a task management website where users can catagorise, track and update their tasks.Tudu hopes to help users to bring digital organisation to their lives. 

The goal is to ensure users can:
- Signup/Login and view data that only they can see
- View all their boards
- View all their tasks
- Create Boards
- Create Tasks (and have them assigned to the board)
- Edit their Board name
- Edit and update their Task details
- Delete Boards
- Delete Tasks

The React App ensures that the user approaches a functional and easy to use website which has a clean appearance and a clean process to track their task progress. 
![amiresponsive-tudu](https://github.com/Rhesmika/tudu-fe/assets/100621349/c069c736-547b-474d-b1b3-dfb04b7f0b98)

### Design 
The design of the front end needed to be uncomplicated, but punchy. This was reflected in the font and colour choices. I created the design for the general layout, logo and some icons in Adobe Illustrator.

Logo & Favicon
![tudu_logo](https://github.com/Rhesmika/tudu-fe/assets/100621349/ad989d40-45e9-40cb-a98d-0a20f340e449)
![fav_icon](https://github.com/Rhesmika/tudu-fe/assets/100621349/d95cc350-86cd-4cd9-ace2-fc1f546224ff)

paperclips for task attachment
![uploaded](https://github.com/Rhesmika/tudu-fe/assets/100621349/2e0c2cd0-56b3-4d3a-8614-043c9862c5e9)
![upload](https://github.com/Rhesmika/tudu-fe/assets/100621349/5caf15e9-6b31-4f85-b778-53beb3e065f6)

Avatars for profiles
![default_user](https://github.com/Rhesmika/tudu-fe/assets/100621349/883dad42-28c1-406f-ac02-4fb9322cd7fd)
![default_team](https://github.com/Rhesmika/tudu-fe/assets/100621349/8a3f9be3-5ed7-47fe-b537-a9ab0aea816a)

Mock up
![no-data](https://github.com/Rhesmika/tudu-fe/assets/100621349/7158bad3-e461-4937-b942-066cbb6ff026)
![Untitled-1](https://github.com/Rhesmika/tudu-fe/assets/100621349/00bea532-ca16-4655-b9ad-f2d718530ba4)
<img width="520" alt="Screenshot 2023-09-24 at 23 58 34" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/455ff50b-57f3-43e7-8cf0-8ab135691167">
<img width="675" alt="Screenshot 2023-09-24 at 23 54 51" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/62b7731a-4c08-4a4d-b0ba-19936c0105bf">

I used Adobe Illustrator to put the mock-up together for this website. The layout of the page is intended to be very linear and clear. I created vector paperclips, the tudu log and the not found (I used an external image as a reference credited below). The Colours are intended to be clean and 'gender nutural'.

### Design Edits 
The design didn't include for features such as the search bars and dropdown menu which sort the tasks and boards. Becuase of this the styling was created outside of illustrator and directly on the front end.  
I did need to adjust the styling of the home page as this was overcomplicated for my abilities at this time. 

### Features 
When the user opens the home page, the website loads with the home page content, a simple graphic and a sign up form. 
The nav bar content changes depending on if the user is logged in or not. If the user is logged in, the 'signin'& 'signup' links are removed and are replaced with the tabs 'boards', 'tasks' and 'signout'. 
The logo is always a link to the home page.
The navbar icons will change colour based on the page they are on. This is a visible cue for the user to navigate the page they are on should they require it.  A tab will be yellow if the mouse is hovered and orange if the tab is active. 
<img width="430" alt="image" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/c1a209eb-d6bf-466f-a638-d37b092bf281">


#### Boards 
The boards page lists all of the boards that the user has created. The user is able to search for a board title. On ethis page there is the option to 'add board' when the mouse hovers over the '+' icon at the top and bottom of the page. 
Each board is listed below the search bar and notes how many tasks are assigned to each baord. 
<img width="1211" alt="Screenshot 2023-09-25 at 00 34 33" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/960bc430-1cab-48af-8e7c-36ac06b627dd">


When the user clicks on the '+' button, text will appear saying 'add board'. When the link is clicked, the user is taken to a page with a simple form asking for the name of the board. They are unable to submit a blank title.
<img width="1205" alt="Screenshot 2023-09-25 at 00 36 52" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/26dd9ac6-953e-4d21-91f5-ebbe0dc844cf">
When the submit the new board form, they are immediately taken to the 'board' they have created so they can create tasks which will be automatically assigned to the board they are on. 
<img width="1330" alt="Screenshot 2023-09-25 at 00 38 11" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/c0a912e9-9a2b-4bcc-b5c5-b7e4769f3d75">
No other user can see the board they have created.  If another user tried to access their board, they will be re-directed to their own boards page. 

When the user clicks on a board, they will be taken to their boards page. This page shows all of the tasks which are assigned to that board. They have the ability to edit the board name:
<img width="1186" alt="Screenshot 2023-09-25 at 00 44 16" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/08cdc4ac-e3e6-4a0c-a384-11c8f6e055ca">
<img width="1229" alt="Screenshot 2023-09-25 at 00 44 37" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/a2960464-f8b5-4002-b348-90ca6de0ac90">
<img width="1215" alt="Screenshot 2023-09-25 at 00 44 52" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/5b53a736-b24e-42c2-87f0-9881052b2141">

One the board page, the user will see a list of all the tasks assigned to the board.  They can search for a task title using the search bar.  A development oppertunity here is to add sort by drop downs, search by status or priority or even filter by attachment. 

The user has ability to edit the board by clicking the three dots in the corner of the task which reveals 2 icons. When the user presses the edit icon, the edit form is revealed. WHen the user presses the bin icon, the board is deleted

### Tasks
The user can then create a task which is automatically assigned to their board. 
<img width="1206" alt="Screenshot 2023-09-25 at 00 46 24" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/1fd968bf-3bb8-4ae5-a949-d1e32fc0bc42">

Each task holds a title, description, duedate, priority, status and an option to add an attachment. The date form field opens a calender for best user experience and the priorty and status fiels are displayed as dropdowns for simplicity.  Once the form is submitted, the task is automatically assigned the board they are currently on. 

The user has ability to edit the task by clicking the three dots in the corner of the task which reveals 2 icons. When the user presses the edit icon, the edit form is revealed. WHen the user presses the bin icon, the task is deleted.
<img width="1102" alt="Screenshot 2023-09-25 at 00 50 35" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/0caa158f-018d-4971-9894-c1f10e5a4753">

<img width="1007" alt="Screenshot 2023-09-25 at 00 50 57" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/2ce354de-83c3-4c77-950e-2b7770a485df">

At the bottom of each task item is a button which reveals the task attachment link if there is one.  
<img width="1055" alt="Screenshot 2023-09-25 at 00 52 58" src="https://github.com/Rhesmika/tudu-fe/assets/100621349/a33b2636-3612-447c-9487-818f27cf3a5c">
A development oppertunity here would be to have the link open in a new tab or to show an attachment preview. Currently the form accepts images only. 

