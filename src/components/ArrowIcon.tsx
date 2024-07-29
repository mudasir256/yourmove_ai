type Props = {
  color?: string
}

const ArrowIcon = ({ color = '#E85E5C' }: Props) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.96591 11.6364L4.64773 10.3295L8.10795 6.86932H0V4.94886H8.10795L4.64773 1.49432L5.96591 0.181818L11.6932 5.90909L5.96591 11.6364Z" fill={color} />
  </svg>
);

export default ArrowIcon;

