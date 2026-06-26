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

    const harfmixSettings = {
      logoUrl: "/images/glowada_logo.png",
      phone: "+90 (212) 664 57 67",
      email: "info@glowada.com",
      whatsapp: "+90 532 551 68 44",
      address: "Seyitnizam Mah. Demirciler Sit. 9. Cd. No:36 34015 Zeytinburnu/İstanbul",
      distributorText: "Glowada Abcmix'in Türkiye Distribütörüdür.",
      youtubeUrl: "https://www.elegansajans.com/wp-content/uploads/2024/04/manyetik-harf-serisi.mp4",
      instagramUrl: "https://www.instagram.com/harfmix",
      facebookUrl: "https://www.facebook.com/mix.harf",
      twitterUrl: "#",
      youtubeChanUrl: "https://www.youtube.com/@harfmixcom",
      footerText: "© Copyright 2026 Glowada ® | Glowada Ezgi Reklamevi Markasıdır.",
    };

    if (!setting) {
      setting = await prisma.setting.create({
        data: {
          id: "default",
          ...harfmixSettings,
        },
      });
    } else {
      setting = await prisma.setting.update({
        where: { id: "default" },
        data: harfmixSettings,
      });
    }

    // 3. Ensure Slides
    await prisma.slide.deleteMany({});
    await prisma.slide.createMany({
      data: [
        {
          title: "Görünürlüğünüzü Artırın",
          description: "Glowada ile tanışın. Reklam, tabela ve tanıtım alanında yaratıcılığın sınırlarını zorlayan bir dünya.",
          imageUrl: "video",
          linkUrl: "#talep-formu",
          order: 1,
        },
        {
          title: "Masaüstü Akülü Işıklı Menü Panoları",
          description: "Çift taraflı, şarj edilebilir LED aydınlatmalı tasarımıyla restoran ve barlarınız için mükemmel masaüstü menü tutucular.",
          imageUrl: "/images/glowada_slider_1.png",
          linkUrl: "#products",
          order: 2,
        },
        {
          title: "Şarj Edilebilir LED Masaüstü Menü Panosu",
          description: "Uzun pil ömrü, kablosuz kullanım kolaylığı ve parlak şık LED kenarlarıyla masalarınıza zarafet katın.",
          imageUrl: "/images/glowada_slider_2.png",
          linkUrl: "#products",
          order: 3,
        },
      ],
    });

    // 4. Ensure Products
    await prisma.product.deleteMany({});
    await prisma.product.createMany({
      data: [
        {
          name: "Manyetik Harf Serisi",
          description: "Bu, en popüler ürünlerimizden biri. Kurulum için herhangi bir araç gereksinimi olmadan son derece basit ve rahattır. Hem iş hem de kişisel kullanım için uygundur; hatta açık hava etkinlikleri için dışarıda dahi kullanabilirsiniz...",
          imageUrl: "https://harfmix.com/wp-content/uploads/2023/08/open-led-harf-2-1024x859.jpg",
          category: "Ürünlerimiz",
          price: "Detaylı Bilgi İçin Teklif Alın",
          order: 1,
        },
        {
          name: "Led Reklam Panosu",
          description: "Bu, pratik bir kurulum tasarımına sahip son derece şık bir LED tabela. Hem resepsiyon masanızın hem de vitrininizin tavanına kolaylıkla monte edebilirsiniz. Önemli mağaza alanınızın duvarlarını veya zeminini kapatmaz...",
          imageUrl: "https://harfmix.com/wp-content/uploads/2023/08/black-friday-2-1012x1024.jpg",
          category: "Ürünlerimiz",
          price: "Detaylı Bilgi İçin Teklif Alın",
          order: 2,
        },
        {
          name: "P3 Bağımsız Led Modüler Harf",
          description: "Bu seri yeni ürünümüz olup diğer ürünlerimiz gibi dünyada da tektir. P3 harf ekranlarından oluşur, bir mobil uygulama ile sahne stili için video ve ses dosyası yükleyebilirsiniz. Manyetik tabelalarımızda olduğu gibi, montajı tamamlamak için...",
          imageUrl: "https://harfmix.com/wp-content/uploads/2023/08/wow-led-harf-1024x985.jpg",
          category: "Ürünlerimiz",
          price: "Detaylı Bilgi İçin Teklif Alın",
          order: 3,
        },
        {
          name: "Çift Taraflı Yuvarlak Led Ekran",
          description: "Bu ürün P2.45 HQ ve HB ekranı ile yapılmıştır. IP65 dış mekan tasarımına sahiptir ve diğer ürünlerimiz gibi orijinal ve piyasada tektir. Dükkanınız için bir tane almanız gerçekten akıllara durgunluk veren bir göz alıcı.",
          imageUrl: "https://harfmix.com/wp-content/uploads/2023/08/Double-Side-Display-Board.jpg",
          category: "Ürünlerimiz",
          price: "Detaylı Bilgi İçin Teklif Alın",
          order: 4,
        },
        {
          name: "Aksesuarlar",
          description: "Glowada aksesuarları, işaretleme çözümlerinde LED İşaretlerden ayrı bir öneme sahiptir ve güç tedarikini sağlamak için kritik bir rol üstlenir. Yenilikçi tasarımı ve işlevselliği ile öne çıkan bu aksesuarlar, işletmelerin reklam ve tanıtım...",
          imageUrl: "https://harfmix.com/wp-content/uploads/2023/08/Double-Side-Display-Board.jpg",
          category: "Ürünlerimiz",
          price: "Detaylı Bilgi İçin Teklif Alın",
          order: 5,
        },
        {
          name: "Dış Mekan Tabelalar",
          description: "Dış mekan LED tabelalar, modern reklamcılığın vazgeçilmez unsurlarından biridir. Parlak, enerji tasarruflu ve etkileyici görüntüleri ile dikkat çekerler. Işıklandırma teknolojisinin gücünü...",
          imageUrl: "https://harfmix.com/wp-content/uploads/2023/08/Double-Side-Display-Board.jpg",
          category: "Ürünlerimiz",
          price: "Detaylı Bilgi İçin Teklif Alın",
          order: 6,
        },
      ],
    });

    // 5. Ensure Videos
    await prisma.video.deleteMany({});
    await prisma.video.createMany({
      data: [
        {
          youtubeUrl: "https://www.youtube.com/watch?v=uijwS3VUgrw",
          title: "Manyetik Harf Serisi Tanıtımı",
          order: 1,
        },
        {
          youtubeUrl: "https://www.youtube.com/watch?v=HKXQReaER5c",
          title: "Led Reklam Panosu Kurulumu",
          order: 2,
        },
        {
          youtubeUrl: "https://www.youtube.com/watch?v=I6PXEm3Ypz8",
          title: "P3 Modüler Harf İncelemesi",
          order: 3,
        },
        {
          youtubeUrl: "https://www.youtube.com/watch?v=oz7YVNnnqKc",
          title: "Çift Taraflı Yuvarlak Led Ekran Testi",
          order: 4,
        },
        {
          youtubeUrl: "https://www.youtube.com/watch?v=dIX01GN50TA",
          title: "Glowada Aksesuarlar & Bağlantılar",
          order: 5,
        },
        {
          youtubeUrl: "https://www.youtube.com/watch?v=EJZd-6G7s4A",
          title: "Dış Mekan Tabelalar Gece Görünümü",
          order: 6,
        },
      ],
    });

    return true;
  } catch (error) {
    console.error("Seeding failed in ensureSeeded helper:", error);
    return false;
  }
}
