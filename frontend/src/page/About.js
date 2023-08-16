import React from 'react'

const About = () => {
  return (
        <div className="bg-gray-100 min-h-screen">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="">
                <h2 className="text-base text-indigo-600 underline font-semibold uppercase">
                  About Us
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Delivering Delightful Food Experiences
                </p>
                <p className="mt-4  text-xl text-gray-500 ">
                  At Foodie's Delight, we are passionate about bringing the best
                  food to your doorstep. We take pride in serving delicious dishes
                  made from fresh, locally-sourced ingredients.
                </p>
              </div>

              <div className="mt-10">
                <div className="md:flex md:justify-center">
                  
                  <div className="mt-4 md:mt-0">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase underline">
                      Our Mission
                    </h2>
                    <p className="mt-2 text-2xl leading-8 font-bold text-gray-900">
                      Providing Healthy &amp; Tasty Food Options
                    </p>
                    <p className="mt-4 text-xl text-gray-500">
                      Our mission is to create a delightful food delivery experience
                      that not only satisfies your taste buds but also promotes
                      health and well-being. We carefully curate our menu to offer a
                      diverse range of healthy and tasty options to cater to
                      different palates and dietary preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default About