const Websites = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Websites</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Example Website 1</h2>
        <p className="mb-4">
          This is a description of the first example website. It showcases various features and functionalities.
        </p>
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/knOfFX2HWv4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Example Website 2</h2>
        <p className="mb-4">
          This is a description of the second example website. It highlights different design elements and user
          interactions.
        </p>
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/knOfFX2HWv4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Example Website 3</h2>
        <p className="mb-4">
          This is a description of the third example website. It focuses on performance optimization and accessibility.
        </p>
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/knOfFX2HWv4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>
    </div>
  )
}

export default Websites

