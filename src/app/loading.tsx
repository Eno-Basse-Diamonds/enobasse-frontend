import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-white">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-secondary-500"></div>

        <div className="absolute">
          <Image
            src="https://res.cloudinary.com/enobasse/image/upload/v1756506781/logo_gvieez.png"
            alt="Logo"
            width={32}
            height={32}
            priority
          />
        </div>
      </div>
    </div>
  );
}
