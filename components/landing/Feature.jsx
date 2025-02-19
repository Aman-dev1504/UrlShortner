"use client";
import { AreaChart, Shapes, Signature, Unlink } from "lucide-react";
import { useState } from "react";

export default function Feature() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseMove = (e, cardIndex) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const cards = [
    {
      icon: <Signature className="h-5 w-5" />,
      title: "Login or Sign Up",
      description:
        "login or sign up to your accout using your socials google/github without passwords and email.",
    },
    {
      icon: <Unlink className="h-5 w-5" />,
      title: "Short your links",
      description:
        "you can short any kind of links e.g youtube, instagram facebook & or custom link with just one click.",
    },
    {
      icon: <Shapes className="h-5 w-5" />,
      title: "Share your links",
      description:
        "share your shorten links with anyone with just one click using social or copy your link.",
    },
    {
      icon: <AreaChart className="h-5 w-5" />,
      title: "Get analytics",
      description:
        "Get analytics of your links and clicks either the user is using chrome and analized regions.",
    },
  ];

  return (
    <section className="px-6 md:px-20 lg:px-32 mb-10">
      <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-center space-y-6 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
          What it{" "}
          <span className="relative inline-block">
            <span className="relative z-10">requires</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 20"
              className="absolute left-0 bottom-0 w-full h-2 text-blue-500"
            >
              <path
                d="M0,10 C50,15 150,5 200,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw"
              />
            </svg>
          </span>{" "}
          & How to get{" "}
          <span className="relative inline-block">
            <span className="relative z-10">started</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 20"
              className="absolute left-0 bottom-0 w-full h-2 text-blue-500"
            >
              <path
                d="M0,10 C50,15 150,5 200,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw"
              />
            </svg>
          </span>
          ?
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mx-auto leading-relaxed max-w-md md:max-w-lg lg:max-w-2xl">
          Enjoy a seamless and completely free experience with this URL
          shortener — no subscriptions or hidden fees required!
        </p>
      </div>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative bg-card hover:bg-secondary/40 transition-all duration-300 p-6 rounded-xl border border-border shadow-sm hover:shadow-md group cursor-pointer"
            onMouseMove={(e) => {
              handleMouseMove(e, index);
              setHoveredCard(index);
            }}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Hover effect spotlight */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  hoveredCard === index
                    ? `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.40), transparent 100%)`
                    : "",
              }}
            />

            {/* Card content */}
            <div className="relative z-10">
              {card.icon}
              <h3 className="text-lg mt-2 mb-1">{card.title}</h3>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
