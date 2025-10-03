
import { Quote, Pumpkin } from './index';


export default function Home() {
  return (
    <>
    <div>
      <h1>Home Page</h1>
    </div>
    <Quote />
    <Pumpkin options={{ face: 'classic', glow: true, animate: true, size: 240 }} />
    </>
  );
}