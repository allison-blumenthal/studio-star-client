# Studio Star

## App Users <!-- This is a scaled down user persona -->
- Private music teachers who want an all-in-one, digital platform to communicate with students and their families, document lesson assignments, and provide practice incentives.
- Students who want to log into the platform to see assignments, document practicing, and communicate with teachers. 
- Family members who want to support their student by viewing assignments and information posted by teachers. 
- Music lesson business owners who need a single platform where all employee teachers can have separate studio rosters. 

## Features <!-- List your app features using bullets! Do NOT use a paragraph. No one will read that! -->
- Upon first login, the user registers for the app as a teacher or student. If a teacher, they create and name their studio. If a student, they select one or more teachers to enroll with. 
- Teachers have a roster page showing all students enrolled in their studio, who they can unenroll at any time. 
- From the roster page, teachers can navigate to a student's page and CRUD assignments, and tasks within assignments.
- Students each have a personal assignment page allowing them to view all assignments and tasks.
- On each task, students (and teachers) can choose stickers to log practicing. Once the practice goal on a task has been met, the task updates to "complete."
- Both user types can view a profile page with their user details. 

## Relevant Links <!-- Link to all the things that are required outside of the ones that have their own section -->
- [ERD](https://drawsql.app/teams/nss-e21/diagrams/studio-star-erd)
- [Wireframes](https://www.figma.com/file/LMywQRrBw60vbKzL3Dfxlo/Studio-Star-Wireframe?type=whiteboard&node-id=504-1398&t=AVrfJW5r0zd7jF7c-0)
- [Project Board](https://github.com/users/allison-blumenthal/projects/8/views/1)


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

## Steps to run this project locally:


## Contributors
- [Allison Blumenthal](https://github.com/allison-blumenthal)
