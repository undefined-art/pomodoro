import { Component } from "solid-js";

const Clock: Component = () => (
  <div id="clock" class="bg-deep-purple text-center py-4">
    <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 w-5/6 max-w-7xl m-auto">
      <div class="bg-yellow-400 h-2.5 rounded-full" style="width: 45%"></div>
    </div>
    <button
      type="button"
      id="startButton"
      class="bg-mid-gray px-16 py-5 mt-3 uppercase tracking-wider rounded-sm hover:bg-[#5d165d] active:bg-[#421042]"
    >
      Start
    </button>
  </div>
);

export default Clock;
