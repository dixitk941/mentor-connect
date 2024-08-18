import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
// import Header from './Header'
import Hero from './Hero'
import Footer from './Footer'

export default function MentorConnect() {
  return (
    
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        {/* <Header /> */}
        <Hero />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">Enhance Your Skills</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mentor Connect</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Mentor Connect is designed to bridge the gap between aspiring developers and experienced mentors. It facilitates personalized guidance and support to help you excel in your tech journey. Whether you're looking for career advice, technical expertise, or project feedback, Mentor Connect provides a platform to connect with industry professionals and enhance your skills.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt="Mentor Connect Interface"
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
                Mentor Connect leverages a range of advanced features to ensure a seamless experience for both mentors and mentees. Our platform is designed with the latest technology to facilitate effective communication and resource management.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Effortless Scheduling.</strong> Schedule and manage mentorship sessions with ease. Our platform integrates with popular calendar tools to keep you organized.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Secure Communication.</strong> All interactions are encrypted to ensure privacy and security between mentors and mentees.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Robust Data Management.</strong> Efficiently manage and store your mentorship data, including session notes and feedback, with our reliable database solutions.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Mentor Connect is designed to be intuitive and user-friendly. Our goal is to provide a platform where you can focus on learning and growth without the hassle of managing complex tools.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Ready to Connect?</h2>
              <p className="mt-6">
                Whether you're a mentor looking to share your knowledge or a mentee seeking guidance, Mentor Connect is here to help you achieve your goals. Join our community today and take the next step in your professional journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
        <Footer />
    </div>
  )
}
