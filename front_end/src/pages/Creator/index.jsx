import { useLocation } from "react-router-dom";

export default function Creator() {
  const params = useLocation();
  console.log(params.state);
  return <div>This is the Creator</div>;
}
