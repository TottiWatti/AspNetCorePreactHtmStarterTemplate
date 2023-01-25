namespace EsSpaTemplate
{
    using EsSpaTemplate.Shared;

    public interface IWeatherForecastService
    {
        string Get();       
    }
    public class WeatherForecastService : IWeatherForecastService
    {       
        public string Get()
        {
            var WeatherForecasts = new List<WeatherForecast>();
            for (int i = 1; i <= 5; i++)
            {
                WeatherForecast wf = new WeatherForecast();
                wf.Date = DateTime.Now.AddDays(i);
                wf.TemperatureC = Random.Shared.Next(-20, 55);
                wf.TemperatureF = 32 + (int)(wf.TemperatureC / 0.5556);
                wf.Summary = (WeatherForecastSummary)Random.Shared.Next(0, Enum.GetNames(typeof(WeatherForecastSummary)).Length-1);                

                WeatherForecasts.Add(wf);
            }
            return System.Text.Json.JsonSerializer.Serialize(WeatherForecasts);           
        }
        
    }

}
