const QA = () => (
  <section class="bg-white dark:bg-gray-900 ">
    <div class="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 py-12">
      <h2 class="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">
        Frequently asked questions
      </h2>
      <div class="max-w-screen-md mx-auto">
        <div
          id="accordion-flush"
          data-accordion="collapse"
          data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          data-inactive-classes="text-gray-500 dark:text-gray-400"
        >
          <h3 id="accordion-flush-heading-1">
            <button
              type="button"
              class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              data-accordion-target="#accordion-flush-body-1"
              aria-expanded="true"
              aria-controls="accordion-flush-body-1"
            >
              <span>What is Pomodoro technique</span>
              <svg
                data-accordion-icon=""
                class="w-6 h-6 rotate-180 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </h3>
          <div
            id="accordion-flush-body-1"
            class=""
            aria-labelledby="accordion-flush-heading-1"
          >
            <div class="py-5 border-b border-gray-200 dark:border-gray-700">
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                What is that exactly?
              </p>
              <p class="text-gray-500 dark:text-gray-400">
                The{" "}
                <a
                  href="#"
                  class="text-purple-600 dark:text-purple-500 hover:underline"
                >
                  Pomodoro Technique
                </a>{" "}
                is a time management method based on 25-minute stretches of
                focused work broken by five-minute breaks. Longer breaks,
                typically 15 to 30 minutes, are taken after four consecutive
                work intervals.
              </p>
            </div>
          </div>
          <h3 id="accordion-flush-heading-2">
            <button
              type="button"
              class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
              data-accordion-target="#accordion-flush-body-2"
              aria-expanded="false"
              aria-controls="accordion-flush-body-2"
            >
              <span>What is this app</span>
              <svg
                data-accordion-icon=""
                class="w-6 h-6 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </h3>
          <div
            id="accordion-flush-body-2"
            class="hidden"
            aria-labelledby="accordion-flush-heading-2"
          >
            <div class="py-5 border-b border-gray-200 dark:border-gray-700">
              <p class="mb-2 text-gray-500 dark:text-gray-400">Some text</p>
              <p class="text-gray-500 dark:text-gray-400">Some text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default QA;
