# Studio Star Client

Studio Star is all-in-one, digital platform for private lesson teachers and students to document and access lesson assignments, log practice tasks, communicate studio-wide or individually, and provide or participate in practice incentives. Built with both remote and in-person teaching in mind, Studio Star is the "virtual assignment book" you've been waiting for!

## App Users <!-- This is a scaled down user persona -->
- Private lesson teachers who want a place to communicate with students and their families, document lesson assignments, and provide practice incentives.
- Students who want to log into the platform to see assignments, document practicing, and communicate with teachers. 
- Family members who want to support their student by viewing assignments and information posted by teachers. 
- Music lesson business owners who need a single platform where all employee teachers can have separate studio rosters. 

## Features <!-- List your app features using bullets! Do NOT use a paragraph. No one will read that! -->
- Studio Star uses Google authentication for users to log in, prior to registering for the app as a teacher or student. 
- If the user is a teacher, they create and name their studio. 
- If the user is a student, they select one or more teachers to enroll into their studio. 
- Teachers have a roster page showing students enrolled in their studio, who they may unenroll at any time. 
- From the roster page, teachers can navigate to any student's page to view, create, update, or delete assignments.
- Within each assignment, teachers can view, create, update, or delete specific tasks.
- Students can view all assignments and tasks created by their teacher on their personal assignment page.
- On each assigned task, students (and teachers) can choose, view, and delete stickers to log their practicing. Once the practice goal on a task has been met, the task updates to "complete."
- Both teachers and students can view a profile page with their user details. 
- Students may return to the enrollment page at any time to unenroll or enroll with alternate teachers. 

## Relevant Links <!-- Link to all the things that are required outside of the ones that have their own section -->
- [ERD](https://drawsql.app/teams/nss-e21/diagrams/studio-star-erd)
- [Wireframes](https://www.figma.com/file/LMywQRrBw60vbKzL3Dfxlo/Studio-Star-Wireframe?type=whiteboard&node-id=504-1398&t=AVrfJW5r0zd7jF7c-0)
- [Project Board](https://github.com/users/allison-blumenthal/projects/8/views/1)
- [Server-side Repository](https://github.com/allison-blumenthal/studio-star-server)


## Code Snippet <!-- OPTIONAL, but doesn't hurt -->
```
<div>
      <h1>{task.title}</h1>
      {user.is_teacher === true ? (
        <>
          <Button onClick={handleEditClick}>
            <Image src={editIcon} alt="edit icon" />
          </Button>
          <Button onClick={deleteThisTask}>
            <Image src={deleteIcon} alt="delete icon" />
          </Button>
        </>
      ) : (
        <Button onClick={handleStickerClick} onUpdate={getCurrentTask}>
          <Image src={stickerIcon} alt="sticker icon" />
        </Button>
      )}
      <h3>Description: {task.description}</h3>
      <h3>Sticker Goal: {task.sticker_goal}</h3>
      <h3>Stickers earned so far: {task.current_stickers}</h3>
      {taskStickers.map((taskSticker) => (
        <section key={`taskSticker--${taskSticker.id}`} className="taskSticker">
          <TaskStickerCard taskStickerObj={taskSticker} onUpdate={() => { getTaskStickers(); getCurrentTask(); }} />
          <br />
        </section>
      ))}
      <h3>Completion Status:</h3>
      {task.is_completed === true ? (
        <Image src={checkboxIcon} alt="checkbox icon" />
      ) : (
        <Image src={uncheckedBoxIcon} alt="unchecked box icon" />
      )}
    </div>
```

## Project Screenshots <!-- These can be inside of your project. Look at the repos from class and see how the images are included in the readme -->
- TBA

## Video Walkthrough
- TBA


## Contributors
- [Allison Blumenthal](https://github.com/allison-blumenthal)

## Attribution
<a href="https://www.flaticon.com/free-icons/button" title="button icons">Button icons created by Dave Gandy - Flaticon</a>
