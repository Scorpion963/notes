"use client";
import { SearchIcon } from "lucide-react";
import { useRef } from "react";

export default function Search() {
  const inputRef = useRef<null | HTMLInputElement>(null);

  return (
    <div className="w-full cursor-pointer gap-2 rounded-full bg-card hover:bg-card/90 transition-colors flex items-center px-2 py-1">
      <SearchIcon onClick={() => inputRef.current?.focus()} />
      <input ref={inputRef} className="outline-none  w-full" type="text" />
    </div>
  );
}
