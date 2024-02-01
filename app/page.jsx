import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Explore & Share
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center"> AI-Generated Prompts</span>
        </h1>
        <p className="desc text-center">
            Promptus is an amazing tool to explore, share and dive
            deep in the world of powerful and creative prompts.
        </p>
        {/* Feed */}
        <Feed/>
    </section>
  ) 
}

export default Home