"use client";
import cn from "@/lib/cn";
import { useEffect, useRef, useState } from "react";
import Option from "./Option";
import { capitalize } from "@/lib/formatters";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Option<T> = {
  value: T;
  label: string;
};

type SelectProps<T> = {
  onChange: (value: T) => void;
  value: string;
  options: Option<T>[];
  defaultIndex?: number;
  className?: string
};

export default function Select<T>({
  onChange,
  options,
  value,
  className,
  defaultIndex = 0,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative w-full outline-none bg-background hover:bg-background/90 focus:ring-3 focus:ring-primary px-4 py-2 rounded-lg transition-all", className)}
    >
      <button
        type="button"
        className="w-full text-left flex justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {capitalize(value!)}
          <ChevronDown className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-all`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="absolute inset-0 top-12 w-full z-50"
          >
            {options.map((item, index) => (
              <Option
                onClick={() => {
                  setIsOpen(false);
                  onChange(item.value);
                }}
                value={item.value}
                key={index}
              >
                {item.label}
              </Option>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
