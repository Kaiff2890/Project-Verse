const CustomButton = ({ title, containerStyles = "", iconRight, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`relative inline-flex items-center justify-center 
                  font-semibold tracking-tight
                  rounded-full
                  transition-all duration-200 ease-out
                  active:scale-[0.97]
                  disabled:opacity-60 disabled:cursor-not-allowed
                  btn-shine
                  ${containerStyles}`}
    >
      <span className="relative z-10 flex items-center">
        {title}
        {iconRight && <div className="ml-2 flex items-center">{iconRight}</div>}
      </span>

      {/* Shine layer */}
      <span className="btn-shine-layer absolute inset-0 rounded-full pointer-events-none"></span>

      <style>{`
        .btn-shine{
          overflow: hidden;
        }

        .btn-shine-layer{
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.25),
            transparent
          );
          transform: translateX(-120%);
          transition: transform 0.6s ease;
        }

        .btn-shine:hover .btn-shine-layer{
          transform: translateX(120%);
        }
      `}</style>
    </button>
  );
};

export default CustomButton;