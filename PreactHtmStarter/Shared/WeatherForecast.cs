using System.ComponentModel.DataAnnotations;

namespace EsSpaTemplate.Shared
{
    /// <summary>
    /// Weather forecast class definition
    /// </summary>
    public class WeatherForecast
    {
        /// <summary>
        /// Forecast date time
        /// </summary>
        public DateTime Date { get; set; } = DateTime.Now;

        [Range(-50, 100)]
        /// <summary>
        /// Forecast tempereture in celsius degress
        /// </summary>
        public int TemperatureC { get; set; } = 0;

        [Range(-58, 212)]
        /// <summary>
        /// Forecast temperature in fahrenheit degrees
        /// </summary>
        public int TemperatureF { get; set; } = 32;

        /// <summary>
        /// Forecast summary enum value
        /// </summary>
        public WeatherForecastSummary Summary { get; set; } = WeatherForecastSummary.Cool;        
    }
}
