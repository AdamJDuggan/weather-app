// Next
import Image from 'next/image';
// Types
import Weather from '../../types/Weather';
//Assets
import cloudyDay from '../../assets/cloudyDay.svg';
import sunny from '../../assets/sunny.svg';
import rainy from '../../assets/rainy.svg';
import showers from '../../assets/showers.svg';

type Props = {
  icon: Weather;
  size?: 'small' | 'large';
};

const ICONS = {
  'partly-cloudy-day': { src: cloudyDay, alt: 'Partly cloudy day' },
  cloudy: { src: cloudyDay, alt: 'Partly cloudy day' },
  'clear-day': { src: sunny, alt: 'Rainy day' },
  sunny: { src: sunny, alt: 'Rainy day' },
  rain: { src: rainy, alt: 'Rainy day' },
  showers: { src: showers, alt: 'Showers weather' },
};

const SIZES = {
  small: { width: 80, height: 80 },
  medium: { width: 144, height: 144 },
  large: { width: 234, height: 169 },
};

export default function WeatherIcon(props: Props) {
  const icon = ICONS[props.icon] || null;
  const size = SIZES[props.size || 'small'];
  if (!ICONS[props.icon]) console.log(props.icon);
  return (
    <Image
      src={icon.src}
      alt={icon.alt}
      height={size.height}
      width={size.width}
    />
  );
}
