import Image from "next/image";
import Dashboard from "./dashboard/page";
import Pools from "./pools/page";

export default function Home() {
  return (
    <div>
      <main>
        <Pools />
      </main>
    </div>
  );
}
