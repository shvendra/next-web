import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center">
      {/* 1. Light Mode Logo (Visible when theme is light) */}
      <Image
        src="/images/logo/logo.png"
        alt="BookMyWorker Logo"
        width={200}
        height={70}
        className="h-[70px] w-auto object-contain dark:hidden"
        quality={100}
        priority // Keeps LCP low for SEO
      />

      {/* 2. Dark Mode Logo (Visible when theme is dark) */}
      <Image
        src="/images/logo/logo-white.png"
        alt="BookMyWorker Logo"
        width={200}
        height={70}
        className="hidden h-[70px] w-auto object-contain dark:block"
        quality={100}
        priority
      />
    </Link>
  );
};

export default Logo;