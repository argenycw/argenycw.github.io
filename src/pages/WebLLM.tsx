// WebLLMPlayground.tsx

const WebLLMPlayground = () => {

    return (
      <div className="d-flex flex-column min-vh-100"> 
        <iframe
          src="https://chat.webllm.ai/"
          className="w-100 h-100 position-absolute"
        />
      </div>
    );
  }
  
  export default WebLLMPlayground;