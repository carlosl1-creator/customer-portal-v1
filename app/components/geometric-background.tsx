export function GeometricBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      <div 
        className="absolute left-0 right-0 w-[130%] h-[110%]"
        style={{ 
          right: '-30%',
          top: '-15%',
          transform: 'translateY(15%)'
        }}
      >
        <img
          src="/geometric-background.svg?v=2"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

