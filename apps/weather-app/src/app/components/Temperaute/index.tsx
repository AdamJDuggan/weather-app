type Props = {
  value: number;
  scale: 'celsius' | 'fahrenheit';
};

export default function Tempreture(props: Props) {
  if (props.scale === 'fahrenheit') {
    return <span>{Math.round(props.value)} &#8457;</span>;
  } else {
    return <span>{Math.round((props.value - 32) / 1.8)} &deg; c</span>;
  }
}
