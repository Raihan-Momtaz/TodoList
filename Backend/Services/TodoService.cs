using TodoApi.Models; 

namespace TodoApi.Services
{
    public class TodoService
    {
        // Private list for storing all the todo items
        private readonly List<TodoItem> todoItems = new();

        // Counter for keeping track of tasks and adding the next task id
        private int nextTaskId = 1;

        // Gets all tasks  to do
        public List<TodoItem> GetAllTasks() => todoItems;

        // Finds and returns a todo item by its unique TaskId
        public TodoItem? GetTaskById(int taskId) =>
            todoItems.FirstOrDefault(task => task.TaskId == taskId);

        // Adds new task
        public TodoItem AddTask(TodoItem newTask)
        {
            // Assign a new ID
            newTask.TaskId = nextTaskId++;
            todoItems.Add(newTask);
            return newTask;
        }

        // Deletes a task
        public bool DeleteTask(int taskId)
        {
            var taskToDelete = GetTaskById(taskId);   
            if (taskToDelete is null)                 
                return false;

            todoItems.Remove(taskToDelete);         
            return true;                              
        }
        //method for updating task status   
        public void UpdateTask(TodoItem updatedTodo)
        {
            var existingTask = GetTaskById(updatedTodo.TaskId);
                if (existingTask != null)
                {
                    existingTask.Status = updatedTodo.Status;
                    if (existingTask.Status == "Completed")
                    {
                        existingTask.IsTaskCompleted = true;
                    }
                    else
                    {
                        existingTask.IsTaskCompleted = false;
                    }
            }
        }

    }
}
