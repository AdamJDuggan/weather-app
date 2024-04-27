// Utils
import { getShortDay } from '../../utils/formatDate';
// Components
import TempretureComponent from '../Temperaute';
import WeatherIcon from '../WeatherIcon';
// Models
import Tempreture from '../../types/Tempreture';
import Weather from '../../types/Weather';

type Props = {
  location: string;
  tempreture: number;
  date: string;
  icon: Weather;
  scale: Tempreture;
};

export default function TodayCard(props: Props) {
  return (
    <>
      <h1>{props.location}</h1>
      <h2>{getShortDay(props.date)}</h2>
      <WeatherIcon icon={props.icon} />
      <h3>
        <TempretureComponent scale={props.scale} value={props.tempreture} />
      </h3>
      <h4>Sunny</h4>
    </>
  );
}
