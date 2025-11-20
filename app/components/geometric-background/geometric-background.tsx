export function GeometricBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute left-0 right-0 top-0 w-full h-full">
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

