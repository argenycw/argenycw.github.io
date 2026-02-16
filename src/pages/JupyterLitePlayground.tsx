// Playground.tsx

const Playground = () => {

  return (
    <div className="d-flex flex-column min-vh-100"> 
      <iframe
        src="https://jupyterlite.github.io/demo/repl/index.html"
        className="w-100 h-100 position-absolute"
      />
    </div>
  );
}

export default Playground;