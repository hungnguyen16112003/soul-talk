import { useState, useRef, useEffect } from "react";
import { FaPhone, FaTimes, FaHeadset, FaFax } from "react-icons/fa";

const FloatingSupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const supportNumbers = [
    {
      label: "Hỗ trợ 1",
      number: "02438263026",
      display: "0243.8263.026",
      type: "phone",
    },
    {
      label: "Hỗ trợ 2",
      number: "02439446670",
      display: "0243.9446.670",
      type: "phone",
    },
    {
      label: "Fax",
      number: "02438225841",
      display: "024.3822.5841",
      type: "fax",
    },
  ];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-24 right-6 z-[9999] flex flex-col items-end gap-3 font-sans"
    >
      {/* Menu Options */}
      <div
        className={`transition-all duration-300 origin-bottom-right flex flex-col gap-3 mb-2 ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-50 opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 flex flex-col gap-2 min-w-[240px]">
          <div className="px-3 py-2 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm">
              Hỗ trợ người khuyết tật
            </h3>
            <p className="text-xs text-gray-500">Liên hệ ngay để được hỗ trợ</p>
          </div>
          {supportNumbers.map((item, index) => {
            const isFax = item.type === "fax";
            const Icon = isFax ? FaFax : FaPhone;
            const bgClass = isFax ? "bg-gray-500" : "bg-green-500";
            const hoverTextClass = isFax
              ? "group-hover:text-gray-700"
              : "group-hover:text-green-700";
            const hoverBgClass = isFax
              ? "hover:bg-gray-50"
              : "hover:bg-green-50";

            return (
              <a
                key={index}
                href={isFax ? undefined : `tel:${item.number}`}
                className={`flex items-center gap-3 p-2 rounded-lg ${hoverBgClass} transition-colors group text-gray-800 ${
                  isFax ? "cursor-default" : "cursor-pointer"
                }`}
                onClick={(e) => {
                  if (isFax) e.preventDefault();
                }}
              >
                <div
                  className={`${bgClass} text-white p-2 rounded-full shadow-md group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">
                    {item.label}
                  </span>
                  <span
                    className={`font-bold text-sm text-gray-800 ${hoverTextClass} transition-colors`}
                  >
                    {item.display}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full cursor-pointer shadow-2xl transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700 rotate-90"
            : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:-translate-y-1"
        } text-white`}
        title="Liên hệ hỗ trợ"
      >
        {/* Ripple effect background */}
        {!isOpen && (
          <>
            <span className="absolute w-full h-full rounded-full bg-white opacity-20 animate-ping"></span>
            <span className="absolute w-full h-full rounded-full bg-white opacity-10 animate-pulse delay-75"></span>
          </>
        )}

        {isOpen ? (
          <FaTimes className="w-6 h-6 relative z-10" />
        ) : (
          <FaHeadset className="w-7 h-7 relative z-10" />
        )}
      </button>
    </div>
  );
};

export default FloatingSupportButton;
