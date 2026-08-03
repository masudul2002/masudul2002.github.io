export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <i className="fas fa-user text-primary"></i> About Me
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed text-justify">
              Hello! I&apos;m <span className="text-primary font-bold">MD. MASUDUL HASAN</span>, an
              undergraduate student at{" "}
              <span className="text-white font-medium">
                Sunamgonj Science and Technology University (SSTU)
              </span>
              . My journey in technology is driven by a curiosity to understand how things work and
              a passion for solving complex problems.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed text-justify">
              I am currently focusing on <span className="text-secondary font-bold">FinTech</span>{" "}
              solutions and improving my analytical capabilities through competitive programming. I
              believe in the power of technology to bridge gaps and create secure financial
              ecosystems.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed text-justify">
              Beyond coding, I have served as a{" "}
              <span className="text-white">Campus Coordinator at YUNet</span> and{" "}
              <span className="text-white">Director of IT at Anto Huzrapur Jubo Shangho</span>,
              honing my leadership and team-management skills.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-xl border border-glass-border hover-neon transition-all">
              <i className="fas fa-laptop-code text-4xl text-primary mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Development</h3>
              <p className="text-gray-400 text-sm">
                Building scalable web applications and software solutions.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-glass-border hover-neon transition-all mt-8">
              <i className="fas fa-shield-alt text-4xl text-secondary mb-4"></i>
              <h3 className="text-xl font-bold mb-2">FinTech</h3>
              <p className="text-gray-400 text-sm">
                Passionate about secure financial technology and payment systems.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-glass-border hover-neon transition-all">
              <i className="fas fa-brain text-4xl text-pink-500 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Problem Solving</h3>
              <p className="text-gray-400 text-sm">
                Algorithm Analysis and Data Structures enthusiast.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-glass-border hover-neon transition-all mt-8">
              <i className="fas fa-users text-4xl text-yellow-500 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Leadership</h3>
              <p className="text-gray-400 text-sm">
                Leading teams and coordinating impactful events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
