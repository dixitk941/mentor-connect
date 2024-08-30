// TeamSection.js
import React from 'react';
import Hero from '../components/Hero'

// Define team members
// teamMembers.js
export const teamMembers = [
    {
      name: 'Karan Dixit',
      role: 'Team Leader & Frontend Developer',
      imgSrc: 'https://karandixitportfolio.vercel.app/static/images/me1.png', // Replace with actual image URL
      socialLinks: {
        // facebook: '#',
        // twitter: 'https://www.x.com/dixitk941',
        linkedin: 'https://github.com/dixitk941',
        instagram: 'https://www.instagram.com/karan_dixit19',
      },
    },
    {
      name: 'Pratick',
      role: 'Graphic Designer and Firebase Manager',
      imgSrc: 'https://firebasestorage.googleapis.com/v0/b/mentorconnect-36696.appspot.com/o/pratick.jpg?alt=media&token=f377a1ad-f4db-4552-af3e-fd668f41cb87', // Replace with actual image URL
      socialLinks: {
        // facebook: '#',
        // twitter: '#',
        linkedin: 'https://www.github.com/pratickjaat',
        instagram: 'https://www.instagram.com/pratick.who',
      },
    },
    {
      name: 'Dushyant',
      role: 'Backend Developer',
      imgSrc: 'https://firebasestorage.googleapis.com/v0/b/mentorconnect-36696.appspot.com/o/photos%2FKRffhU0fnHUnsEKmIb8Q7gpEjQa2?alt=media&token=3d40af58-eda4-4011-9a9a-38eb72a196bb', // Replace with actual image URL
      socialLinks: {
        // facebook: '#',
        // twitter: '#',
        linkedin: 'https://www.github.com/dushyantrwt',
        instagram: 'https://www.instagram.com/roar_dushyant',
      },
    },
    {
      name: 'Mayank',
      role: 'QA & Testing',
      imgSrc: 'https://firebasestorage.googleapis.com/v0/b/mentorconnect-36696.appspot.com/o/Mayank.jpg?alt=media&token=3d6bad89-5307-4af1-a250-9ae175be403d', // Replace with actual image URL
      socialLinks: {
        // facebook: '#',
        // twitter: '#',
        linkedin: 'https://www.github.com/mayanks023',
        instagram: 'https://www.instagram.com/the_mayanks',
      },
    },
    {
      name: 'Laxman',
      role: 'Documentation & Presentation',
      imgSrc: 'https://firebasestorage.googleapis.com/v0/b/mentorconnect-36696.appspot.com/o/photos%2FPgXWKjB1erSJHjvOkl3mhMDcE1g1?alt=media&token=ed84e562-ba64-4c8b-b36b-25de3158558b', // Replace with actual image URL
      socialLinks: {
        // facebook: '#',
        // twitter: '#',
        linkedin:  'https://www.github.com/laxman43aa',
        instagram: 'https://www.instagram.com/laxmanrawat__1417',
      },
    },
    {
      name: 'Pratibha',
      role: 'Documentation & Presentation',
      imgSrc: 'https://firebasestorage.googleapis.com/v0/b/mentorconnect-36696.appspot.com/o/pratibha.jpg?alt=media&token=9f0d93b8-6075-461b-831e-f69a76af7a5e', // Replace with actual image URL
      socialLinks: {
        // facebook: '#',
        // twitter: '#',
        linkedin: 'https://www.github.com/pratibha180',
        instagram: 'https://www.instagram.com/pratibha0897',
      },
    },
  ];
  

const TeamSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
        <Hero />
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          {/* <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our team
          </h2> */}
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Collaborating to Shape the Future of Mentorship          </p>
        </div>
        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center text-gray-500 dark:text-gray-400">
              <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={member.imgSrc} alt={`${member.name} Avatar`} />
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a>{member.name}</a>
              </h3>
              <p>{member.role}</p>
              <ul className="flex justify-center mt-4 space-x-4">
                <li>
                  {/* <a href={member.socialLinks.facebook} className="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a> */}
                </li>
                <li>
                  <a href={member.socialLinks.twitter} className="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href={member.socialLinks.linkedin} className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href={member.socialLinks.instagram} className="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c-1.035-2.504-3.448-3.998-6.267-3.998-1.731 0-3.551.596-4.975 1.712C6.071 6.357 6 6.308 6 6.262a8.496 8.496 0 011.448-5.675C8.184 1.503 10.116 1 12 1c2.348 0 4.712.699 6.605 1.61zM8.836 9.533c1.687 0 3.133 1.235 3.462 2.826a4.794 4.794 0 00-.313 1.79c.172 1.524 1.78 2.564 3.447 2.564 1.672 0 2.54-.877 2.74-1.346-.102-.178-.164-.375-.292-.576-.032-.065-.074-.126-.12-.185-.008.006-.018.011-.027.017a2.45 2.45 0 01-.658.255c-.236.087-.482.141-.748.144-1.147 0-2.183-.807-2.446-1.748-.053-.209-.108-.424-.188-.637a2.6 2.6 0 00-2.092-1.613c-.606-.057-1.172-.224-1.708-.496.145-.345.248-.71.284-1.085a2.048 2.048 0 00-.262-1.102c.418-.382.865-.705 1.385-.88.559-.175 1.138-.258 1.718-.258zm6.023 1.68a1.56 1.56 0 01.496-.178c.234.098.452.22.637.366.09.073.176.158.255.245a2.732 2.732 0 00-.255.245c-.42.422-1.025.66-1.622.654-.56.007-1.118-.17-1.597-.516-.459-.335-.795-.782-.973-1.259-.072-.191-.122-.396-.151-.604.22-.141.44-.29.663-.447.595-.357 1.26-.624 1.878-.729a3.108 3.108 0 01.786-.091z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
