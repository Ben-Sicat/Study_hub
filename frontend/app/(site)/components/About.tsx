import React from "react";
import { About1, About2, About3, About4 } from "../../components/svgs";

function About() {
  return (
    <div>
      <section className="mobile:py-10 mobile:px-5">
        <div
          className="
    bg-landing-section-bg
    rounded-lg
    mobile: pb-4
    "
        >
          <h2 className="text-xl mobile:font-bold text-center mobile:pt-6 mobile:pb-3">
            About Brew & Brains
          </h2>
          <div
            className="
      mobile:px-3
      mobile:text-8
      font-normal
      leading-4
      
      "
          >
            <div className="text-justify">
              At Brew & Brain, we’ve created more than just a space; we’ve
              crafted an experience tailored for passionate learners, ambitious
              professionals, and curious minds. Nestled in the heart of Manila
              City, we are more than just a study hub – we are a
              community-driven oasis designed to inspire, empower, and elevate.
            </div>
            <div>
              <ul className="mobile:mt-4 mobile:mb-4">
                <li className="flex items-center h-24">
                  <About1 className="text-400 h-full w-full" />
                  <div>
                    <h3 className="font-bold">Complimentary Coffee Culture:</h3>
                    <p>
                      Enjoy the aroma of freshly brewed coffee that fills the
                      air. Every sip is on us – a gesture to keep your
                      creativity flowing and your energy levels up.
                    </p>
                  </div>
                </li>
                <li className="flex items-center h-24">
                  <div className="">
                    <h3 className="font-bold text-right">
                      Inclusive Learning Spaces:
                    </h3>
                    <p className="text-right">
                      From cozy corners for solitary study to dynamic areas for
                      collaborative projects, our spaces cater to diverse
                      learning styles.
                    </p>
                  </div>

                  <About2 className="text-1000 h-full w-full" />
                </li>
                <li className="flex items-center h-24">
                  <About3 className="text-500 h-full w-full" />
                  <div>
                    <h3 className="font-bold">Resourceful Environment: </h3>
                    <p>
                      Access a treasure trove of books, digital resources, and
                      study materials carefully curated to support your
                      educational journey.
                    </p>
                  </div>
                </li>
                <li className="flex items-center h-24">
                  <div>
                    <h3 className="font-bold text-right">
                      Exclusive Vouchers:{" "}
                    </h3>
                    <p className="text-right">
                      Dive into a world of endless possibilities with our
                      exclusive vouchers. From discounts on workshops to free
                      access to premium study resources, these vouchers are our
                      way of enhancing your learning experience.
                    </p>
                  </div>
                  <About4 className="text-500 h-full w-full" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
