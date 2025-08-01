var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//Registering CORS to integrate to the frontend server hosted on port 4200
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Registering TodoService
builder.Services.AddSingleton<TodoApi.Services.TodoService>();

var app = builder.Build();

app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();
