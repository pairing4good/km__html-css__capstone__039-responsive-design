# Kanban Board: Column Heading

Based on customer feedback, we are going to pivot the task list to a [kanban board](https://en.wikipedia.org/wiki/Kanban_board) with three columns (todo, doing, done). This is a significant change. We will break this large change down into smaller stories to avoid breaking our product.

```
Given that tasks exist 
When they are displayed 
Then each column's status is listed once at the top of each column
```

Steps:
- the `todo-column` should have a todo heading with the id `todo-status-heading` and the classes `todo` and `task-status`
- the `doing-column` should have a doing heading with the id `doing-status-heading` and the classes `doing` and `task-status`
- the `done-column` should have a done heading with the id `done-status-heading` and the classes `done` and `task-status`
- cards should no longer have an individual status
- cards should only contain a description without a containing `task-description` div
- the card class should have a padding of 10px
- the card class should not have a set width
- the column class should have a minimum width of 175px

Resources:
- https://www.w3schools.com/cssref/pr_padding.asp
- https://www.w3schools.com/cssref/pr_dim_min-width.asp
