import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { RouteLoader } from "@/components/common/RouteLoader";

const HomePage = lazy(() => import("@/pages/HomePage").then((m) => ({ default: m.HomePage })));
const ContentPage = lazy(() => import("@/pages/ContentPage").then((m) => ({ default: m.ContentPage })));
const DynamicContentPage = lazy(() =>
  import("@/pages/DynamicContentPage").then((m) => ({ default: m.DynamicContentPage })),
);
const InstitutionsPage = lazy(() =>
  import("@/pages/InstitutionsPage").then((m) => ({ default: m.InstitutionsPage })),
);
const InstitutionDetailPage = lazy(() =>
  import("@/pages/InstitutionDetailPage").then((m) => ({ default: m.InstitutionDetailPage })),
);
const DirectoryPage = lazy(() => import("@/pages/DirectoryPage").then((m) => ({ default: m.DirectoryPage })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const GalleryPage = lazy(() => import("@/pages/GalleryPage").then((m) => ({ default: m.GalleryPage })));
const PublicationsPage = lazy(() =>
  import("@/pages/PublicationsPage").then((m) => ({ default: m.PublicationsPage })),
);
const NewsPage = lazy(() => import("@/pages/NewsPage").then((m) => ({ default: m.NewsPage })));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));
const AdminLoginPage = lazy(() => import("@/admin/AdminLoginPage").then((m) => ({ default: m.AdminLoginPage })));
const AdminRegisterPage = lazy(() => import("@/admin/AdminRegisterPage").then((m) => ({ default: m.AdminRegisterPage })));
const AdminDashboardPage = lazy(() => import("@/admin/AdminDashboardPage").then((m) => ({ default: m.AdminDashboardPage })));
const AdminNewsPage = lazy(() => import("@/admin/AdminNewsPage").then((m) => ({ default: m.AdminNewsPage })));
const AdminNoticesPage = lazy(() => import("@/admin/AdminNoticesPage").then((m) => ({ default: m.AdminNoticesPage })));
const AdminGalleryPage = lazy(() => import("@/admin/AdminGalleryPage").then((m) => ({ default: m.AdminGalleryPage })));
const NoticesPage = lazy(() => import("@/pages/NoticesPage").then((m) => ({ default: m.NoticesPage })));

const wrap = (node: ReactNode) => <Suspense fallback={<RouteLoader />}>{node}</Suspense>;

const WHO = { label: "Who We Are", href: "/who-we-are/founder" };
const MINISTRIES = { label: "What We Do", href: "/ministries/formation" };
const ADMIN = { label: "Administration", href: "/administration/provincial-superiors" };
const MEDIA = { label: "Media", href: "/gallery" };

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: wrap(<HomePage />) },

      // Who We Are
      { path: "who-we-are/founder", element: wrap(<ContentPage slug="our-founder" eyebrow="Who We Are" breadcrumbs={[WHO]} />) },
      { path: "who-we-are/history", element: wrap(<ContentPage slug="our-history" eyebrow="Who We Are" breadcrumbs={[WHO]} />) },
      { path: "who-we-are/missionary-work", element: wrap(<ContentPage slug="missionary-work" eyebrow="Who We Are" breadcrumbs={[WHO]} />) },
      { path: "who-we-are/vision-mission", element: wrap(<ContentPage slug="vision-mission" eyebrow="Who We Are" breadcrumbs={[WHO]} />) },
      { path: "who-we-are/province-profile", element: wrap(<ContentPage slug="province-profile" eyebrow="Who We Are" breadcrumbs={[WHO]} />) },
      { path: "who-we-are/our-presence", element: wrap(<ContentPage slug="the-congregation-worldwide" eyebrow="Who We Are" breadcrumbs={[WHO]} />) },

      // What We Do
      { path: "ministries/formation", element: wrap(<ContentPage slug="formation" eyebrow="What We Do" breadcrumbs={[MINISTRIES]} />) },
      { path: "ministries/education", element: wrap(<ContentPage slug="education" eyebrow="What We Do" breadcrumbs={[MINISTRIES]} />) },
      { path: "ministries/health-care", element: wrap(<ContentPage slug="health-care" eyebrow="What We Do" breadcrumbs={[MINISTRIES]} />) },
      { path: "ministries/social-work", element: wrap(<ContentPage slug="social-work" eyebrow="What We Do" breadcrumbs={[MINISTRIES]} />) },
      { path: "ministries/pastoral-evangelization", element: wrap(<ContentPage slug="pastoral-and-evangelization" eyebrow="What We Do" breadcrumbs={[MINISTRIES]} />) },
      { path: "ministries/eco-friendliness", element: wrap(<ContentPage slug="eco-friendliness-and-protection" eyebrow="What We Do" breadcrumbs={[MINISTRIES]} />) },

      // Administration
      { path: "administration/provincial-superiors", element: wrap(<ContentPage slug="provincial-superiors" eyebrow="Administration" breadcrumbs={[ADMIN]} />) },
      { path: "administration/team", element: wrap(<ContentPage slug="administration-team" eyebrow="Administration" breadcrumbs={[ADMIN]} />) },
      { path: "administration/commissions", element: wrap(<ContentPage slug="province-commissions" eyebrow="Administration" breadcrumbs={[ADMIN]} />) },

      // Institutions
      { path: "institutions", element: wrap(<InstitutionsPage />) },
      { path: "institutions/:id", element: wrap(<InstitutionDetailPage />) },
      { path: "institution-profiles", element: wrap(<ContentPage slug="institutions" eyebrow="Our Presence" breadcrumbs={[{ label: "Institutions", href: "/institutions" }]} />) },

      // Media
      { path: "gallery", element: wrap(<GalleryPage />) },
      { path: "publications", element: wrap(<PublicationsPage />) },
      { path: "news", element: wrap(<NewsPage />) },

      // Contact
      { path: "contact", element: wrap(<ContactPage />) },
      { path: "contact/convents", element: wrap(<DirectoryPage />) },

      { path: "worldwide", element: wrap(<ContentPage slug="the-congregation-worldwide" />) },
      { path: "content/:slug", element: wrap(<DynamicContentPage />) },
      { path: "admin/login", element: wrap(<AdminLoginPage />) },
      { path: "admin/register", element: wrap(<AdminRegisterPage />) },
      { path: "admin/dashboard", element: wrap(<AdminDashboardPage />) },
      { path: "admin/news", element: wrap(<AdminNewsPage />) },
      { path: "admin/notices", element: wrap(<AdminNoticesPage />) },
      { path: "admin/gallery", element: wrap(<AdminGalleryPage />) },
      { path: "notices", element: wrap(<NoticesPage />) },
      { path: "*", element: wrap(<NotFoundPage />) },
    ],
  },
]);
