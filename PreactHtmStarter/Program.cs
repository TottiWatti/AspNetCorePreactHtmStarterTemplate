
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

// register weatherforecast service as singleton
builder.Services.AddSingleton<EsSpaTemplate.IWeatherForecastService, EsSpaTemplate.WeatherForecastService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

// map weatherforecast api
app.MapGet("/api/weatherforecast", (EsSpaTemplate.IWeatherForecastService service) =>
{
    return Results.Ok(service.Get());
});

app.Run();
