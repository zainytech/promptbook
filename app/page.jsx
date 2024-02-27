import Feed from '@components/Feed';

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & Share 
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">
        AI-Powered Prompts
      </span>
    </h1>
    <p className="desc text-center">
      PromptBook is an open-source AI prompting tool for modern world to  discover, create and share creative prompts.
    </p>
    <p>Note: This is an underdevelopment website which is being updsted using CI/CD pipelines by the developer.</p>
    {/* <p>checking if CI/CD Pipeline created or not</p> */}
    <Feed/>
  </section>
)

export default Home