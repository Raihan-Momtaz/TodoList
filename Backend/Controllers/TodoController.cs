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
    }
}
