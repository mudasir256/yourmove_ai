import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthModal } from "../components/modals/AuthModal";
import { SideNav } from "../components/nav/SideNav";
import { useUIStore } from "../stores/ui";
import { BottomNav } from "../components/nav/BottomNav";
import { Error } from "../components/Error";

const Page = (props: any) => {
  const { error, stopScroll, hideBottomNav, hideTopBar } = useUIStore();

  // For making the bottom nav responsive
  const [contentHeight, setContentHeight] = useState(window.innerHeight);
  const heightOfTopBar = 48; // Example height in pixels for the top bar
  const heightOfBottomBar = 16; // Example height in pixels for the bottom bar

  const updateContentHeight = () => {
    // Calculate available height for content
    const availableHeight =
      window.innerHeight - (heightOfTopBar + heightOfBottomBar);
    setContentHeight(availableHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateContentHeight);

    // Set the initial content height
    updateContentHeight();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", updateContentHeight);
  }, []);

  useEffect(() => {
    document.title = "YourMove AI - " + props.title || "";
  }, [props.title]);

  return (
    <div className="flex flex-col h-screen">
      <Toaster />
      <AuthModal />
      {!hideTopBar && <SideNav />}
      <div
        style={{
          maxHeight: `${hideBottomNav ? "100%" : contentHeight + "px"}`,
        }}
        className={`${stopScroll ? "overflow-y-hidden" : "overflow-y-auto"}`}
      >
        <div className="pt-12">
          {error ? <Error error={error} /> : props.children}
        </div>
      </div>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

export default Page;
