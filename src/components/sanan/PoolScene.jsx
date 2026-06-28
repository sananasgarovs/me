const PoolScene = () => {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(280px, 55vw, 420px)' }}>
      <div className="absolute inset-0 flex items-end justify-center">
        <img
          src="./sanan-assets/ho.png"
          alt="pool"
          className="h-full w-full"
          style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05080f] to-transparent" />
    </div>
  );
};

export default PoolScene;
