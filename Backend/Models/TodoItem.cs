namespace TodoApi.Models;

public class TodoItem
{
    public int TaskId { get; set; }               // id for the task
    public string? TaskTitle { get; set; }        // title of the task
    public bool IsTaskCompleted { get; set; }     // boolean to check if the task is completed or not

    public string? CreatedAt { get; set; }        // time added

    public string? Priority { get; set; }  // optionally use an enum

    public string? Type { get; set; }

    public string? Status { get; set; }  // e.g., "Backlog", "In Progress", "Complete"

    

}
