"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LibraryBanner = ({ data }: any) => {
  if (!data) return null;
  const { title, image } = data;

  return (
    <div className="w-[90%] mx-auto mt-6 mb-8 relative">
      {image && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[16/9] md:aspect-[3/1.2] rounded-[1.5rem] overflow-hidden shadow-md bg-white border border-gray-100"
        >
          <Image
            className="object-cover"
            src={image}
            alt={title || "Library Banner"}
            fill
            priority
          />
        </motion.div>
      )}
    </div>
  );
};

export default LibraryBanner;
