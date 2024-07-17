export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About My Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to my blog! This blog was created as a personal project to share thoughts and ideas with the world. As a passionate developer, I love writing about technology, coding, and various related topics.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials covering web development, software engineering, and programming languages. I am always learning and exploring new technologies, so be sure to check back often for fresh content!
            </p>

            <p>
              I encourage you to leave comments on posts and engage with other readers. Feel free to like and reply to others' comments as well. I believe that a community of learners can help each other grow and improve.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}