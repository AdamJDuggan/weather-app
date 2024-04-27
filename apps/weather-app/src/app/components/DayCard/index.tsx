// Components
import WeatherIcon from '../WeatherIcon';
// Types
import Weather from '../../types/Weather';
import Temperature from '../../types/Temperature';
// 3rd party
import classnames from 'classnames';
// Utils
import { getShortDay } from '../../utils/formatDate';
// Components
import TemperatureComponent from '../Temperaute';

type Props = {
  conditions: string;
  date: string;
  icon: Weather;
  high: number;
  low: number;
  cardClass: string;
  scale: Temperature;
};

export default function DayCard(props: Props) {
  return (
    <div className={classnames(props.cardClass, 'card')}>
      <div className="day-card">
        <h2>{getShortDay(props.date)}</h2>
        <WeatherIcon icon={props.icon} />
        <h3>{props.conditions}</h3>
        <div className="tempretures">
          <TemperatureComponent scale={props.scale} value={props.low} />
          <TemperatureComponent scale={props.scale} value={props.high} />
        </div>
      </div>
    </div>
  );
}
