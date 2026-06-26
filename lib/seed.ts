import { prisma } from "./prisma";
import { hashPassword } from "./auth";

export async function ensureSeeded() {
  try {
    // 1. Ensure Admin User
    const adminExists = await prisma.user.findFirst({
      where: { username: "admin" },
    });

    if (!adminExists) {
      const passwordHash = await hashPassword("glowada123");
      await prisma.user.create({
        data: {
          username: "admin",
          passwordHash,
        },
      });
    }

    // 2. Ensure Settings
    let setting = await prisma.setting.findUnique({
      where: { id: "default" },
    });

    if (!setting) {
      setting = await prisma.setting.create({
        data: {
          id: "default",
          logoUrl: "Glowada",
          phone: "+90 555 123 45 67",
          email: "info@glowada.com",
          whatsapp: "+90 555 123 45 67",
          address: "İkitelli OSB, İSDÖK Sanayi Sitesi, 2. Blok No: 12, Başakşehir / İstanbul",
          youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          instagramUrl: "https://instagram.com/glowada",
          facebookUrl: "https://facebook.com/glowada",
          footerText: "© 2026 Glowada LED & Tabela Sistemleri. Tüm hakları saklıdır.",
        },
      });
    }

    // 3. Ensure Slides
    const slideCount = await prisma.slide.count();
    if (slideCount === 0) {
      await prisma.slide.createMany({
        data: [
          {
            title: "Göz Alıcı LED Tabela Çözümleri",
            description: "İşletmenizin gece gündüz fark edilmesini sağlayacak yüksek kaliteli ve enerji tasarruflu LED tabela tasarımları.",
            imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200",
            linkUrl: "#contact",
            order: 1,
          },
          {
            title: "Krom Kutu Harf & Tabela Tasarımları",
            description: "Şık, modern ve kurumsal kimliğinizi en iyi yansıtan 3D paslanmaz krom kutu harf çözümleri.",
            imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200",
            linkUrl: "#products",
            order: 2,
          },
        ],
      });
    }

    // 4. Ensure Products
    const productCount = await prisma.product.count();
    if (productCount === 0) {
      await prisma.product.createMany({
        data: [
          {
            name: "P10 Kırmızı Dış Mekan LED Tabela",
            description: "Yüksek parlaklığa sahip dış mekan uyumlu kırmızı kayan yazı LED tabela. USB ve Wi-Fi bağlantı seçenekleriyle kolay kontrol.",
            imageUrl: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?q=80&w=600",
            category: "LED Tabela",
            price: "₺1.250'den başlayan fiyatlarla",
            order: 1,
          },
          {
            name: "RGB Full Color LED Ekran",
            description: "Resim, video ve animasyon oynatabilen, 16 milyon renk destekli profesyonel dış ve iç mekan RGB LED ekran panelleri.",
            imageUrl: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=600",
            category: "LED Tabela",
            price: "₺3.800'den başlayan fiyatlarla",
            order: 2,
          },
          {
            name: "Endüstriyel Pleksi Kutu Harf",
            description: "İçten LED aydınlatmalı, paslanmaz yan bantlı, solmaya ve zorlu hava koşullarına dayanıklı akrilik pleksi tabela.",
            imageUrl: "https://images.unsplash.com/photo-1572945281869-7023f82f243a?q=80&w=600",
            category: "Kutu Harf",
            price: "Fiyat Teklifi Alınız",
            order: 3,
          },
          {
            name: "Gold Paslanmaz Krom Tabela",
            description: "Premium görünüm sunan, arkadan (endirekt) LED aydınlatmalı, paslanmaz sarı krom kutu harf sistemi.",
            imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600",
            category: "Krom Tabela",
            price: "Fiyat Teklifi Alınız",
            order: 4,
          },
        ],
      });
    }

    return true;
  } catch (error) {
    console.error("Seeding failed in ensureSeeded helper:", error);
    return false;
  }
}
