var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddSingleton<TodoApi.Services.TodoService>();

var app = builder.Build();



app.MapControllers();

app.Run();
