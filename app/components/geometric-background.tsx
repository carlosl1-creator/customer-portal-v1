export function GeometricBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div 
        className="absolute left-0 right-0 w-[100%] h-[110%]"
      >
        <img
          src="/sine.svg"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

