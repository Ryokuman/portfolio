import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
