export function Loader() {
    return (
      <div className="inline-block relative w-4 h-4 ml-2">
        <div className="absolute w-full h-full border-2 border-gray-200 rounded-full"></div>
        <div className="absolute w-full h-full border-2 border-transparent border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }