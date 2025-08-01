namespace TodoApi.Models;

public class TodoItem
{
    public int TaskId { get; set; }               // id for the task
    public string? TaskTitle { get; set; }        // title of the task
    public bool IsTaskCompleted { get; set; }     // boolean to check if the task is completed or not

    public string? CreatedAt { get; set; }
}
