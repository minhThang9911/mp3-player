import type { MetaFunction } from "@remix-run/node";
import Marquee from "~/components/Marquee";
import Player from "~/components/Player";

export const meta: MetaFunction = () => {
  return [
    { title: "Minh Thắng 's music library" },
    { name: "description", content: "Welcome to my site!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans h-dvh relative">
      <Player title="aaaaa"/>
      <Marquee text="Minh Thắng 's music colection" className="bg-gray-600 text-white font-bold italic"/>
      <div className="flex main">
        <div className="w-1/5 bg-slate-600">

        </div>
        <div className="flex-grow bg-blue-200"></div>
        <div className="w-1/5 bg-purple-500"></div>
      </div> 
    </div>
  );
}
