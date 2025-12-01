"use client";
import cn from "@/lib/cn";
import { useEffect, useRef, useState } from "react";
import Option from "./Option";

type Option <T> = {
  value: T;
  label: string;
};

type SelectProps<T> = {
  onChange: (value: T) => void;
  value: string | undefined;
  options: Option<T>[];
  defaultIndex?: number;
};

export default function Select<T>({
  onChange,
  options,
  value,
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
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setIsOpen(prev => !prev)}>
        {value}
      </button>

      {isOpen && (
        <ul className="absolute">
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
        </ul>
      )}
    </div>
  );
}
