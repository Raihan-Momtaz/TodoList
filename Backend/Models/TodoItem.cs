namespace TodoApi.Models;

public class TodoItem
{
    public int TaskId { get; set; }               
    public string? TaskTitle { get; set; }      
    public bool IsTaskCompleted { get; set; }      
    public string? CreatedAt { get; set; }         
    public string? Priority { get; set; }  
    public string? Type { get; set; }
    public string? Status { get; set; }  

}
