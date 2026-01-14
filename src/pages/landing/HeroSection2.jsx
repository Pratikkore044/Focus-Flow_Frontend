import React from 'react'

const HeroSection2 = () => {
  return (
    <section  className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div className="mx-auto grid max-w-7xl px-5 sm:px-5 md:px-8 lg:px-10 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
    
    <div className="content-center justify-self-start md:col-span-7 md:text-start">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">
        Plan faster, stay focused <br /> and get more done.
      </h1>

      <p className="mb-3 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg lg:mb-5 lg:text-xl">
        FocusFlow brings clarity to your daily tasks with a simple,
        distraction-free experience.
      </p>
    </div>

   
    <div className="hidden md:col-span-5 md:flex md:mt-0">
      <img
        className="dark:hidden"
        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg"
        alt="shopping illustration"
      />
      <img
        className="hidden dark:block"
        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg"
        alt="shopping illustration"
      />
    </div>
  </div>
</section>


  )
}

export default HeroSection2