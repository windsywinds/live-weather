import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-weather';
  weatherData: any = null;
  weatherImage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  getWeather() {
    const city = (document.querySelector('.search-bar input') as HTMLInputElement).value;
    const APIKey = 'YOUR_OPENWEATHERAPI_KEY'; //add an API key for OpenWeatherAPI

    if (city !== '') {
      (document.querySelector('.app') as HTMLElement).style.height = '430px';
    }

    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
      .subscribe(
        (data: any) => {
          if (data.cod === '404') {
            this.errorMessage = 'City not found';
            this.weatherData = null;
            (document.querySelector('.app') as HTMLElement).style.height = '180px';
            return;
          }
          this.errorMessage = '';
          this.weatherData = data;

          switch (data.weather[0].main) {
            case 'Clear':
              this.weatherImage = 'icons/clear.png';
              break;
            case 'Clouds':
              this.weatherImage = 'icons/cloud.png';
              break;
            case 'Rain':
              this.weatherImage = 'icons/rain.png';
              break;
            case 'Thunderstorm':
              this.weatherImage = 'icons/storm.png';
              break;
            case 'Snow':
              this.weatherImage = 'icons/snow.png';
              break;
            case 'Mist':
              this.weatherImage = 'icons/mist.png';
              break;
            default:
              this.weatherImage = '';
          }
        },
        (error) => {
          console.error('Error fetching weather data:', error);
          this.errorMessage = 'Error fetching weather data';
        }
      );
  }
}
