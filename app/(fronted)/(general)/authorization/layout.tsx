"use client";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="basis-1/2 relative">
        {" "}
        <Image
          src="/image/auth/HD-wallpaper-cars-disney-cars.jpg"
          alt="Towing Service"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="basis-1/2">{children}</div>
    </div>
  );
}
