var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// ✅ Register CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular dev server
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Register your TodoService
builder.Services.AddSingleton<TodoApi.Services.TodoService>();

var app = builder.Build();

// ✅ Apply CORS before MapControllers()
app.UseCors("AllowFrontend");

// Optional: If you use HTTPS redirection or authorization, include these:
// app.UseHttpsRedirection();
// app.UseAuthorization();

app.MapControllers();

app.Run();
