using Microsoft.AspNetCore.Mvc;      
using TodoApi.Models;                
using TodoApi.Services;              

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoService todoService;  // using the services layer to manege tasks


        public TodoController(TodoService todoService)
        {
            this.todoService = todoService;       // Assigns service to the private field
        }

        // Gets all task
        [HttpGet]
        public ActionResult<List<TodoItem>> GetAll()
        {
            var allTasks = todoService.GetAllTasks();

            Console.WriteLine("GetAll - returning all tasks:");
            foreach (var task in allTasks)
            {
                Console.WriteLine($"Title: {task.TaskTitle}, CreatedAt: {task.CreatedAt}, IsTaskCompleted: {task.IsTaskCompleted}, Priority: {task.Priority}, Type: {task.Type}, Status:{task.Status}");
            }

            return todoService.GetAllTasks();     // Retrieve all tasks from service and return them
        }

        // Gets a task
        [HttpGet("{id}")]
        public ActionResult<TodoItem> Get(int id)
        {
            var todoItem = todoService.GetTaskById(id);
            return todoItem == null ? NotFound() : todoItem;
        }

        // Adds a task
        [HttpPost]
        [HttpPost]
        public ActionResult<TodoItem> Add(TodoItem todoItem)
        {
            // Log for debugging
            Console.WriteLine($"Received task: Title={todoItem.TaskTitle}, CreatedAt={todoItem.CreatedAt}");

            var createdItem = todoService.AddTask(todoItem);
            return CreatedAtAction(nameof(Get), new { id = createdItem.TaskId }, createdItem);
        }


        // Deletes a task
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var isDeleted = todoService.DeleteTask(id);
            return isDeleted ? NoContent() : NotFound();
        }
        
// PUT: api/todo/5
[HttpPut("{id}")]
public IActionResult UpdateTodoItem(int id, [FromBody] TodoItem updatedTodo)
{
    Console.WriteLine($"➡️ [Controller] Received full update for Task ID: {id}");

    if (id != updatedTodo.TaskId)
    {
        return BadRequest("Task ID mismatch");
    }

    var existingTask = todoService.GetTaskById(id);
    if (existingTask == null)
    {
        Console.WriteLine($"❌ [Controller] Task ID: {id} not found.");
        return NotFound();
    }

    todoService.UpdateTask(updatedTodo);
    Console.WriteLine($"✅ [Controller] Updated Task ID: {id}");
    return Ok(updatedTodo);
}

        
    }
}
