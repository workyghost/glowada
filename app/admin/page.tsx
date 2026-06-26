import React from "react";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/AdminDashboard";

export const revalidate = 0;

export default async function AdminPage() {
  const slides = await prisma.slide.findMany({
    orderBy: { order: "asc" },
  });

  const products = await prisma.product.findMany({
    orderBy: { order: "asc" },
  });

  const settings = await prisma.setting.findUnique({
    where: { id: "default" },
  });

  return (
    <AdminDashboard
      initialSlides={slides}
      initialProducts={products}
      initialSettings={settings || undefined}
    />
  );
}
